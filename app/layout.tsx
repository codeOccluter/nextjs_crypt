import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid h-dvh grid-rows-[auto_1fr_auto] m-0 p-0">
        <Header />
        <main className="p-0 m-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
