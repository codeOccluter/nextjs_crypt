"use client"

import { useNotificationStore } from "@/stores/notification/notification.store"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function HeaderNotificationBar() {
    const { notifications, removeNotification } = useNotificationStore()
    const pathname = usePathname()
    
    const shouldShow = pathname.includes('/main') && !pathname.includes('/(no-layout)')
    const graphNotifications = notifications.filter(n => n.type === "graph_activity")
    if (!shouldShow || graphNotifications.length === 0) {
        return null
    }

    return (
        <div className="fixed top-16 left-0 right-0 z-[60] pointer-events-none">
            <AnimatePresence>
                {graphNotifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative pointer-events-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg" />
                        <div className="relative px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-white">
                                <div className="flex-shrink-0">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                </div>
                                <span className="text-sm font-medium">
                                    <span className="font-semibold">{notification.userName}</span>
                                    <span className="mx-1">가</span>
                                    <span>{notification.message}</span>
                                </span>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="flex-shrink-0 ml-4 px-3 py-1 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                aria-label="알림 닫기"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
