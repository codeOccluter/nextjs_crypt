import axiosClient from "../../../lib/axios/axiosClient"

export type EnterOptions = {
    nickname?: string
    ttlMs?: number
}

export async function enterAsGuest(opts?: EnterOptions) {

    await axiosClient.post(`/api/auth/guest`, {
        nickname: opts?.nickname,
        ttlMs: opts?.ttlMs,
    })
}

export async function leaveGuest() {
    
    await axiosClient.delete(`/api/auth/guest`)
}