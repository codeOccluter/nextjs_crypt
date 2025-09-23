// /app/layout.tsx - 최상위 전체 Root레이아웃
// 필수: Server Components, <html>,<body> 태그는 여기만 있어야 함
import "./globals.css"
import Providers from "./provider";
import WebSocketDebugger from "@/components/websocket/WebSocketDebugger";
import ChatSystem from "@/components/chat/ChatSystem";

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
          <Providers>
            {children}
            {/* <WebSocketDebugger /> */}
            <ChatSystem />
          </Providers>
      </body>
  </html>
  )
}
