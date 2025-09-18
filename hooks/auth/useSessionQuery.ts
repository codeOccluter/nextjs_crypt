"use clinet"

import { useUnfiedSession } from "./useUnfiedSession"
import type { AuthStatus, UnifiedUser, QueryLike, SessionData } from "@/features/auth/oauth/oauth.constants"

export default function useSessionQuery() {
    const { status, user, refresh } = useUnfiedSession()

    const query: QueryLike<SessionData> = {
        data: { user, status },
        isLoading: status === "loading",
        refetch: refresh
    }

    return {
        status,
        query,
        refresh,
        user
    }
}