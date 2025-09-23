"use clinet"

import { useUnifiedSession } from "./useUnfiedSession"
import type { AuthStatus, UnifiedUser, QueryLike, SessionData } from "@/features/auth/oauth/oauth.constants"

export default function useSessionQuery() {
    const { status, user, refresh } = useUnifiedSession()

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