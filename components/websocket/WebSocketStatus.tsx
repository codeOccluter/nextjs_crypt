// components/websocket/WebSocketStatus.tsx - WebSocket 연결 상태 표시
"use client"

import { useWebSocketContext } from './WebSocketProvider'

export default function WebSocketStatus() {
    const { status } = useWebSocketContext()
    
    const handleReconnect = () => {
        window.location.reload() // 간단한 재연결 방법
    }
    
    const getStatusColor = () => {
        switch (status) {
            case 'connected':
                return 'bg-green-500'
            case 'connecting':
                return 'bg-yellow-500'
            case 'disconnected':
                return 'bg-gray-500'
            case 'error':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }
    
    const getStatusText = () => {
        switch (status) {
            case 'connected':
                return '실시간 연결됨'
            case 'connecting':
                return '연결 중...'
            case 'disconnected':
                return '연결 끊김'
            case 'error':
                return '연결 오류'
            default:
                return '알 수 없음'
        }
    }
    
    return (
        <div className="flex items-center gap-2 text-xs" title={`WebSocket 상태: ${getStatusText()}`}>
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
            <span className="text-white/70">
                {getStatusText()}
            </span>
            {(status === 'disconnected' || status === 'error') && (
                <button
                    onClick={handleReconnect}
                    className="ml-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="재연결"
                >
                    재연결
                </button>
            )}
        </div>
    )
}
