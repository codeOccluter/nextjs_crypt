// /app/[locale]/(with-layout)/layout.tsx - 홈 페이지 이후 레이아웃
import Header from "@/components/ui/layout/Header"
import Footer from "@/components/ui/layout/Footer"
import SessionGate from "@/components/mainpage/auth/Gate/SessionGate"

export default function MainLayout({
  children,
}:{
  children: React.ReactNode;
}) {

  return (
    <SessionGate>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
          <Header />
              <main className="overflow-y-auto">{children}</main>
          <Footer />
      </div>
    </SessionGate>
  )
}