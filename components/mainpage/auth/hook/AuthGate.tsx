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
        console.log("register", v)
    }

    const onGuest = async () => {
        // TODO: useEnterAsGuest().mutate()
        // 임시로 guest_id 쿠키만 심어서 흐름 확인
        // 실제로는 ClientDB에 guest_user insert + 쿠키 발급
        await enter()
        await refresh()

        // document.cookie = `guest_id=${crypto.randomUUID()}; max-age=${24 * 60 * 60}; path=/;`
    }

    if(status === "loading") return null

    if(open) {
        return (
            <AuthModal 
                open={open}
                onClose={() => { /* 강제: 닫기 불가. 필요하면 게스트 허용 시 닫기 허용 */ }}
                onLogin={onLogin}
                onRegister={onRegister}
                onGuest={onGuest}
            />
        )
    }

    return <>{children}</>
}