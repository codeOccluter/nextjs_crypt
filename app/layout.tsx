// /app/layout.tsx - 최상위 전체 Root레이아웃
// 필수: Server Components, <html>,<body> 태그는 여기만 있어야 함
import "./globals.css"

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
  </html>
  )
}
