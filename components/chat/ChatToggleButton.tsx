// components/chat/ChatToggleButton.tsx - 채팅 창 열기/닫기 버튼
"use client"

import { MessageCircle } from 'lucide-react'
import { useWebSocketContext } from '@/components/websocket/WebSocketProvider'

interface ChatToggleButtonProps {
    onClick: () => void
    hasNewMessages?: boolean
}

export default function ChatToggleButton({ onClick, hasNewMessages = false }: ChatToggleButtonProps) {
    const { status } = useWebSocketContext()

    return (
        <button
            onClick={onClick}
            className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg 
                     flex items-center justify-center transition-all duration-200 hover:scale-105 z-40"
            title="채팅 창 열기"
        >
            <div className="relative">
                <MessageCircle className="w-6 h-6" />
                
                {/* 연결 상태 표시 */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                    status === 'connected' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                
                {/* 새 메시지 알림 */}
                {hasNewMessages && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                )}
            </div>
        </button>
    )
}
