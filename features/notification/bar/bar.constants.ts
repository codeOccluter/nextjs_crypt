export type NotificationType = "info" | "success" | "error" | "graph_activity"

export type Notification = {
    id: string
    message: string
    type?: NotificationType
    userName?: string  // 그래프 활동 알림용
    activityType?: "graph_created" | "data_added"  // 활동 타입
}

export type NotificateState = {
    notifications: Notification[]
    addNotification: (message: string, type?: NotificationType) => void
    addGraphActivityNotification: (userName: string, activityType: "graph_created" | "data_added", graphTitle?: string) => void
    removeNotification: (id: string) => void
    clearAllNotifications: () => void
}