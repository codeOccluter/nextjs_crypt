// server/websocket/websocket-server.ts - WebSocket 서버 구현
import { WebSocketServer, WebSocket } from 'ws'
import { IncomingMessage } from 'http'
import { parse } from 'url'

// 연결된 클라이언트들을 관리하는 Set
const clients = new Set<WebSocket>()

// WebSocket 메시지 타입 정의
export type WebSocketMessage = {
    type: 'notification' | 'chat' | 'system' | 'graph_activity'
    data: {
        id: string
        message: string
        timestamp: number
        userId?: string
        userName?: string
        // 그래프 활동 관련 추가 필드
        activityType?: 'graph_created' | 'data_added'
        graphTitle?: string
        notificationType?: 'info' | 'success' | 'error' | 'graph_activity'
    }
}

// WebSocket 서버 생성 함수
export function createWebSocketServer(port: number = 8080) {
    const wss = new WebSocketServer({ 
        port,
        // CORS 설정 추가
        verifyClient: (info: any) => {
            // 개발 환경에서는 모든 origin 허용
            const origin = info.origin
            console.log('WebSocket 연결 요청 origin:', origin)
            return true // 모든 origin 허용 (개발용)
        }
    })
    
    console.log(`WebSocket 서버가 포트 ${port}에서 실행 중입니다.`)
    console.log('CORS 설정: 모든 origin 허용 (개발 모드)')
    
    wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
        const clientInfo = {
            ip: req.socket.remoteAddress,
            userAgent: req.headers['user-agent'],
            origin: req.headers.origin
        }
        console.log('새로운 클라이언트가 연결되었습니다:', clientInfo)
        console.log('현재 연결된 클라이언트 수:', clients.size + 1)
        
        // 클라이언트를 Set에 추가
        clients.add(ws)
        
        // 클라이언트에 고유 ID 부여 (디버깅용)
        const clientId = Date.now().toString()
        ;(ws as any).clientId = clientId
        console.log(`클라이언트 ID: ${clientId}`)
        
        // 연결 확인 메시지 전송
        const welcomeMessage: WebSocketMessage = {
            type: 'system',
            data: {
                id: Date.now().toString(),
                message: 'WebSocket 연결이 성공했습니다!',
                timestamp: Date.now()
            }
        }
        ws.send(JSON.stringify(welcomeMessage))
        
        // 하트비트 설정 (30초마다 ping)
        const heartbeat = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.ping()
                console.log('Ping 전송')
            } else {
                clearInterval(heartbeat)
            }
        }, 30000)
        
        // pong 응답 처리
        ws.on('pong', () => {
            console.log('Pong 수신 - 연결 유지됨')
        })
        
        // 클라이언트로부터 메시지 수신
        ws.on('message', (data: Buffer) => {
            try {
                const message: WebSocketMessage = JSON.parse(data.toString())
                console.log('받은 메시지:', message)
                
                // 모든 연결된 클라이언트에게 메시지 브로드캐스트
                broadcastToAll(message)
            } catch (error) {
                console.error('메시지 파싱 오류:', error)
            }
        })
        
        // 클라이언트 연결 종료 처리
        ws.on('close', (code, reason) => {
            console.log(`클라이언트 연결이 종료되었습니다. Code: ${code}, Reason: ${reason}`)
            clients.delete(ws)
            clearInterval(heartbeat)
            console.log('현재 연결된 클라이언트 수:', clients.size)
        })
        
        // 에러 처리
        ws.on('error', (error) => {
            console.error('WebSocket 에러:', error)
            clients.delete(ws)
        })
    })
    
    return wss
}

// 모든 클라이언트에게 메시지 브로드캐스트
export function broadcastToAll(message: WebSocketMessage) {
    const messageString = JSON.stringify(message)
    
    console.log(`브로드캐스트 시작: ${clients.size}개 클라이언트에게 전송`)
    console.log('전송할 메시지:', message)
    
    let sentCount = 0
    let removedCount = 0
    
    clients.forEach((client) => {
        const clientId = (client as any).clientId || 'unknown'
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString)
            sentCount++
            console.log(`클라이언트 ${clientId}에게 메시지 전송 완료 (${sentCount}/${clients.size})`)
        } else {
            // 연결이 끊어진 클라이언트는 제거
            clients.delete(client)
            removedCount++
            console.log(`연결 끊어진 클라이언트 ${clientId} 제거 (${removedCount}개)`)
        }
    })
    
    console.log(`브로드캐스트 완료: ${sentCount}개 전송, ${removedCount}개 제거`)
}

// 특정 사용자에게만 메시지 전송 (향후 확장용)
export function sendToUser(userId: string, message: WebSocketMessage) {
    // 실제로는 사용자 ID와 WebSocket 연결을 매핑하는 Map이 필요
    // 지금은 모든 클라이언트에게 전송
    broadcastToAll(message)
}

// 알림 전송 헬퍼 함수
export function sendNotificationToAll(message: string, userId?: string, userName?: string) {
    const notification: WebSocketMessage = {
        type: 'notification',
        data: {
            id: Date.now().toString(),
            message,
            timestamp: Date.now(),
            userId,
            userName,
            notificationType: 'info'
        }
    }
    
    broadcastToAll(notification)
}

// 그래프 활동 알림 전송 함수
export function sendGraphActivityToAll(
    userName: string, 
    activityType: 'graph_created' | 'data_added', 
    graphTitle?: string,
    userId?: string
) {
    const activityMessages = {
        graph_created: "그래프를 생성했습니다",
        data_added: `"${graphTitle}" 그래프에 데이터를 추가했습니다`
    }
    
    const notification: WebSocketMessage = {
        type: 'graph_activity',
        data: {
            id: Date.now().toString(),
            message: activityMessages[activityType],
            timestamp: Date.now(),
            userId,
            userName,
            activityType,
            graphTitle,
            notificationType: 'graph_activity'
        }
    }
    
    broadcastToAll(notification)
}

// 채팅 메시지를 모든 클라이언트에게 브로드캐스트
export function sendChatMessageToAll(
    id: string,
    message: string,
    userName: string,
    userId: string,
    timestamp: number
) {
    const chatMessage: WebSocketMessage = {
        type: 'chat',
        data: {
            id,
            message,
            timestamp,
            userName,
            userId
        }
    }
    
    broadcastToAll(chatMessage)
    console.log(`💬 채팅 메시지 브로드캐스트 완료: ${userName} - ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`)
}
