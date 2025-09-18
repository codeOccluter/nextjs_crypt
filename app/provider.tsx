"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import SessionProvider from "@/components/providers/SessionProvider"

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </QueryClientProvider>
    )
}