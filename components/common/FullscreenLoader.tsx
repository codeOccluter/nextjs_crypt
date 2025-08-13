"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Loader2 } from "lucide-react"

type FullscreenLoaderProps = {
    open: boolean
    text?: string
    children?: React.ReactNode
}

export default function FullscreenLoader({
    open,
    text = "처리 중...",
    children,
}: FullscreenLoaderProps) {

    useEffect(() => {
        if(!open) return

        const previous = document.documentElement.style.overflow

        return () => {
            document.documentElement.style.overflow = previous
        }
    }, [open])

    if(!open) return null

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center
                       bg-black/40 backdrop-blur-sm cursor-wait"
            aria-live="assertive"
            role="status"
            aria-label={text}
        >
            <div
                className="flex flex-col items-center gap-3
                           rounded-xl bg-white/95 p-6 shadow-2xl
                           ring-1 ring-black/5"
            >
                <Loader2 className="animate-spin" size={36} />
                <p className="text-sm text-zinc-700">{text}</p>

                {children}
            </div>
        </div>,
        document.body
    )
}