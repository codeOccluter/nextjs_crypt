export type Notification = {
    id: string
    message: string
    type?: "info" | "success" | "error"
}

export type NotificateState = {
    notifications: Notification[]
    addNotification: (message: string, type?: Notification["type"]) => void
    removeNotification: (id: string) => void
}