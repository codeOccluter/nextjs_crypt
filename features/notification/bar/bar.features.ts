import { useNotificationStore } from "@/stores/notification/notification.store"
import { useUnifiedSession } from "@/hooks/auth/useUnfiedSession"
import { toGuestNickname } from "@/features/auth/guest/guest.formatter"
import { UnifiedUser } from "@/features/auth/oauth/oauth.constants"
import { useWebSocketContext } from "@/components/websocket/WebSocketProvider"

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
 * 그래프 활동 알림을 생성하는 커스텀 훅 (WebSocket 연동)
 */
export function useGraphActivityNotification() {
    const { addGraphActivityNotification } = useNotificationStore()
    const { user } = useUnifiedSession()
    
    // WebSocket 컨텍스트 안전하게 접근
    let websocketContext
    try {
        websocketContext = useWebSocketContext()
    } catch (error) {
        console.warn('⚠️ WebSocket 컨텍스트에 접근할 수 없습니다:', error)
        websocketContext = { sendMessage: () => {}, status: 'disconnected' }
    }
    const { sendMessage, status } = websocketContext
    
    const notifyGraphCreated = async (graphTitle?: string) => {
        console.log('🔔 notifyGraphCreated 호출됨:', { graphTitle, user, status })
        if (!user) {
            console.warn('❌ 사용자 정보가 없어서 알림을 보낼 수 없습니다')
            return
        }
        const userName = getDisplayName(user)
        console.log('👤 사용자 이름:', userName)
        
        // 로컬 알림 제거 - WebSocket을 통해서만 알림 받기
        console.log('ℹ️ 로컬 알림 생략 - WebSocket 알림만 사용')
        
        // WebSocket을 통해 다른 사용자들에게 브로드캐스트
        console.log('🌐 WebSocket 상태 확인:', status)
        
        // 1. 직접 WebSocket으로 전송 시도 (디버거와 같은 방식)
        if (status === 'connected') {
            try {
                console.log('🔗 직접 WebSocket 전송 시도...')
                const directMessage = {
                    type: 'graph_activity' as const,
                    data: {
                        id: Date.now().toString(),
                        message: '그래프를 생성했습니다',
                        timestamp: Date.now(),
                        userId: String(user.id || user.guestId || ''),
                        userName,
                        activityType: 'graph_created' as const,
                        graphTitle,
                        notificationType: 'graph_activity' as const
                    }
                }
                sendMessage(directMessage)
                console.log('✅ 직접 WebSocket 전송 완료')
            } catch (directError) {
                console.warn('❌ 직접 WebSocket 전송 실패:', directError)
            }
        } else {
            console.warn('❌ WebSocket 연결되지 않음, 알림 전송 불가')
        }
        
        // API 호출 제거 - 직접 WebSocket 전송만 사용
        console.log('ℹ️ 직접 WebSocket 전송 방식만 사용 (중복 방지)')
    }
    
    const notifyDataAdded = async (graphTitle?: string) => {
        console.log('🔔 notifyDataAdded 호출됨:', { graphTitle, user, status })
        if (!user) {
            console.warn('❌ 사용자 정보가 없어서 알림을 보낼 수 없습니다')
            return
        }
        const userName = getDisplayName(user)
        console.log('👤 사용자 이름:', userName)
        
        // 로컬 알림 제거 - WebSocket을 통해서만 알림 받기
        console.log('ℹ️ 로컬 알림 생략 - WebSocket 알림만 사용')
        
        // WebSocket을 통해 다른 사용자들에게 브로드캐스트
        console.log('🌐 WebSocket 상태 확인:', status)
        
        // 1. 직접 WebSocket으로 전송 시도 (디버거와 같은 방식)
        if (status === 'connected') {
            try {
                console.log('🔗 직접 WebSocket 전송 시도...')
                const userId = String(user.id || user.guestId || '')
                console.log('📤 전송할 사용자 ID:', {
                    originalUserId: user.id || user.guestId,
                    stringUserId: userId,
                    userObject: user
                })
                
                const directMessage = {
                    type: 'graph_activity' as const,
                    data: {
                        id: Date.now().toString(),
                        message: `"${graphTitle}" 그래프에 데이터를 추가했습니다`,
                        timestamp: Date.now(),
                        userId: userId,
                        userName,
                        activityType: 'data_added' as const,
                        graphTitle,
                        notificationType: 'graph_activity' as const
                    }
                }
                console.log('📤 전송할 메시지 전체:', directMessage)
                sendMessage(directMessage)
                console.log('✅ 직접 WebSocket 전송 완료')
            } catch (directError) {
                console.warn('❌ 직접 WebSocket 전송 실패:', directError)
            }
        } else {
            console.warn('❌ WebSocket 연결되지 않음, 알림 전송 불가')
        }
        
        // API 호출 제거 - 직접 WebSocket 전송만 사용
        console.log('ℹ️ 직접 WebSocket 전송 방식만 사용 (중복 방지)')
    }
    
    return {
        notifyGraphCreated,
        notifyDataAdded
    }
}