"use client"

import "@/styles/components/layout/header.css"
import LocaleLink from "../common/i18n/LocaleLink"
import Dropdown from "../common/Dropdown"
import useSessionQuery from "../../../hooks/auth/useSessionQuery"
import { toGuestNickname } from "@/features/auth/guest/guest.formatter"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { BsGlobe2 } from "react-icons/bs"
import { buildLocaleUrl, toggleLocale } from "@/lib/i18n/locale"
import type { Locale } from "@/lib/i18n/config"
import UserQuickPanel from "../menu-panel/UserQuickPanel"
import { useTranslation } from "@/lib/i18n/i18n-client"

function LanguageSwitcherButton() {
        
    const router = useRouter()
    const params = useParams() as { locale: string }
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const current = (params?.locale ?? "ko") as Locale
    const next = toggleLocale(current)
    const label = current === "en" ? "KOR" : "ENG"

    const handleClick = () => {
        
        const nextUrl = buildLocaleUrl(pathname ?? "/", searchParams, next)
        router.replace(nextUrl)
    }

    return (
        <button
            onClick={handleClick}
            className="
                    inline-flex items-center gap-2 h-9 px-3 rounded-lg
                    bg-white/10 hover:bg-white/15 active:scale-95
                    border border-white/15 text-white text-sm font-medium
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={`Switch language to ${next}`}
        >
            <BsGlobe2 className="text-blue-300" />
            <span className="hidden sm:inline-block">{label}</span>
            <span className="sm:hidden">{current.toUpperCase()}</span>
        </button>
    )
}

export default function Header() {

    const { status, query } = useSessionQuery()
    const [open, setOpen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const params = useParams() as { locale: string }
    const { t } = useTranslation()
    const localePrefix = `/${params?.locale ?? "ko"}`

    const navLinks = [
        { href: "/main", label: t("header.home") },
        { href: "/main/introduce", label: t("header.introduce") },
        { href: "/docs", label: t("header.document") },
    ]

    const algoLinks = [
        { href: "/main/graph/new", label: t("header.link.graph") },
        { href: "/encrypt/aes", label: t("header.link.ex1") },
        { href: "/encrypt/rsa", label: t("header.link.ex2") }
    ]

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

    const Greeting = () => {

        const { t } = useTranslation()

        if(status === "loading") return null
        // if(status !== "guest" && status !== "authenticated")  return null

        let nickname: string | undefined = ""
        if(status === "guest") {
            nickname = toGuestNickname(query.data?.user.guestId, query.data?.user.guestIdx)
        }

        const text = `${nickname}${t("header.welcome")}`

        return (
            <div className="relative group min-w-0">
                <span
                    className="ml-4 hidden sm:inline-block text-sm text-white/85 max-w-[16rem] truncate align-middle"
                    aria-label={text}
                >{text}</span>
                <div
                    className="pointer-events-none absolute left-0 top-full mt-1 hidden whitespace-nowrap
                                rounded bg-black/90 px-2 py-1 text-xs text-white/90 shadow-lg
                                group-hover:block group-focus-within:block"
                    role="status"
                >{text}</div>
            </div>
        )
    }

    return (
        <header className="bg-black text-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-6 xl:px-12">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl md:text-2xl font-bold">
                        {`${t("header.logo")}`}
                    </h1>

                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <LocaleLink
                                        href={link.href}
                                        className="nav-link"
                                    >{link.label}</LocaleLink>
                                </li>                        
                            ))}
                            <li className="relative">
                                <Dropdown label={`${t("header.insert_data")}`} items={algoLinks} /> 
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="ml-auto flex items-center gap-3 md:gap-6 min-w-0">
                    <div className="shrink-0">
                        <LanguageSwitcherButton />
                    </div>
                    <div className="hidden md:block h-6 w-px bg-white/20 shrink-0" />
                    <div className="min-w-0">
                        <div className="hidden md:block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            <Greeting />
                        </div>
                    </div>
                    <div className="shrink-0">
                        <UserQuickPanel />
                    </div>
                    
                    <button
                        className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded md:hidden hover:bg-white/10"
                        aria-label="메뉴 열기"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <div className="space-y-1.5">
                            <span className="block h-0.5 w-6 bg-white"></span>
                            <span className="block h-0.5 w-6 bg-white"></span>
                            <span className="block h-0.5 w-6 bg-white"></span>
                        </div>
                    </button>
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
                                onClick={() => setOpen(false)}
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
                                            onClick={() => setOpen(false)}
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
                                            onClick={() => setOpen(false)}
                                        >
                                            {a.label}
                                        </LocaleLink>
                                        </li>
                                    ))}
                                    </ul>
                                </li>

                                <li className="mt-3 border-t border-white/10 pt-3">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-full rounded border border-white/20 px-3 py-2 text-left text-sm hover:bg-white/10"
                                    >닫기</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>

            </div>
        </header>
    )
}