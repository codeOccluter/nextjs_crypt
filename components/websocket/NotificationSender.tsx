// components/websocket/NotificationSender.tsx - 알림 전송 컴포넌트
"use client"

import { useState } from 'react'
import { useWebSocketContext } from './WebSocketProvider'
import { useUnifiedSession } from '@/hooks/auth/useUnfiedSession'

export default function NotificationSender() {
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { sendNotification, status } = useWebSocketContext()
    const { user } = useUnifiedSession()
    
    const handleSend = async () => {
        if (!message.trim()) return
        if (status !== 'connected') return
        
        setIsLoading(true)
        
        try {
            // 사용자 정보와 함께 알림 전송
            const fullMessage = user 
                ? `${user.name || user.uniqueName || '익명'}님: ${message}`
                : `게스트: ${message}`
            
            sendNotification(fullMessage)
            setMessage('')
        } catch (error) {
            console.error('알림 전송 실패:', error)
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }
    
    return (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3">
                실시간 알림 전송
            </h3>
            
            <div className="space-y-3">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="모든 사용자에게 전송할 메시지를 입력하세요..."
                    className="w-full p-3 border rounded-lg resize-none h-20 
                             border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700
                             text-gray-900 dark:text-white
                             placeholder-gray-500 dark:placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={status !== 'connected' || isLoading}
                />
                
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {status !== 'connected' && (
                            <span className="text-red-500">
                                WebSocket 연결이 필요합니다
                            </span>
                        )}
                        {status === 'connected' && (
                            <span className="text-green-500">
                                실시간 전송 준비됨
                            </span>
                        )}
                    </div>
                    
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || status !== 'connected' || isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg
                                 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                    >
                        {isLoading ? '전송 중...' : '전송'}
                    </button>
                </div>
            </div>
        </div>
    )
}
