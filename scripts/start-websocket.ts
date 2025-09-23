// scripts/start-websocket.ts - WebSocket 서버 시작 스크립트
import { createWebSocketServer } from '../server/websocket/websocket-server'

// 환경변수에서 포트 읽기 (기본값: 8080)
const port = parseInt(process.env.WEBSOCKET_PORT || '8080')

// WebSocket 서버 시작
const wss = createWebSocketServer(port)

// 프로세스 종료 시 정리
process.on('SIGINT', () => {
    console.log('\nWebSocket 서버를 종료합니다...')
    wss.close(() => {
        console.log('WebSocket 서버가 종료되었습니다.')
        process.exit(0)
    })
})

process.on('SIGTERM', () => {
    console.log('\nWebSocket 서버를 종료합니다...')
    wss.close(() => {
        console.log('WebSocket 서버가 종료되었습니다.')
        process.exit(0)
    })
})
