"use client"

import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="grid h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="overflow-y-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
