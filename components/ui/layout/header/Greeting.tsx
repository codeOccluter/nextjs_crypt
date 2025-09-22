"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import type { AuthStatus, AuthTabKey, OAuthProviderKey, guestStatus, UnifiedUser } from "@/features/auth/oauth/oauth.constants"
import { toGuestNickname } from "@/features/auth/guest/guest.formatter"

export function Greeting({ status, user }: { status: AuthStatus, user?: UnifiedUser | null }) {
    const { t } = useTranslation()
    // console.log(`user: ${JSON.stringify(user)}`)
    if(status === "loading") {
        return null
    }
    
    const text = `${status === "guest" ? toGuestNickname(user?.uniqueName, user?.guestIdx) : user?.name || ""}${t("header.welcome")}`
    
    return (
        <div className="min-w-0">
            <div className="hidden md:block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
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
            </div>
        </div>
    )
}