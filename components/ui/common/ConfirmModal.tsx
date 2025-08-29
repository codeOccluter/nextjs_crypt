"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    open: boolean
    title?: string
    description?: string | React.ReactNode
    confirmText?: string
    cancelText?: string
    confirmDisabled?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmModal({
    open,
    title = "확인",
    description,
    confirmText = "예",
    cancelText = "아니오",
    confirmDisabled = false,
    onConfirm,
    onCancel,
}: Props) {

    useEffect(() => {
        // ESC로 닫기
        if(!open) return

        const onKey = (e: KeyboardEvent) => {
            if(e.key === "Escape") onCancel()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, onCancel])

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="fixed z-[1001] inset-0 flex items-center justify-center px-4"
                        initial={{ scale: 0.98, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 10 }}
                        transition={{ duration: 0.16 }}
                    >
                        <div className="w-full max-w-sm rounded-xl bg-white text-zinc-900 shadow-2xl border border-zinc-200">
                            <div className="p-4">
                                <h3 className="text-base font-bold">{title}</h3>
                                {description && (
                                    <p className="mt-1.5 text-sm text-zinc-600">{description}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-end gap-2 p-3 border-t border-zinc-200">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="h-9 px-3 rounded-lg border border-zinc-300 hover:bg-zinc-50 text-sm"
                                >{cancelText}</button>
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    disabled={confirmDisabled}
                                    className="h-9 px-3 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 disabled:opacity-60"
                                >{confirmText}</button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}