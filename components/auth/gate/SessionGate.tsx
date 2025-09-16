"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import AuthModal from "../modal/AuthModal"
import useSessionQuery from "@/hooks/auth/useSessionQuery"
import useGuestLogin from "@/hooks/auth/useGuestLogin"

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
                onGuestLogin={handleGuestLogin} // 현재 구현 완료
            />
        )
    }

    return <>{children}</>
}