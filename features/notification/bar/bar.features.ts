import { useNotificationStore } from "@/stores/notification/notification.store"
import { useUnfiedSession } from "@/hooks/auth/useUnfiedSession"
import { toGuestNickname } from "@/features/auth/guest/guest.formatter"
import { UnifiedUser } from "@/features/auth/oauth/oauth.constants"

/**
 * 사용자 표시 이름을 가져오는 함수
 */
export function getDisplayName(user: UnifiedUser): string {
    if(!user) return "Unknown"

    if(user.role === 0) {
        return toGuestNickname(user.uniqueName, user.guestIdx)
    }

    if(user.role === 1) {
        return user.name || "General User"
    }

    return user.name ?? user.email ?? "User"
}

/**
 * 그래프 활동 알림을 생성하는 커스텀 훅
 */
export function useGraphActivityNotification() {
    const { addGraphActivityNotification } = useNotificationStore()
    const { user } = useUnfiedSession()
    
    const notifyGraphCreated = (graphTitle?: string) => {
        if (!user) return
        const userName = getDisplayName(user)
        addGraphActivityNotification(userName, "graph_created", graphTitle)
    }
    
    const notifyDataAdded = (graphTitle?: string) => {
        if (!user) return
        const userName = getDisplayName(user)
        addGraphActivityNotification(userName, "data_added", graphTitle)
    }
    
    return {
        notifyGraphCreated,
        notifyDataAdded
    }
}