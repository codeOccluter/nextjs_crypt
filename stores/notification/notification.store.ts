import { create } from "zustand"
import { NotificateState } from "@/features/notification/bar/bar.constants"

export const useNotificationStore = create<NotificateState>((set) => ({
    notifications: [],
    
    addNotification: (message, type = "info") => {
        const id = Date.now().toString()
        set((state) => ({
            notifications: [...state.notifications, { id, message, type }]
        }))
        
        // 일반 알림은 3초 후 자동 제거
        if (type !== "graph_activity") {
            setTimeout(() => {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id)
                }))
            }, 3000)
        }
    },
    
    addGraphActivityNotification: (userName, activityType, graphTitle) => {
        const id = Date.now().toString()
        const activityMessages = {
            graph_created: "그래프를 생성했습니다",
            data_added: `"${graphTitle}" 그래프에 데이터를 추가했습니다`
        }
        
        set((state) => ({
            notifications: [...state.notifications, {
                id,
                message: activityMessages[activityType],
                type: "graph_activity",
                userName,
                activityType
            }]
        }))
        
        // 그래프 활동 알림은 5초 후 자동 제거
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id)
            }))
        }, 5000)
    },
    
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
        })),
        
    clearAllNotifications: () =>
        set({ notifications: [] })
}))