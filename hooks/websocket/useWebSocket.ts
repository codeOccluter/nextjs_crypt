// hooks/websocket/useWebSocket.ts - WebSocket 클라이언트 훅
"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { WebSocketMessage } from '@/server/websocket/websocket-server'
import { useNotificationStore } from '@/stores/notification/notification.store'
import { useUnifiedSession } from '@/hooks/auth/useUnfiedSession'

type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

interface UseWebSocketReturn {
    status: WebSocketStatus
    sendMessage: (message: WebSocketMessage) => void
    sendNotification: (message: string) => void
    lastMessage: WebSocketMessage | null
}

// 전역 WebSocket 연결 관리 (중복 방지)
let globalWebSocket: WebSocket | null = null
let globalConnectionPromise: Promise<WebSocket> | null = null

export function useWebSocket(url?: string): UseWebSocketReturn {
    const wsRef = useRef<WebSocket | null>(null)
    const [status, setStatus] = useState<WebSocketStatus>('disconnected')
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
    const { addNotification } = useNotificationStore()
    const { user } = useUnifiedSession()
    
    // WebSocket URL (환경변수 또는 기본값)
    const wsUrl = url || process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080'
    
    console.log('WebSocket URL:', wsUrl)
    console.log('Environment WEBSOCKET_URL:', process.env.NEXT_PUBLIC_WEBSOCKET_URL)
    console.log('🔍 현재 전역 WebSocket 상태:', globalWebSocket?.readyState)
    
    // WebSocket 연결 함수
    const connect = useCallback(() => {
        // 전역 WebSocket이 이미 연결되어 있으면 재사용
        if (globalWebSocket?.readyState === WebSocket.OPEN) {
            console.log('🔄 기존 WebSocket 연결 재사용')
            wsRef.current = globalWebSocket
            setStatus('connected')
            return
        }
        
        // 이미 연결 중이면 대기
        if (globalConnectionPromise) {
            console.log('⏳ WebSocket 연결 대기 중...')
            globalConnectionPromise.then(ws => {
                wsRef.current = ws
                setStatus('connected')
            }).catch(() => {
                setStatus('error')
            })
            return
        }
        
        setStatus('connecting')
        
        // 새로운 연결 생성
        globalConnectionPromise = new Promise((resolve, reject) => {
            try {
                console.log('🆕 새로운 WebSocket 연결 시도:', wsUrl)
                const ws = new WebSocket(wsUrl)
                globalWebSocket = ws
                wsRef.current = ws
            
                ws.onopen = () => {
                    console.log('✅ WebSocket 연결 성공:', wsUrl)
                    setStatus('connected')
                    resolve(ws)
                    globalConnectionPromise = null
                }
            
            ws.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data)
                    setLastMessage(message)
                    
                    // 알림 타입별 처리
                    if (message.type === 'notification') {
                        addNotification(message.data.message, message.data.notificationType || 'info')
                    } else if (message.type === 'system') {
                        addNotification(message.data.message, 'success')
                    } else if (message.type === 'graph_activity') {
                        // 모든 사용자가 WebSocket을 통해서만 알림을 받으므로 중복 방지 로직 제거
                        console.log('📨 그래프 활동 알림 수신:', {
                            userName: message.data.userName,
                            activityType: message.data.activityType,
                            graphTitle: message.data.graphTitle
                        })
                        
                        // 그래프 활동 알림은 특별 처리
                        const { addGraphActivityNotification } = useNotificationStore.getState()
                        addGraphActivityNotification(
                            message.data.userName || '알 수 없는 사용자',
                            message.data.activityType || 'graph_created',
                            message.data.graphTitle
                        )
                        console.log('✅ 그래프 활동 알림 표시 완료')
                    }
                    
                    console.log('WebSocket 메시지 수신:', message)
                } catch (error) {
                    console.error('WebSocket 메시지 파싱 오류:', error)
                }
            }
            
                ws.onclose = (event) => {
                    console.log('❌ WebSocket 연결 종료:', event.code, event.reason)
                    setStatus('disconnected')
                    globalWebSocket = null
                    globalConnectionPromise = null
                    
                    // 정상 종료(1000)가 아닌 경우 재연결 시도
                    if (event.code !== 1000 && event.code !== 1001) {
                        console.log('비정상 종료 감지, 3초 후 재연결 시도...')
                        setTimeout(() => {
                            console.log('WebSocket 재연결 시도...')
                            connect()
                        }, 3000)
                    } else {
                        console.log('정상 종료 또는 페이지 이동으로 인한 종료')
                    }
                }
            
                ws.onerror = (error) => {
                    console.error('❌ WebSocket 에러:', error)
                    console.error('WebSocket URL:', wsUrl)
                    setStatus('error')
                    globalWebSocket = null
                    globalConnectionPromise = null
                    addNotification(`WebSocket 연결 오류: ${wsUrl}`, 'error')
                    reject(error)
                }
                
            } catch (error) {
                console.error('❌ WebSocket 연결 실패:', error)
                setStatus('error')
                globalWebSocket = null
                globalConnectionPromise = null
                reject(error)
            }
        })
        
    }, [wsUrl, addNotification])
    
    // 메시지 전송 함수
    const sendMessage = useCallback((message: WebSocketMessage) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message))
        } else {
            console.warn('WebSocket이 연결되지 않았습니다.')
            addNotification('WebSocket 연결이 필요합니다.', 'info')
        }
    }, [addNotification])
    
    // 알림 전송 헬퍼 함수
    const sendNotification = useCallback((message: string) => {
        const notification: WebSocketMessage = {
            type: 'notification',
            data: {
                id: Date.now().toString(),
                message,
                timestamp: Date.now()
            }
        }
        sendMessage(notification)
    }, [sendMessage])
    
    // 컴포넌트 마운트 시 연결
    useEffect(() => {
        connect()
        
        // 주기적으로 연결 상태 확인 (30초마다)
        const healthCheck = setInterval(() => {
            if (wsRef.current?.readyState === WebSocket.CLOSED || 
                wsRef.current?.readyState === WebSocket.CLOSING) {
                console.log('WebSocket 연결 끊어짐 감지, 재연결 시도...')
                connect()
            }
        }, 30000)
        
        // 컴포넌트 언마운트 시 연결 종료
        return () => {
            clearInterval(healthCheck)
            if (wsRef.current) {
                wsRef.current.close(1000, 'Component unmounted')
            }
        }
    }, [connect])
    
    return {
        status,
        sendMessage,
        sendNotification,
        lastMessage
    }
}
