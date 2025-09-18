"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import axiosClient from "@/lib/axios/axiosClient"
import type { AuthStatus, AuthSessionUser } from "@/features/auth/oauth/oauth.constants"

export const AUTH_SESSION_QUERY_KEY = ["auth-session"] as const

async function fetchAuthSession(): Promise<AuthSessionUser | null> {
    
    try{
        const result = await axiosClient.get<AuthSessionUser>(`/api/auth/session-bridge`, { withCredentials: true })
        
        return result.data
    }catch(error: any) {
        if(error?.status === 401) return null

        return null
    }
}

export default function useAuthSessionQuery() {

    const { data: nextAuthSession, status: nextAuthStatus } = useSession()

    const query = useQuery({
        queryKey: AUTH_SESSION_QUERY_KEY,
        queryFn: fetchAuthSession,
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: false,
        enabled: nextAuthStatus !== "loading"
    })

    const getAuthStatus = (): AuthStatus => {
        if(nextAuthStatus === "authenticated" && nextAuthSession?.user) {
            return "authenticated"
        }

        if(nextAuthStatus === "loading") {
            return "loading"
        }

        const user = query.data?.user
        if(!user) {
            return "unauthenticated"
        }

        if(user.role === 0) {
            return "guest"
        }else if(user.role === 1) {
            return "authenticated"
        }else {
            return "unauthenticated"
        }
    }

    const status = getAuthStatus()

    return {
        status,
        query,
        user: nextAuthStatus === "authenticated" ? nextAuthSession : query.data ?? null,
        refresh: query.refetch,
        _query: query
    }
}