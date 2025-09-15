import axiosClient, { clearAxiosAuth } from "@/lib/axios/axiosClient"

export async function logoutGuest() {

    await axiosClient.delete(`/api/auth/guest`)
    // Ensure axios default Authorization header and storage are fully cleared
    clearAxiosAuth()
}