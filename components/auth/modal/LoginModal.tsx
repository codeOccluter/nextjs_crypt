"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/i18n/i18n-client"

type LoginModalProps = {
    open: boolean
    title?: string
    primaryLabel?: string
    onPrimary?: () => void | Promise<void>
    primaryDisabled?: boolean
    pending?: boolean
    onSubmit?: () => Promise<void> | void
    buttonLabel?: string
    backgroundImageUrl?: string
    gradientClassName?: string
    children: React.ReactNode
}

export default function LoginModal({ 
    open, 
    title,
    primaryLabel,
    onPrimary,
    primaryDisabled,
    pending,
    backgroundImageUrl = "",
    gradientClassName = "from-sky-500/40 via-fuchsia-500/30 to-rose-500/40",
    children
}: LoginModalProps) {

    const { t } = useTranslation()

    useEffect(() => {
        if(!open) return
        document.documentElement.style.overflow = "hidden"

    }, [open])

    if(!open) return null

    const handlePrimary = async () => {
        if(!onPrimary || pending) return
        await onPrimary()
    }

    return createPortal(
        <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div
                className="pointer-events-none abolute inset-0 -z-10 bg-cover bg-center"
                style={
                    backgroundImageUrl ? {
                        backgroundImage: `url(${backgroundImageUrl})`
                    } : undefined
                }
            />
            <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${gradientClassName}`} />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-black/30 backdrop-blur-[3px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.35)_100%)]" />
            <button 
                className="absolute inset-0"
                aria-label="close overlay"
            />

            <div
                className="relative mx-4 w-[800px] max-w-[96vw]
                           rounded-2xl border border-white/15
                           bg-zinc-900/80 backdrop-blur-md shadow-2xl
                           ring-1 ring-black/20
                           flex flex-col max-h-[88vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-8 pt-8 pb-4">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                </div>
                <div className="px-8 pb-4 overflow-auto flex-1">{children}</div>
                <div className="px-8 pb-8 pt-8">
                    <button
                        type="submit"
                        onClick={handlePrimary}
                        disabled={!!primaryDisabled || !!pending}
                        className={`inline-flex h-11 w-full items-center justify-center
                                    rounded-lg bg-sky-500 text-white text-[15px] font-semibold
                                    transition
                                     ${primaryDisabled || pending
                                            ? "bg-sky-500/60 text-white/85 cursor-not-allowed"
                                            : "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700"}
                                `}
                    >
                        {pending && <Loader2 size={16} className="mr-2 animate-spin" />}
                        {pending ? t("login_modal.processing") : primaryLabel}
                    </button>
                </div>
                <div className="pointer-events-none absolute -inset-x-6 bottom-2 -z-10 h-10 rounded-[28px] bg-black/40 blur-xl" />
            </div>
        </div>,
        document.body
    )
}