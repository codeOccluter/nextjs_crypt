import axiosClient from "@/lib/axios/axiosClient"

export async function logoutGuest() {

    await axiosClient.delete(`/api/auth/guest`)
    if(typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
    }
}