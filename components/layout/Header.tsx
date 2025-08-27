"use client"

import "@/styles/components/layout/header.css"
import Link from "next/link"
import Dropdown from "../common/Dropdown"
import GuestLogoutButton from "../mainpage/auth/GuestLogoutButton"
import useSessionQuery from "../../hooks/auth/useSessionQuery"
import { toGuestNickname } from "@/lib/common/user/function.user"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

export default function Header() {

    const { status, query } = useSessionQuery()
    const [open, setOpen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "Introduce" },
        { href: "/docs", label: "Document" },
    ]

    const algoLinks = [
        { href: "/encrypt/des", label: "DES" },
        { href: "/encrypt/aes", label: "AES" },
        { href: "/encrypt/rsa", label: "RSA" }
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
        if(status === "loading") return null
        // if(status !== "guest" && status !== "authenticated")  return null

        let nickname: string | undefined = ""
        if(status === "guest") {
            nickname = toGuestNickname(query.data?.user.guestId, query.data?.user.guestIdx)
        }

        const text = `${nickname}님 안녕하세요!`

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
                    <h1 className="text-xl md:text-2xl font-bold">ABOUT SQL</h1>

                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="nav-link"
                                    >{link.label}</Link>
                                </li>                        
                            ))}
                            <li className="relative">
                                <Dropdown label="Algorithm" items={algoLinks} /> 
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="ml-auto flex items-center gap-3 md:gap-6 min-w-0">
                    <div className="min-w-0">
                        <div className="hidden md:block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            <Greeting />
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <GuestLogoutButton redirectToLanding />
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
                                        <Link
                                            href={l.href}
                                            className="block rounded px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                                            onClick={() => setOpen(false)}
                                        >{l.label}</Link>
                                    </li>
                                ))}

                                <li className="mt-2 border-t border-white/10 pt-2">
                                    <div className="px-3 pb-1 text-[13px] uppercase tracking-wider text-zinc-400">
                                        Algorithm
                                    </div>
                                    <ul className="space-y-1">
                                    {algoLinks.map((a) => (
                                        <li key={a.href}>
                                        <Link
                                            href={a.href}
                                            className="block rounded px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                                            onClick={() => setOpen(false)}
                                        >
                                            {a.label}
                                        </Link>
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