"use client"

import { useQuery } from "@tanstack/react-query"
import axiosClient from "@/lib/axios/axiosClient"

export type AuthStatus = "authenticated" | "guest" | "unauthenticated" | "loading"
export type SessionUser = {
    id: string
    name: string
    role: 0 | 1 | 2 // 0: guest, 1: user, 2: admin
    email?: string
    // ... 필요한 필드 추가 작성
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

    const getAuthStatus = () => {

        let status: AuthStatus

        if(query.isLoading) {
            status = "loading"
        }else if(query.data && query.data.role === 0) {
            status = "guest"
            if(query.data.role === 0) {
                status = "guest"
            }else if(query.data.role === 1 || query.data.role === 2) {
                status = "authenticated"
            }
        }else {
            status = "unauthenticated"
        }

        return status
    }

    const status = getAuthStatus()

    // const status: AuthStatus =
    //     query.isLoading
    //         ? "loading"
    //         : query.data
    //             ? (query.data.role === 0 ? "guest" : "authenticated")
    //             : "unauthenticated"

    return {
        status,
        query,
        user: query.data ?? null,
        refresh: query.refetch,
        _query: query,
    }
}