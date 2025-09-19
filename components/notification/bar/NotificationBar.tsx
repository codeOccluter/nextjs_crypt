"use client"

import { useNotificationStore } from "@/stores/notification/notification.store"
import clsx from "clsx"

export default function NotificationBar() {

    const { notifications, removeNotification } = useNotificationStore()

    return (
        <div className="absolute top-16 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
            {notifications.map((notification) => (
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