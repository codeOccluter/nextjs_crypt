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
    timeout: 15_000,
    withCredentials: true // 쿠키 기반 세션 필수
})

let isRefreshing = false
let pendingQueue: Array<() => void> = []

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        config.headers["X-Request-With"] = "XMLHttpRequest"
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
                isRefreshing = true

                try {
                    const { data } = await axios.post(
                        (process.env.NEXT_PUBLIC_API_BASE_URL || "") + "/api/auth/refresh",
                        {},
                        { withCredentials: true },
                    )

                    pendingQueue.forEach((cb) => cb())
                    pendingQueue = []

                    return axiosClient(original)
                }catch(error) {
                    pendingQueue = []

                    if(typeof window !== "undefined") {
                        localStorage.removeItem("accessToken")
                    }
                    return Promise.reject<never>({
                        status: 401,
                        message: "Session expired. Please log in again."
                    } satisfies ApiError)
                }finally {
                    isRefreshing = false
                }
            }

            return new Promise((resolve) => {
                pendingQueue.push(async () => resolve(axiosClient(original)))
            })
        }

        const resp = error.response as any
        const normalized: ApiError = {
            status,
            code: resp?.data?.code,
            message: resp?.data?.message || error.message || "Unknown error",
            details: resp?.data?.details,
        }
        return Promise.reject(normalized)
    }
)

export default axiosClient