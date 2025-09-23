"use clinet"

import { useTranslation } from "@/lib/i18n/i18n-client"
import { useRouter, useParams, usePathname, useSearchParams } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"
import { toggleLocale, buildLocaleUrl } from "@/lib/i18n/locale"
import { BsGlobe2 } from "react-icons/bs"

export function HeaderLanguageSwitcherButton() {
    const { t } = useTranslation()

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
        <div className="shrink-0">
            <button
                onClick={handleClick}
                className={[
                    "group relative inline-flex h-10 items-center gap-2 rounded-xl p-[1px]",
                    "bg-[linear-gradient(90deg,#1E3A8A_0%,#155E75_100%)]", // 톤 다운 보더
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  ].join(" ")}
            >
                <span
                    className={[
                        "relative inline-flex h-full items-center rounded-[inherit] overflow-hidden",
                        "border border-white/10 bg-white/[0.06] px-3 text-sm font-medium text-white/90",
                        "transition-colors group-hover:bg-white/[0.08]"
                      ].join(" ")}
                >  
                    <span
                        className={[
                        "pointer-events-none absolute inset-0 -translate-x-[160%]",
                        "group-hover:translate-x-[160%] transition-transform duration-700 ease-out",
                        "before:content-[''] before:absolute before:inset-y-0 before:left-0",
                        "before:w-1/3 before:skew-x-12",
                        "before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.06),transparent)]"
                        ].join(" ")}
                    />
                    <BsGlobe2 className="text-blue-300" />
                    <span className="hidden sm:inline-block">{label}</span>
                    <span className="sm:hidden">{current.toUpperCase()}</span>
                </span>
            </button>
        </div>
    )
}