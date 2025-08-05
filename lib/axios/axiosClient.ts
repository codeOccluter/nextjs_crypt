import axios from "axios"

const axiosClient = axios.create({
    baseURL: "/",
    timeout: 5000,
})

axiosClient.interceptors.request.use(
    (config) => {
        // TODO
        // 1) 토큰 자동추가, JWT 등등
        // const token = localStorage.getItem("token")
        // if(token) config.headers.Authorization = `Bearer ${token}~~`
        return config
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(`API Error: `, error)

        return Promise.reject(error)
    }
)

export default axiosClient