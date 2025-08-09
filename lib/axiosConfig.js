import { getCookie, removeCookie, setAuthCookies, setCookie } from "@/utils/authCookie"
import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true,
})
//to send Token for every request
api.interceptors.request.use(
    function (config) {
        const token = getCookie("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}` 
         }
return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// refresh Token if access token is expired 
api.interceptors.response.use(
    (response) => response,
    async(error)=> {
        const originRequest = error.config

        if (error.response?.status === 401 && !originRequest._retry) {
            originRequest._retry = true

            const refreshToken = getCookie('refreshToken')
            if (!refreshToken) {
                removeCookie('refreshToken')
                window.location.href="/" // Or redirect to: auth/login
                return Promise.reject(error)
            }

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
                    token: refreshToken
                })

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
                setAuthCookies({ accessToken: newAccessToken, refreshToken: newRefreshToken });

                originRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                return api(originRequest)

            } catch (refreshToken) {
                removeCookie('accessToken')
                removeCookie('refreshToken')
                window.location.href = "/" 
                return Promise.reject(refreshToken)
            }
        }
        return Promise.reject(error)
    }
)


export {api}