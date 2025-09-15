"use client"

import { useState } from "react"
import LoginModal from "@/components/mainpage/auth/LoginModal"
import LoginForm from "./EnterForm/LoginForm"
import RegisterForm from "./EnterForm/RegisterForm"
import GuestPanel from "./EnterForm/GuestPanel"
import { useTranslation } from "@/lib/i18n/i18n-client"

type Props = {
    open: boolean
    pending?: boolean
    onEmailLogin?: (v: { 
        email: string
        password: string
     }) => Promise<void> | void
     onRegister?: (v: {
        name: string
        birth: string
        phone: string
        email: string
        password: string
        primaryLang?: string
    }) => Promise<void> | void
     onGuestLogin?: (opts?: { 
        nickname?: string
        ttlMs?: number
      }) => Promise<void> | void
}

export default function AuthModal({ open, pending, onEmailLogin, onRegister, onGuestLogin }: Props) {

    const [tab, setTab] = useState<TabKey>("login")
    const [validLogin, setValidLogin] = useState(false)
    const [validRegister, setValidRegister] = useState(false)
    const [validGuest, setValidGuest] = useState(true)
    const { t } = useTranslation()

    const tabs = [
        { key: "login", label: t("login_modal.tap.login") },
        { key: "register", label: t("login_modal.tap.signup") },
        { key: "guest", label: t("login_modal.tap.guest") }
    ] as const
    type TabKey = typeof tabs[number]["key"]

    const primaryLabel = tab === "login" ? t("login_modal.tap.login") : tab === "register" ? t("login_modal.tap.signup") : t("login_modal.tap.guest")

    const primaryDisabled = 
        pending ||
        (tab === "login" && !validLogin) ||
        (tab === "register" && !validRegister) ||
        (tab == "guest" && !validGuest)

    const handlePrimary = async () => {

        const formId = tab === "login" ? "login-form" : tab === "register" ? "register-form" : "guest-form";
        (document.getElementById(formId) as HTMLFormElement | null)?.requestSubmit()
    }

    return (
        <LoginModal 
            open={open} 
            title={`${t("login_modal.signin")}`}
            primaryLabel={primaryLabel}
            onPrimary={handlePrimary}
            primaryDisabled={primaryDisabled}
            pending={pending}
        >
            <div className="mb-4 grid grid-cols-3 rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
                {tabs.map((_tab) => (
                    <button
                        key={_tab.key}
                        onClick={() => setTab(_tab.key)}
                        className={`rounded-md py-2 transition ${tab === _tab.key ? "bg-white text-zinc-900 font-semibold" : "text-white/80 hover:bg-white/10"}`}
                    >{_tab.label}</button>
                ))}
            </div>

            {tab === "login" && (
                <LoginForm 
                    onSubmit={async (v) => { await onEmailLogin?.(v) }}
                    onValidChange={setValidLogin}
                />
            )}
            {tab === "register" && (
                <RegisterForm
                    onSubmit={async (v) => { await onRegister?.(v) }}
                    // onValidChange={setValidRegister} - 구현 예정
                />                
            )}
            {tab === "guest" && (
                <GuestPanel 
                    onGuestSubmit={async (opts) => { await onGuestLogin?.(opts) }}
                    onValidChange={setValidGuest}
                />
            )}
        </LoginModal>
    )
}