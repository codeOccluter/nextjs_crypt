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
        </div>
    )
}