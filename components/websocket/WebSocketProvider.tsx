// components/websocket/WebSocketProvider.tsx - WebSocket 프로바이더
"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { useWebSocket } from '@/hooks/websocket/useWebSocket'
import { WebSocketMessage } from '@/server/websocket/websocket-server'

type WebSocketContextType = {
    status: 'connecting' | 'connected' | 'disconnected' | 'error'
    sendMessage: (message: WebSocketMessage) => void
    sendNotification: (message: string) => void
    lastMessage: WebSocketMessage | null
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

interface WebSocketProviderProps {
    children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
    const websocket = useWebSocket()
    
    return (
        <WebSocketContext.Provider value={websocket}>
            {children}
        </WebSocketContext.Provider>
    )
}

// WebSocket 컨텍스트 사용 훅
export function useWebSocketContext() {
    const context = useContext(WebSocketContext)
    if (!context) {
        throw new Error('useWebSocketContext must be used within WebSocketProvider')
    }
    return context
}
