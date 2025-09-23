// components/chat/ChatSystem.tsx - 채팅 시스템 통합 컴포넌트
"use client"

import { useState, useEffect } from 'react'
import ChatWindow from './ChatWindow'
import ChatToggleButton from './ChatToggleButton'
import { useWebSocketContext } from '@/components/websocket/WebSocketProvider'
import { useUnifiedSession } from '@/hooks/auth/useUnfiedSession'

export default function ChatSystem() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [hasNewMessages, setHasNewMessages] = useState(false)
    const { lastMessage } = useWebSocketContext()
    const { user, status } = useUnifiedSession()

    // 로그아웃 시 채팅창 자동 닫기
    useEffect(() => {
        if (!user && status === "unauthenticated") {
            setIsChatOpen(false)
            setHasNewMessages(false)
        }
    }, [user, status])

    // 새 채팅 메시지 알림 처리 (로그인 상태에서만)
    useEffect(() => {
        if (user && lastMessage && lastMessage.type === 'chat' && !isChatOpen) {
            setHasNewMessages(true)
        }
    }, [lastMessage, isChatOpen, user])

    // 채팅 창 열기
    const handleOpenChat = () => {
        setIsChatOpen(true)
        setHasNewMessages(false)
    }

    // 채팅 창 닫기
    const handleCloseChat = () => {
        setIsChatOpen(false)
    }

    // 로딩 중이거나 완전히 로그아웃된 경우에만 숨김
    // authenticated(구글 등 로그인) 또는 guest(게스트 로그인) 상태에서만 채팅 표시
    if (status === "loading" || status === "unauthenticated") {
        return null
    }

    return (
        <>
            {/* 채팅 창 */}
            <ChatWindow 
                isOpen={isChatOpen} 
                onClose={handleCloseChat} 
            />
            
            {/* 채팅 토글 버튼 (채팅 창이 닫혀있을 때만) */}
            {!isChatOpen && (
                <ChatToggleButton 
                    onClick={handleOpenChat}
                    hasNewMessages={hasNewMessages}
                />
            )}
        </>
    )
}
