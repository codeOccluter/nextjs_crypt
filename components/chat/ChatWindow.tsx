// components/chat/ChatWindow.tsx - 실시간 채팅 창
"use client"

import { useState, useEffect, useRef } from 'react'
import { useWebSocketContext } from '@/components/websocket/WebSocketProvider'
import { useUnifiedSession } from '@/hooks/auth/useUnfiedSession'
import { getDisplayName } from '@/features/notification/bar/bar.features'
import { X, Send, MessageCircle } from 'lucide-react'

interface ChatMessage {
    id: string
    userId: string
    userName: string
    message: string
    timestamp: number
}

interface ChatWindowProps {
    isOpen: boolean
    onClose: () => void
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
    const { sendMessage, lastMessage, status } = useWebSocketContext()
    const { user } = useUnifiedSession()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // 사용자 표시 이름 가져오기
    const displayName = user ? getDisplayName(user) : '익명'
    const userId = String(user?.id || user?.guestId || 'anonymous')

    // 메시지 수신 처리 (훅은 항상 같은 순서로 호출되어야 함)
    useEffect(() => {
        if (lastMessage && lastMessage.type === 'chat') {
            const chatMessage: ChatMessage = {
                id: lastMessage.data.id,
                userId: lastMessage.data.userId || 'anonymous',
                userName: lastMessage.data.userName || '익명',
                message: lastMessage.data.message,
                timestamp: lastMessage.data.timestamp
            }
            setMessages(prev => [...prev, chatMessage])
        }
    }, [lastMessage])

    // 자동 스크롤 (훅은 항상 같은 순서로 호출되어야 함)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // 인증되지 않은 사용자 처리 (훅 호출 이후에 조건부 렌더링)
    if (!user) {
        return (
            <div className="fixed bottom-4 right-4 w-96 h-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg flex flex-col z-50">
                {/* 헤더 */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">실시간 채팅</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* 로그인 필요 메시지 */}
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            로그인이 필요합니다
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            채팅을 사용하려면<br />
                            먼저 로그인해주세요
                        </p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // 메시지 전송
    const handleSendMessage = () => {
        if (!inputMessage.trim() || status !== 'connected') return

        const chatMessage = {
            type: 'chat' as const,
            data: {
                id: Date.now().toString(),
                message: inputMessage.trim(),
                timestamp: Date.now(),
                userId: userId,
                userName: displayName
            }
        }

        sendMessage(chatMessage)
        setInputMessage('')
    }

    // Enter 키 처리
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg flex flex-col z-50">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">실시간 채팅</h3>
                    <div className={`w-2 h-2 rounded-full ${
                        status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
                        아직 메시지가 없습니다.<br />
                        첫 번째 메시지를 보내보세요! 💬
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMyMessage = msg.userId === userId
                        return (
                            <div
                                key={msg.id}
                                className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                        isMyMessage
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    }`}
                                >
                                    {!isMyMessage && (
                                        <div className="text-xs opacity-75 mb-1">
                                            {msg.userName}
                                        </div>
                                    )}
                                    <div>{msg.message}</div>
                                    <div className={`text-xs mt-1 opacity-75 ${
                                        isMyMessage ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={status === 'connected' ? '메시지를 입력하세요...' : '연결 중...'}
                        disabled={status !== 'connected'}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 placeholder-gray-500 dark:placeholder-gray-400
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || status !== 'connected'}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                                 disabled:bg-gray-400 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {displayName}로 채팅 중
                </div>
            </div>
        </div>
    )
}
