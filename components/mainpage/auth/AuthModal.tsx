"use client"

import { useState } from "react"
import LoginModal from "@/components/mainpage/auth/LoginModal"
import LoginForm from "./Form/LoginForm"
import RegisterForm from "./Form/RegisterForm"
import GuestPanel from "./Form/GuestPanel"

type Props = {
    open: boolean
    onLogin?: (v: { 
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
     onGuest?: () => Promise<void> | void
}

const tabs = [
    { key: "login", label: "로그인" },
    { key: "register", label: "회원가입" },
    { key: "guest", label: "게스트" }
] as const
type TabKey = typeof tabs[number]["key"]

export default function AuthModal({ open, onLogin, onRegister, onGuest }: Props) {

    const [tab, setTab] = useState<TabKey>("login")
    const [validLogin, setValidLogin] = useState(false)
    const [validRegister, setValidRegister] = useState(false)
    const [validGuest, setValidGuest] = useState(true)
    const [pending, setPending] = useState(false)

    const primaryLabel = tab === "login" ? "로그인" : tab === "register" ? "가입하기" : "게스트로 시작"

    const primaryDisabled = 
        pending ||
        (tab === "login" && !validLogin) ||
        (tab === "register" && !validRegister) ||
        (tab == "guest" && !validGuest)

    const handlePrimary = async () => {
        setPending(true)

        try{
            const formId = tab === "login" ? "login-form" : tab === "register" ? "register-form" : "guest-form";
            (document.getElementById(formId) as HTMLFormElement | null)?.requestSubmit()
        }finally{
            setPending(false)
        }
    }

    return (
        <LoginModal 
            open={open} 
            title="이메일로 시작하기"
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
                    onSubmit={async (v) => { await onLogin?.(v) }}
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
                    onEnter={async () => { await onGuest?.() }}
                    onValidChange={setValidGuest}
                />
            )}
        </LoginModal>
    )
}