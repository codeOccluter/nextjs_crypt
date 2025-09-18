"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import axiosClient from "@/lib/axios/axiosClient"
import type { AuthStatus, guestStatus, UnifiedUser } from "@/features/auth/oauth/oauth.constants"

type UnifiedStatus = AuthStatus

export function useUnfiedSession() {

    const { status: authStatus, data: authData } = useSession()

    const [guestStatus, setGuestStatus] = useState<guestStatus>("idle")
    const [guestUser, setGuestUser] = useState<UnifiedUser | null>(null)

    const getGuestToken = () => {
        if(typeof window === "undefined") return null

        return localStorage.getItem("accessToken") || null
    }

    const validateGuest = async () => {
        
        const token = getGuestToken()
        if(!token) {
            setGuestStatus("invalid")
            setGuestUser(null)

            return
        }

        try {
            setGuestStatus("checking")
            const { data } = await axiosClient.get(`/api/guest/session`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if(data?.user) {

                console.log(`useUnifiedSession - data: ${JSON.stringify(data)}`)
                setGuestUser({
                    guestId: data.user.guestId,
                    uniqueName: data.user.nickname ?? "Guest",
                    role: data.user.role ?? 0,
                    guestIdx: data.user.guestIdx,
                    provider: "guest"
                })
                setGuestStatus("valid")
            } else {
                setGuestStatus("invalid")
                setGuestUser(null)
            }
        }catch(err: any){
            console.error(`[ValidateGuest] failed: ${err}`)
            setGuestStatus("invalid")
            setGuestUser(null)
        }
    }

    useEffect(() => {
        if(authStatus === "loading") return
        if(authStatus === "authenticated") {
            setGuestStatus("invalid")
            setGuestUser(null)
        }else {
            validateGuest()
        }
    }, [authStatus])

    const status: UnifiedStatus = useMemo(() => {

        if(authStatus === "loading") return "loading"
        if(authStatus === "authenticated") return "authenticated"

        if(guestStatus === "checking" || guestStatus === "idle") return "loading"
        if(guestStatus === "valid") return "guest"

        return "unauthenticated"
    }, [authStatus, guestStatus])

    const user: UnifiedUser | null = useMemo(() => {
        if(status === "authenticated") {

            const authDataUser = authData?.user

            return {
                id: (authDataUser as any)?.id ?? authDataUser?.email ?? undefined,
                name: authDataUser?.name ?? undefined,
                email: authDataUser?.email ?? undefined,
                image: authDataUser?.image ?? undefined,
                role: 1,
                provider: (authData as any)?.user?.provider
            }
        }
        if(status === "guest") {
            return guestUser
        }
        return null
    }, [status, authData, guestUser])

    const refresh = async () => {
        await validateGuest()
    }

    return { status, user, refresh }
}