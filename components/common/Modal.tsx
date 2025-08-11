"use client"
// 공용 Modal 컴포넌트
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"

type Props = {
    open: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: Props) {

    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const onKey = (e: KeyboardEvent) => {
            if(e.key === "Escape") onClose
        }
        document.addEventListener("keydown", onKey)

        if(open) {
            const prev = document.body.style.overflow
            document.body.style.overflow = "hidden"

            return () => {
                document.body.style.overflow = prev
                document.removeEventListener("keydown", onKey)
            }
        }
        
        return () => document.removeEventListener("keydown", onKey)
    }, [open, onClose])

    if(typeof document === "undefined") return null
    if(!ref.current) {
        const div = document.createElement("div")
        div.setAttribute("id", "modal-root")
        document.body.appendChild(div)
        
        ref.current = div
    }

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    aria-modal role="dialog" aria-labelledby={title ? "modal-title" : undefined}
                    onMouseDown={(e) => {
                        if(e.target === e.currentTarget) onClose()
                    }}
                >
                    <motion.div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        className=" relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900
                                    text-white shadow-2xl"
                        initial={{ y: 20, scale: 0.98, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 10, scale: 0.98, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    >
                        {title && (
                            <div className="flex items-center justify-between px-5 pt-4 pb-3">
                                <h2 id="modal-title" className="text-lg font-semibold">{title}</h2>
                                <button
                                    className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition"
                                    onClick={onClose}
                                    aria-label="Close"
                                >X</button>
                            </div>
                        )}
                        <div className="px-5 pb-5">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        ref.current
    )
}