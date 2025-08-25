"use client"

import { useQuery } from "@tanstack/react-query"
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

    const query = useQuery({
        queryKey: SESSION_QUERY_KEY,
        queryFn: fetchSession,
        staleTime: 60 * 1000, // 1분 동안 fresh
        gcTime: 5 * 60 * 1000,
        retry: false
    })

    const getAuthStatus = (): AuthStatus => {

        const user = query.data?.user
        // console.log(`getAuthStatus: | ${JSON.stringify(query.data?.user)}`)
        let status: AuthStatus = "unauthenticated"
        if(!user) {
            return status
        }

        if(user.role === 0) {
            status = "guest"
        }

        return status
    }

    const status = getAuthStatus()

    return {
        status,
        query,
        user: query.data ?? null,
        refresh: query.refetch,
        _query: query,
    }
}