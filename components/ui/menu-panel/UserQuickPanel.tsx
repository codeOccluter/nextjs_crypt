"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LuUser, LuSettings } from "react-icons/lu"
import GuestLogoutButton from "@/components/auth/ui/guest/GuestLogoutButton"
import LocaleLink from "../common/i18n/LocaleLink"
import { LucideUserCircle2 } from "lucide-react"
import { useTranslation } from "@/lib/i18n/i18n-client"
import { useUserPanelStore } from "@/stores/ui/userPanel.store"

export default function UserQuickPanel() {

    const { UserQuickPanelOpen, toggleUserQuickPanel, closeUserQuickPanel } = useUserPanelStore()
    const panelRef = useRef<HTMLDivElement | null>(null)
    const firstFocusRef = useRef<HTMLButtonElement | null>(null)

    const { t } = useTranslation()

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") closeUserQuickPanel()
        }
        document.addEventListener("keydown", onKeyDown)

        return () => document.removeEventListener("keydown", onKeyDown)
    }, [])

    useEffect(() => {
        if(!UserQuickPanelOpen) return

        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        firstFocusRef.current?.focus()

        return () => {
            document.body.style.overflow = prev
        }
    }, [UserQuickPanelOpen])

    const handleOverlayDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if(!panelRef.current) return
        if(!panelRef.current.contains(e.target as Node)) closeUserQuickPanel()
    }

    return (
        <div className="shrink-0">
            <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={UserQuickPanelOpen}
                onClick={toggleUserQuickPanel}
                className={[
                    "group inline-flex items-center gap-2 h-10 px-3 rounded-xl",
                    "bg-white/[0.06] hover:bg-white/[0.08] active:scale-95",
                    "border border-white/10 text-white text-sm font-medium",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  ].join(" ")}
            >
                <LucideUserCircle2 className="text-blue-300/70 text-lg" />
                <span className="hidden sm:inline">{`${t("user_menu-panel.account")}`}</span>
            </button>

            <AnimatePresence>
                {UserQuickPanelOpen && (
                    <motion.div
                        className="fixed inset-0 z-[70]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={handleOverlayDown}
                    >
                        <div className="absolute inset-0 bg-black/55 backdrop-blur" />
                        <motion.aside
                            ref={panelRef}
                            role="dialog"
                            aria-model="true"
                            className="absolute right-3 top-3 bottom-3 w-[320px] max-w-[92vw] rounded-2xl p-[1px]
                                        bg-[linear-gradient(180deg,#1E3A8A_0%,#155E75_100%)] shadow-2xl"
                            initial={{ x: 24, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 24, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 280, damping: 26 }}
                        >
                            <div className="h-full rounded-[inherit] overflow-hidden border border-white/10 bg-zinc-950/90 backdrop-blur">
                                <div className="flex items-center justify-between px-4 h-12 border-b border-white/10">
                                    <span className="text-sm font-semibold text-white/90">{`${t("user_menu-panel.quick_menu")}`}</span>
                                    <button
                                        onClick={closeUserQuickPanel}
                                        aria-label={`${t("user_menu-panel.close")}`}
                                        className="relative rounded p-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                                        ref={firstFocusRef}
                                    >
                                        <span className="block h-0.5 w-5 rotate-45 bg-white origin-center translate-y-[2px]" />
                                        <span className="block h-0.5 w-5 -rotate-45 bg-white origin-center -translate-y-[2px]" />
                                    </button>
                                </div>
                            
                                <div className="p-2">
                                    <ul className="space-y-1">
                                        <li>
                                            <LocaleLink
                                                href="/account"
                                                className="flex items-center gap-2 rounded px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                                                onClick={closeUserQuickPanel}
                                            >
                                                <LuUser /> {`${t("user_menu-panel.mypage")}`}
                                            </LocaleLink>
                                        </li>
                                        <li>                                    
                                            <LocaleLink
                                                href="/settings"
                                                className="flex items-center gap-2 rounded px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                                                onClick={closeUserQuickPanel}
                                            >
                                                <LuSettings /> {`${t("user_menu-panel.setting")}`}
                                            </LocaleLink>
                                        </li>
                                        <li className="border-t border-white/10 my-2" />
                                        <li className="px-2">
                                            <GuestLogoutButton redirectToLanding />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 