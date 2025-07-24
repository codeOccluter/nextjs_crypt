import axios from "axios"

const axiosHeader = {
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
}

const axiosInstance = axios.create(axiosHeader)

axiosInstance.interceptors.request.use(
    (config) => {
        const token = '' // 추후에 localStorage.getItem(`accessToken`)
        if(token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (result) => result,
    (error) => {
        if(error.response?.status === 401) {
            // 인증 만료 처리
            console.warn(`인증 오류: 재 로그인하세요.`)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance