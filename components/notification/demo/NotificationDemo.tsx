"use client"

import { useGraphActivityNotification } from "@/features/notification/bar/bar.features"
import { useNotificationStore } from "@/stores/notification/notification.store"

interface NotificationDemoProps {
    isVisible: boolean
}

export default function NotificationDemo({ isVisible }: NotificationDemoProps) {
    const { notifyGraphCreated, notifyDataAdded } = useGraphActivityNotification()
    const { addNotification, clearAllNotifications } = useNotificationStore()
    
    if (!isVisible) return null
    
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    알림 테스트:
                </span>
                
                <button
                    onClick={() => notifyGraphCreated("테스트 그래프")}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    그래프 생성
                </button>
                
                <button
                    onClick={() => notifyDataAdded("매출 데이터")}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    데이터 추가
                </button>
                
                <button
                    onClick={() => addNotification("성공 메시지", "success")}
                    className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                >
                    성공 알림
                </button>
                
                <button
                    onClick={() => addNotification("에러 메시지", "error")}
                    className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    에러 알림
                </button>
                
                <button
                    onClick={clearAllNotifications}
                    className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                    모든 알림 지우기
                </button>
            </div>
        </div>
    )
}
