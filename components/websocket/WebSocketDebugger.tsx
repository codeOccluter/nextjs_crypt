// components/websocket/WebSocketDebugger.tsx - WebSocket 디버깅 도구
"use client"

import { useState, useEffect, useMemo } from 'react'
import { useWebSocketContext } from './WebSocketProvider'
import { useUnifiedSession } from '@/hooks/auth/useUnfiedSession'
import { toGuestNickname } from '@/features/auth/guest/guest.formatter'

export default function WebSocketDebugger() {
    const { status, sendMessage, lastMessage } = useWebSocketContext()
    const { user } = useUnifiedSession()
    const [messages, setMessages] = useState<any[]>([])
    const [testMessage, setTestMessage] = useState('')

    const userId = useMemo(() => {
        if(user?.role === 0) {
            return toGuestNickname(user?.uniqueName, user?.guestIdx)
        }else if(user?.role === 1) {
            return user?.id
        }
        return null
    }, [user])

    // 받은 메시지들을 기록
    useEffect(() => {
        if (lastMessage) {
            setMessages(prev => [...prev.slice(-9), lastMessage]) // 최근 10개만 유지
        }
    }, [lastMessage])

    const sendTestMessage = () => {
        if (!testMessage.trim()) return
        
        sendMessage({
            type: 'notification',
            data: {
                id: Date.now().toString(),
                message: `테스트: ${testMessage}`,
                timestamp: Date.now(),
                // userId: userId || undefined,
                userId: String(user?.id || user?.guestId || ''),
                userName: user?.name || user?.uniqueName || '테스트 사용자',
                notificationType: 'info'
            }
        })
        setTestMessage('')
    }

    const sendGraphActivityTest = () => {
        sendMessage({
            type: 'graph_activity',
            data: {
                id: Date.now().toString(),
                message: '테스트 그래프에 데이터를 추가했습니다',
                timestamp: Date.now(),
                userId: String(user?.id || user?.guestId || ''),
                userName: user?.name || user?.uniqueName || '테스트 사용자',
                activityType: 'data_added' as const,
                graphTitle: '테스트 그래프',
                notificationType: 'graph_activity'
            }
        })
    }

    const clearMessages = () => {
        setMessages([])
    }

    return (
        <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4 z-50">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">WebSocket 디버거</h3>
                <button
                    onClick={clearMessages}
                    className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    지우기
                </button>
            </div>

            {/* 연결 상태 */}
            <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="text-sm">
                    <strong>상태:</strong> <span className={
                        status === 'connected' ? 'text-green-600' :
                        status === 'connecting' ? 'text-yellow-600' :
                        status === 'error' ? 'text-red-600' : 'text-gray-600'
                    }>{status}</span>
                </div>
                <div className="text-sm">
                    <strong>사용자:</strong> {user?.name || user?.uniqueName || '없음'}
                </div>
                <div className="text-sm">
                    <strong>사용자 ID:</strong> {user?.id || user?.guestId || '없음'}
                </div>
            </div>

            {/* 테스트 메시지 전송 */}
            <div className="mb-3">
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={testMessage}
                        onChange={(e) => setTestMessage(e.target.value)}
                        placeholder="테스트 메시지"
                        className="flex-1 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                        onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
                    />
                    <button
                        onClick={sendTestMessage}
                        disabled={status !== 'connected'}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        전송
                    </button>
                </div>
                <button
                    onClick={sendGraphActivityTest}
                    disabled={status !== 'connected'}
                    className="w-full px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    그래프 활동 테스트
                </button>
            </div>

            {/* 받은 메시지들 */}
            <div className="max-h-60 overflow-y-auto">
                <h4 className="text-sm font-semibold mb-2">받은 메시지 ({messages.length})</h4>
                {messages.length === 0 ? (
                    <div className="text-sm text-gray-500">받은 메시지가 없습니다</div>
                ) : (
                    <div className="space-y-2">
                        {messages.map((msg, index) => (
                            <div key={index} className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                <div><strong>타입:</strong> {msg.type}</div>
                                <div><strong>메시지:</strong> {msg.data.message}</div>
                                <div><strong>사용자:</strong> {msg.data.userName || '없음'}</div>
                                <div><strong>시간:</strong> {new Date(msg.data.timestamp).toLocaleTimeString()}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
