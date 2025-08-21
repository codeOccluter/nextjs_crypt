import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

/*
NOTE:
- JWT 토큰 사용
- 리프레시는 /auth/refresh API 형식에 맞게 수정
*/

export type ApiError = {
    status: number
    code?: string
    message: string
    details?: unknown
}

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/",
    timeout: 15000,
    withCredentials: true // 쿠키 기반 세션 필수
})

let isRefreshing = false
type QueueItem = {
    resolve: (value: any) => void
    reject: (reason?: any) => void
}
let pendingQueue: QueueItem[] = []

const setAuthHeader = (token: string | null) => {
    if(token) {
        axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
    }else {
        delete axiosClient.defaults.headers.common.Authorization
    }
}

const getAccessToken = () => 
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

const saveAccessToken = (token: string | null) => {
    if(typeof window == "undefined") return
    if(token) localStorage.setItem("accessToken", token)
    else localStorage.removeItem("accessToken")
}

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        
        const token = getAccessToken()
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        config.headers["X-Requested-With"] = "XMLHttpRequest"
        return config
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined

        if(error.code === "ECONNABORTED" || error.message?.includes("Network Error")) {
            const normalize: ApiError = { status: 0, code: error.code, message: "Network Error or timeout" }

            return Promise.reject(normalize)
        }

        const status = error.response?.status ?? 0

        if(status === 401 && original && !original._retry) {
            
            original._retry = true

            if(!isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({
                        resolve: () => resolve(axiosClient(original)),
                        reject
                    })
                })
            }

            isRefreshing = true

            try {
                // refresh 요청 → 전역 인터셉터 영향을 최소화 - "순수 axios 사용"
                const refreshUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "") + `/api/auth/refresh`

                const { data } = await axios.post<{ accessToken?: string }>(
                    refreshUrl,
                    {},
                    { withCredentials: true }
                )

                const newToken = data?.accessToken ?? null

                saveAccessToken(newToken)
                setAuthHeader(newToken)

                if(newToken && original?.headers) {
                    original.headers.Authorization = `Bearer ${newToken}`
                }else if(original?.headers) {
                    delete (original.headers as any).Authorization
                }

                pendingQueue.forEach((pending) => pending.resolve(null))
                pendingQueue = []

                return axiosClient(original)
            }catch(err) {
                pendingQueue.forEach((pending) => pending.reject({
                    status: 401,
                    message: `Session expired. Please login again`
                } satisfies ApiError))
                pendingQueue = []

                saveAccessToken(null)
                setAuthHeader(null)

                return Promise.reject<never>({
                    status: 401,
                    message: `Session expired. Please login again`,
                } satisfies ApiError)
            }finally {
                isRefreshing = false
            }
        }

        const resp = error.response as any;
        const normalized: ApiError = {
        status,
        code: resp?.data?.code,
        message: resp?.data?.message || error.message || "Unknown error",
        details: resp?.data?.details,
        };
        return Promise.reject(normalized);
    }
)

export default axiosClient