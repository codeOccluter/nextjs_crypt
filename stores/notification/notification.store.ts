import { create } from "zustand"
import { NotificateState } from "@/features/notification/bar/bar.constants"

export const useNotificationStore = create<NotificateState>((set) => ({
    notifications: [],
    addNotification: (message, type = "info") => {
        const id = Date.now().toString()
        set((state) => ({
            notifications: [...state.notifications, { id, message, type }]
        }))
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id)
            }))
        }, 3000)
    },
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
        }))
}))