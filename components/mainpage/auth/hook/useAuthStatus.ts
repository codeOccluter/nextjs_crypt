"use client"

import { useCallback, useEffect, useState } from "react"
import axiosClient from "@/lib/axios/axiosClient"
import { readGuestIdFromCookie, isGuestValid } from "../guest.service"

type Status = "authenticated" | "guest" | "unauthenticated" | "loading"
export type SessionUser = {
    id: string
    name: string
    role: 0 | 1 | 2 // 0: guest, 1: user, 2: admin
    email?: string
    // ... 필요한 필드 추가 작성
}

function getCookie(name: string) {

    if(typeof document === "undefined") return null

    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    return m ? decodeURIComponent(m[1]) : null
}

export default function useAuthStatus() {

    const [status, setStatus] = useState<Status>("loading")
    const [user, setUser] = useState<SessionUser | null>(null)

    const evaluate = useCallback(async () => {
        try {
            // 서버 세션 확인
            const res = await axiosClient.get<SessionUser>("/api/auth/session")
            setUser(res.data)
            setStatus(res.data.role === 0 ? "guest" : "authenticated")
            
            return
        }catch(error) {
            const gid = readGuestIdFromCookie()
            if(gid && await isGuestValid(gid)) {
                setUser({
                    id: gid,
                    name: "Guest",
                    role: 0
                })
                setStatus("guest")
                return
            }

            // 기타 에러 → 네트워스 이슈 등
            setUser(null)
            setStatus("unauthenticated")
        }
    }, [])

    useEffect(() => {
        evaluate()
    }, [evaluate])

    return {
        status,
        user,
        refresh: evaluate
    }
}