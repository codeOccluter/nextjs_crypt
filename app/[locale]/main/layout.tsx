import Header from "@/components/ui/layout/Header"
import Footer from "@/components/ui/layout/Footer"
import SessionGate from "@/components/mainpage/auth/Gate/SessionGate"
import SessionProvider from "@/components/auth/SessionProvider"

export default async function MainLayout({
  children,
}:{
  children: React.ReactNode;
}) {

  return (
    <SessionGate>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
          <Header />
              <main className="overflow-y-auto">
                <SessionProvider>{children}</SessionProvider>
              </main>
          <Footer />
      </div>
    </SessionGate>
  )
}