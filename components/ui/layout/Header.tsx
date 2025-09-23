"use client"

import "@/styles/components/layout/header.css"
import { HeaderNavbar } from "./header/Navbar"
import { Greeting } from "./header/Greeting"
import { HedaerLogo } from "./header/Logo"
import { useEffect, useRef, useState } from "react"
import { HeaderMoblieMenu } from "./header/MobileMenu"
import { HeaderMoblieMenuButton } from "./header/MoblieMenuButton"
import { HeaderLanguageSwitcherButton } from "./header/LanguageSwitcherButton"
import clsx from "clsx"
import UserQuickPanel from "../menu-panel/UserQuickPanel"
import { useTranslation } from "@/lib/i18n/i18n-client"
import useSessionQuery from "../../../hooks/auth/useSessionQuery"
import { useDemoStore } from "@/stores/ui/demo.store"
import WebSocketStatus from "@/components/websocket/WebSocketStatus"

export default function Header() {

    const { status, query } = useSessionQuery()
    const [open, setOpen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const { isDemoVisible, toggleDemo } = useDemoStore()

    useEffect(() => {

        const onKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") setOpen(false)
        }

        document.addEventListener("keydown", onKeyDown)
        if(open) {
            const prev = document.body.style.overflow
            document.body.style.overflow = "hidden"
            
            return () => {
                document.body.style.overflow = prev
                document.removeEventListener("keydown", onKeyDown)
            }
        }

        return () => document.removeEventListener("keydown", onKeyDown)
    }, [open])

    const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if(!panelRef.current) return
        if(!panelRef.current.contains(e.target as Node)) setOpen(false)
    }

    return (
        <header className="bg-black text-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-6 xl:px-12">
                <div className="flex items-center gap-4">
                    <HedaerLogo />
                    <HeaderNavbar />
                </div>
                <div className="ml-auto flex items-center gap-3 md:gap-6 min-w-0">
                    {/* WebSocket 연결 상태 */}
                    <div className="hidden sm:block">
                        <WebSocketStatus />
                    </div>
                    
                    {/* 데모 토글 버튼 */}
                    <button
                        onClick={toggleDemo}
                        className={clsx(
                            "px-2 py-1 text-xs font-medium rounded transition-colors",
                            isDemoVisible 
                                ? "bg-yellow-500 text-black hover:bg-yellow-400" 
                                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                        )}
                        title={isDemoVisible ? "데모 숨기기" : "데모 보기"}
                    >
                        DEMO
                    </button>
                    
                    <HeaderLanguageSwitcherButton />
                    <div className="hidden md:block h-6 w-px bg-white/20 shrink-0" />
                   
                    <Greeting 
                        status={status}
                        user={query?.data?.user}
                    />
                    <UserQuickPanel />
                    <HeaderMoblieMenuButton 
                        open={open}
                        onOpen={() => setOpen(true)}
                    />
                </div>
                <div
                    className={clsx(
                        "fixed inset-0 z-[60] transition-opacity duration-200",
                        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    )}
                    aria-hidden={!open}
                    onMouseDown={handleOverlayClick}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                    <HeaderMoblieMenu 
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                </div>
            </div>
        </header>
    )
}