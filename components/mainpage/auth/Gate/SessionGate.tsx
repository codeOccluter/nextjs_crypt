"use client"

import { useEffect, useMemo, useState } from "react"
import AuthModal from "../AuthModal"
import useSessionQuery from "../../../../hooks/auth/useSessionQuery"
import useGuestLogin from "@/hooks/auth/useGuestLogin"

type Props = { children: React.ReactNode }

export default function SessionGate({
    children
}: Props) {

    const { guestLogin, pending } = useGuestLogin()
    const { status, query, refresh, user } = useSessionQuery()

    const [open, setOpen] = useState(false)


    useEffect(() => {

        console.log(`query: ${JSON.stringify(query.data?.user?.role)}`)
        console.log(`user: ${JSON.stringify(user)}`)
        console.log(`SessionGate: ${status}`)
        if(status === "unauthenticated") setOpen(true)
        if(status === "authenticated" || status === "guest") setOpen(false)
    }, [status])

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

    if(status === "loading") return null

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