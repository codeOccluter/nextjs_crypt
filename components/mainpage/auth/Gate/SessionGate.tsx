"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import AuthModal from "../AuthModal"
import useSessionQuery from "../../../../hooks/auth/useSessionQuery"
import useGuestLogin from "@/hooks/auth/useGuestLogin"
import axiosClient from "@/lib/axios/axiosClient"

type Props = { children: React.ReactNode }

export default function SessionGate({
    children
}: Props) {

    const { guestLogin, pending } = useGuestLogin()
    const { status, query, refresh, user } = useSessionQuery()

    const [open, setOpen] = useState(false)
    // const bridged = useRef(false)

    useEffect(() => {
        if(status === "loading") return setOpen(true)
        if(status === "unauthenticated") return setOpen(true)
        if(status === "authenticated" || status === "guest") return setOpen(false)
    }, [status])

    // useEffect(() => {
    //     if(status !== "authenticated") return
    //     if(bridged.current) return
    //     // bridged.current = true

    //     (async () => {
    //         const result = await axiosClient.post(`/api/auth/session-bridge`)
    //         const data = await result.data

    //         if(data?.accessToken) {
    //             localStorage.setItem("accessToken", data.accessToken)
    //         }
    //         await refresh()
    //     })()
    // }, [status, refresh])

    const handleEmailLogin = async(v: { 
        email: string 
        password: string
    }) => {
        // TODO: useLogin().mutate(v)
        await refresh()
    }

    const handleRegister = async (v: {
        name: string
        birth: string
        phone: string
        email: string
        password: string
        primaryLang?: string
    }) => {
        // TODO: 회원가입 → 성공 시 자동 로그인 or 로그인 탭으로 전환
    }

    const handleGuestLogin = async (opts?: {
        nickname?: string 
        ttlMs?: number 
    }) => {
        
        await guestLogin(opts)
        await refresh()
    }

    // if(status === "loading") return null

    if(open) {
        return (
            <AuthModal 
                open={open}
                pending={pending}
                onEmailLogin={handleEmailLogin} // 미구현
                onRegister={handleRegister} // 미구현
                onGuestLogin={handleGuestLogin} // 현재 구현 완료
            />
        )
    }

    return <>{children}</>
}