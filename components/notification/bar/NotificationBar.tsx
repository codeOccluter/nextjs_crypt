"use client"

import { useNotificationStore } from "@/stores/notification/notification.store"
import clsx from "clsx"

export default function NotificationBar() {

    const { notifications, removeNotification } = useNotificationStore()

    // 그래프 활동 알림은 헤더에서 처리하므로 일반 알림만 표시
    const generalNotifications = notifications.filter(n => n.type !== "graph_activity")

    return (
        <div className="absolute top-16 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
            {generalNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className={clsx(
                        "rounded-md px-4 py-2 shadow-md text-sm text-white animate-slideDown",
                        notification.type === "success" && "bg-green-500",
                        notification.type === "error" && "bg-red-500",
                        notification.type === "info" && "bg-blue-500"
                    )}
                >
                    <span className="truncate">{notification.message}</span>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="ml-3 text-xs font-bold text-white/80 hover:text-white"
                        aria-label="닫기"
                    >X</button>
                </div>
            ))}
        </div>
    )
}