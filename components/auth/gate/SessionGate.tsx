"use client"

import { useEffect, useState } from "react"
import AuthModal from "../modal/AuthModal"
import { useUnfiedSession } from "@/hooks/auth/useUnfiedSession"
import useGuestLogin from "@/hooks/auth/useGuestLogin"

type Props = { children: React.ReactNode }

export default function SessionGate({
    children
}: Props) {

    const { status, refresh } = useUnfiedSession()
    const { guestLogin, pending } = useGuestLogin()
    const [open, setOpen] = useState(false)

    useEffect(() => {

        switch(status) {
            case "loading":
                setOpen(false)
                break
            case "unauthenticated":
                setOpen(true)
                break
            case "authenticated":
            case "guest":
                setOpen(false)
                break
        }
    }, [status])

    const handleGuestLogin = async (opts?: {
        nickname?: string 
        ttlMs?: number 
    }) => {
        
        await guestLogin(opts)
        await refresh()
    }

    if(open) {
        return (
            <AuthModal 
                open={open}
                pending={pending}
                onGuestLogin={handleGuestLogin} // 현재 구현 완료
            />
        )
    }

    return <>{children}</>
}