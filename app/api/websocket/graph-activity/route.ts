// app/api/websocket/graph-activity/route.ts - 그래프 활동 WebSocket 알림 API
import { NextRequest, NextResponse } from "next/server"
import { sendGraphActivityToAll } from "@/server/websocket/websocket-server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { userName, activityType, graphTitle, userId } = body
        
        if (!userName || !activityType) {
            return NextResponse.json(
                { success: false, message: "사용자명과 활동 타입이 필요합니다" },
                { status: 400 }
            )
        }
        
        if (!['graph_created', 'data_added'].includes(activityType)) {
            return NextResponse.json(
                { success: false, message: "유효하지 않은 활동 타입입니다" },
                { status: 400 }
            )
        }
        
        // WebSocket을 통해 모든 클라이언트에게 그래프 활동 알림 전송
        sendGraphActivityToAll(userName, activityType, graphTitle, userId)
        
        console.log(`그래프 활동 알림 전송: ${userName} - ${activityType} - ${graphTitle}`)
        
        return NextResponse.json({
            success: true,
            message: "그래프 활동 알림이 전송되었습니다"
        })
        
    } catch (error) {
        console.error('그래프 활동 알림 전송 오류:', error)
        return NextResponse.json(
            { success: false, message: "서버 오류" },
            { status: 500 }
        )
    }
}
