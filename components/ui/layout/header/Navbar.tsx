"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import LocaleLink from "../../common/i18n/LocaleLink"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { buildMainNavLinks, matchActive } from "@/lib/nav/headerNav"

export function HeaderNavbar() {
    const { t } = useTranslation()
    const pathname = usePathname()

    const navLinks = buildMainNavLinks(t)

    const base =
        "relative inline-flex items-center px-1.5 py-1 text-sm font-medium tracking-tight " +
        "text-white/80 transition-colors hover:text-white " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
    const indicator =
        'after:content-[""] after:absolute after:left-0 after:-bottom-1 ' +
        "after:h-[2px] after:w-0 after:opacity-90 " +
        'after:bg-[linear-gradient(90deg,_#8EE7FF_0%,_#00B3FF_100%)] ' +
        "after:transition-[width,transform] after:duration-300 hover:after:w-full"

    return (
        <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-6">
                {navLinks.map((link) => {
                    const isActive = matchActive(pathname, link.href) 
                    return (
                        <li key={link.href}>
                            <LocaleLink
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={[base, indicator, isActive ? isActive : ""].join(" ")}
                            >{link.label}</LocaleLink>
                        </li>
                    )
                })}
                <li className="relative">
                    <LocaleLink
                        href="/main/graph/new"
                        className={clsx(
                            "group relative inline-flex items-center gap-2 rounded-xl p-[1px]",
                            "bg-[linear-gradient(90deg,#1E40AF_0%,#0E7490_100%)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                        )}
                    >
                        <span className="pointer-events-none absolute -inset-1 rounded-2xl
                                        bg-[linear-gradient(90deg,rgba(30,64,175,.55),transparent_40%,rgba(14,116,144,.55))]
                                        opacity-35 blur-md transition-opacity group-hover:opacity-50" />
                         <span className="relative inline-flex h-10 items-center rounded-[inherit] overflow-hidden
                                        border border-white/10 bg-white/[0.06] px-3
                                        text-sm font-semibold text-white/90 transition-colors group-hover:bg-white/[0.08]">
                            <span
                                className="
                                pointer-events-none absolute inset-0
                                -translate-x-[160%] group-hover:translate-x-[160%]
                                transition-transform duration-700 ease-out
                                before:content-[''] before:absolute before:inset-y-0 before:left-0
                                before:w-1/3 before:skew-x-12
                                before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.06),transparent)]
                                "
                            />
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 -ml-0.5 text-cyan-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 17h18" />
                                <polyline points="5,15 9,10 12,12 16,7 19,9" />
                            </svg>
                            <span className="ml-1">{t("header.link.graph")}</span>
                            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/70 group-hover:scale-110 transition-transform" />
                        </span>          
                    </LocaleLink>
                </li>

            </ul>
        </nav>
    )
}