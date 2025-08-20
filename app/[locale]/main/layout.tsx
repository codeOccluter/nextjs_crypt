// /app/[locale]/(with-layout)/layout.tsx - 홈 페이지 이후 레이아웃
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AuthGate from "@/components/mainpage/auth/Gate/AuthGate"

export default function MainLayout({
  children,
}:{
  children: React.ReactNode;
}) {

  return (
    <AuthGate>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
          <Header />
              <main className="overflow-y-auto">{children}</main>
          <Footer />
      </div>
    </AuthGate>
  )
}