// app/api/websocket/chat/route.ts - 채팅 메시지 API
import { NextRequest, NextResponse } from "next/server"
import { sendChatMessageToAll } from "@/server/websocket/websocket-server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { id, message, userName, userId, timestamp } = body

        if (!message || !userName || !userId) {
            return NextResponse.json(
                { success: false, message: "필수 필드가 누락되었습니다" },
                { status: 400 }
            )
        }

        // WebSocket을 통해 모든 클라이언트에게 채팅 메시지 브로드캐스트
        sendChatMessageToAll(
            id || Date.now().toString(),
            message,
            userName,
            userId,
            timestamp || Date.now()
        )

        return NextResponse.json({ 
            success: true, 
            message: "채팅 메시지가 전송되었습니다" 
        })
    } catch (error) {
        console.error('채팅 API 오류:', error)
        return NextResponse.json(
            { success: false, message: "서버 오류가 발생했습니다" },
            { status: 500 }
        )
    }
}
