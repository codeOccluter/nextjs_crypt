"use client"

import { useState, useMemo, useCallback } from "react"
import LoginModal from "./LoginModal"
import { RenderAdminTab, RenderGuestTab, RenderLoginTab } from "../tab/RenderTab"
import { useTranslation } from "@/lib/i18n/i18n-client"
import { 
    AUTH_TABS, 
    type AuthValidities,
    type AuthTabKey, 
    type AuthModalProps 
} from "@/features/auth/oauth/oauth.constants"
import { getAuthPrimaryDisabled, getCurrentTabLabel } from "@/features/auth/oauth/oauth.features"

export default function AuthModal({ open, pending, onGuestLogin }: AuthModalProps) {
    const { t } = useTranslation()

    const [tab, setTab] = useState<AuthTabKey>("login")
    const [validities, setValidities] = useState<AuthValidities>({
        login: true,
        guest: true
    })

    const tabs = useMemo(
        () => 
            AUTH_TABS.map((config: any) => ({
                key: config.key,
                label: t(config.label)
            })),
        [t]
    )

    const primaryLabel = useMemo(() => getCurrentTabLabel(t, tab), [t, tab])
    const primaryDisabled = useMemo(
        () => getAuthPrimaryDisabled(tab, pending, validities),
        [tab, pending, validities]
    )

    const handlePrimary = async () => {
        if(tab === "guest") {
            const formId = "guest-form"
            ;(document.getElementById(formId) as HTMLFormElement | null)?.requestSubmit()
        }
    }

    const handleGuestValidChange = useCallback((ok: boolean) => {
        setValidities((s) => ({ ...s, guest: ok }))
    }, [])

    return (
        <LoginModal 
            open={open} 
            pending={pending}
            title={`${t("login_modal.signin")}`}
            primaryLabel={primaryLabel}
            onPrimary={handlePrimary}
            primaryDisabled={primaryDisabled}
        >
            <div className="mb-4 grid grid-cols-3 rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
                {tabs.map((_tab: any) => (
                    <button
                        key={_tab.key}
                        onClick={() => setTab(_tab.key as AuthTabKey)}
                        className={`rounded-md py-2 transition ${
                            tab === _tab.key ? "bg-white text-zinc-900 font-semibold" : "text-white/80 hover:bg-white/10"
                        }`}
                    >{_tab.label}</button>
                ))}
            </div>

            {tab === "login" && <RenderLoginTab />}
            {tab === "guest" && <RenderGuestTab 
                onGuestLogin={onGuestLogin}
                onGuestValidChange={handleGuestValidChange}
            />}
            {tab === "admin" && <RenderAdminTab />}
        </LoginModal>
    )
}