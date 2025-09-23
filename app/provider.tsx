"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import SessionProvider from "@/components/providers/SessionProvider"
import { WebSocketProvider } from "@/components/websocket/WebSocketProvider"

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <WebSocketProvider>
                    {children}
                </WebSocketProvider>
            </SessionProvider>
        </QueryClientProvider>
    )
}