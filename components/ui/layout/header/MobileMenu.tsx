"use client"

import { useRef } from "react"
import clsx from "clsx"
import LocaleLink from "../../common/i18n/LocaleLink"
import { useTranslation } from "@/lib/i18n/i18n-client"

type Props = {
    open: boolean
    onClose: () => void
}

export function HeaderMoblieMenu({ open, onClose }: Props) {
    const { t } = useTranslation()
    const panelRef = useRef<HTMLDivElement>(null)

    const navLinks = [
        { href: "/main", label: t("header.home") },
    ]

    const algoLinks = [
        { href: "/main/graph/new", label: t("header.link.graph") }
    ]

    const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if(!panelRef.current) return
        if(!panelRef.current.contains(e.target as Node)) onClose()
    }

    return (
        <div
            className={clsx(
                "fixed inset-0 z-[60] transition-opacity duration-200",
                open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
            aria-hidden={!open}
            onMouseDown={handleOverlayClick}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className={clsx(
                "absolute right-0 top-0 h-full w-[18rem] max-w-[85vw] bg-zinc-950 text-white shadow-2xl",
                "transition-transform duration-300 will-change-transform",
                open ? "translate-x-0" : "translate-x-full"
                )}
            >

            <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
                <span className="font-semibold">Menu</span>
                <button
                    onClick={onClose}
                    aria-label="메뉴 닫기"
                    className="rounded p-2 hover:bg-white/10"
                >
                    <span className="block h-0.5 w-5 rotate-45 bg-white origin-center translate-y-[2px]" />
                    <span className="block h-0.5 w-5 rotate-45 bg-white origin-center -translate-y-[2px]" />
                </button>
            </div>
    
            <nav className="px-2 py-2">
                <ul className="space-y-1">
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <LocaleLink
                                href={l.href}
                                className="block rounded px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                                onClick={onClose}
                            >{l.label}</LocaleLink>
                        </li>
                    ))}
        
                    <li className="mt-2 border-t border-white/10 pt-2">
                        <div className="px-3 pb-1 text-[13px] uppercase tracking-wider text-zinc-400">
                            Algorithm
                        </div>
                        <ul className="space-y-1">
                            {algoLinks.map((a) => (
                                <li key={a.href}>
                                    <LocaleLink
                                    href={a.href}
                                    className="block rounded px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                                    onClick={onClose}
                                    >{a.label}</LocaleLink>
                                </li>
                            ))}
                        </ul>
                    </li>
        
                    <li className="mt-3 border-t border-white/10 pt-3">
                        <button
                            onClick={onClose}
                            className="w-full rounded border border-white/20 px-3 py-2 text-left text-sm hover:bg-white/10"
                        >닫기</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    )
}