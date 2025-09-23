// app/api/websocket/notify/route.ts - API를 통한 WebSocket 알림 전송
import { NextRequest, NextResponse } from "next/server"
import { sendNotificationToAll } from "@/server/websocket/websocket-server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { message, userId, userName } = body
        
        if (!message) {
            return NextResponse.json(
                { success: false, message: "메시지가 필요합니다" },
                { status: 400 }
            )
        }
        
        // WebSocket을 통해 모든 클라이언트에게 알림 전송
        sendNotificationToAll(message, userId, userName)
        
        return NextResponse.json({
            success: true,
            message: "알림이 전송되었습니다"
        })
        
    } catch (error) {
        console.error('WebSocket 알림 전송 오류:', error)
        return NextResponse.json(
            { success: false, message: "서버 오류" },
            { status: 500 }
        )
    }
}

// 시스템 알림 전송 (관리자용)
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const { message, type = 'system' } = body
        
        if (!message) {
            return NextResponse.json(
                { success: false, message: "메시지가 필요합니다" },
                { status: 400 }
            )
        }
        
        // 시스템 메시지로 전송
        sendNotificationToAll(`[시스템] ${message}`)
        
        return NextResponse.json({
            success: true,
            message: "시스템 알림이 전송되었습니다"
        })
        
    } catch (error) {
        console.error('시스템 알림 전송 오류:', error)
        return NextResponse.json(
            { success: false, message: "서버 오류" },
            { status: 500 }
        )
    }
}
