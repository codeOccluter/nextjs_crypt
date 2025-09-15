"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import axiosClient from "@/lib/axios/axiosClient"

export type AuthStatus = "authenticated" | "guest" | "unauthenticated" | "loading"
export type SessionUser = {
    user: {
        guestId: string
        role: 0 | 1 | 2
        nickname: string
        email?: string
        guestIdx: number
    }
}

export const SESSION_QUERY_KEY = ["session"] as const

async function fetchSession(): Promise<SessionUser | null> {
    
    try{
        const result = await axiosClient.get<SessionUser>(`/api/auth/session`, { withCredentials: true })
        
        return result.data
    }catch(err: any) {
        if(err?.status === 401) return null
        throw err
    }
}

export default function useSessionQuery() {

    const { data: nextAuthSession, status: nextAuthStatus } = useSession()

    const query = useQuery({
        queryKey: SESSION_QUERY_KEY,
        queryFn: fetchSession,
        staleTime: 0,
        gcTime: 0,
        retry: false,
        enabled: nextAuthStatus !== "authenticated"
    })

    const getAuthStatus = (): AuthStatus => {

        console.log(`useSessionQuery - nextAuthStatus: ${JSON.stringify(nextAuthStatus)} `)
        console.log(`useSessionQuery - nextAuthSesssion: ${JSON.stringify(nextAuthSession)} `)
        console.log(`useSessionQuery - query.data: ${JSON.stringify(query.data)} `)

        if(nextAuthStatus === "authenticated" && nextAuthSession?.user) {
            return "authenticated"
        }
        if(nextAuthStatus === "loading") return "loading"

        const user = query.data?.user
        let status: AuthStatus = "unauthenticated"
        if(!user) return status

        if(user.role === 0) {
            status = "guest"
        }

        return status
    }

    const status = getAuthStatus()

    return {
        status,
        query,
        user: nextAuthStatus === "authenticated" ? nextAuthSession : query.data ?? null,
        refresh: query.refetch,
        _query: query,
    }
}