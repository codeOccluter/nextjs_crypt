import axiosClient from "@/lib/axios/axiosClient"

export type LoginGuestOptions = {
    nickname?: string
    ttlMs?: number
}

export async function loginGuest(opts?: LoginGuestOptions) {

    const { data } = await axiosClient.post(`/api/guest`, opts)
    if(typeof window !== "undefined" && data?.accessToken) {
        localStorage.setItem(`accessToken`, data.accessToken)
    }

    return data
}