"use client"

import { useEffect, useState } from "react"
import AuthModal from "../AuthModal"
import useAuthStatus from "./useAuthStatus"
import useEnterAsGuest from "./useEnterAsGuest"

type Props = {
    children: React.ReactNode
}

export default function AuthGate({
    children
}: Props) {

    const { status, refresh } = useAuthStatus()
    const { enter, pending } = useEnterAsGuest()
    const [open, setOpen] = useState(false)

    useEffect(() => {

        if(status === "unauthenticated") setOpen(true)
        if(status === "authenticated" || status === "guest") setOpen(false)
    }, [status])

    const onLogin = async(v: { 
        email: string 
        password: string
    }) => {
        // TODO: useLogin().mutate(v)
        await refresh()
    }

    const onRegister = async (v: {
        name: string
        birth: string
        phone: string
        email: string
        password: string
        primaryLang?: string
    }) => {
        // TODO: 회원가입 → 성공 시 자동 로그인 or 로그인 탭으로 전환
        // console.log("register", v)
    }

    const onGuest = async (opts?: { nickname?: string, ttlMs?: number }) => {
        // 서버가 guest_id HttpOnly 쿠키 발급 + client_db에 저장
        // 세션 재평가 → 200
        await enter(opts) 
        await refresh()
    }

    if(status === "loading") return null
    if(open) {
        return (
            <AuthModal 
                open={open}
                onLogin={onLogin} // 미구현
                onRegister={onRegister} // 미구현
                onGuest={onGuest} // 현재 구현 완료
            />
        )
    }

    return <>{children}</>
}