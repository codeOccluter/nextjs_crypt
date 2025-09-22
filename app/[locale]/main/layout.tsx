import Header from "@/components/ui/layout/Header"
import Footer from "@/components/ui/layout/Footer"
import SessionGate from "@/components/auth/gate/SessionGate"
import NotificationBar from "@/components/notification/bar/NotificationBar"
import HeaderNotificationBar from "@/components/notification/bar/HeaderNotificationBar"

export default async function MainLayout({
  children,
}:{
  children: React.ReactNode;
}) {

  return (
    <SessionGate>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
          <Header />
          <HeaderNotificationBar />
          <NotificationBar />
          <main className="overflow-y-auto">
            {children}
          </main>
          <Footer />
      </div>
    </SessionGate>
  )
}