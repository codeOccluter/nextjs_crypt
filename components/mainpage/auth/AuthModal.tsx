"use client"

import { useState } from "react"
import LoginModal from "./LoginModal"

type Props = {
    open: boolean
    onClose: () => void
    onLogin?: (v: { 
        email: string
        password: string
     }) => void
     onRegister?: (v: {
        name: string
        birth: string
        phone: string
        email: string
        password: string
        primaryLang?: string
     }) => void
     onGuest?: () => void
}

const tabs = [
    { key: "login", label: "로그인" },
    { key: "register", label: "회원가입" },
    { key: "guest", label: "게스트" }
] as const
type TabKey = typeof tabs[number]["key"]

export default function AuthModal({ open, onClose, onLogin, onRegister, onGuest }: Props) {

    const [tab, setTab] = useState<TabKey>("login")

    return (
        <LoginModal open={open} onClose={onClose} title="접속하기">
            {/* TODO: Tabs */}
            <div className="mb-4 grid grid-cols-3 rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
                {tabs.map((_tab) => (
                    <button
                        key={_tab.key}
                        onClick={() => setTab(_tab.key)}
                        className={`rounded-md py-2 transition ${tab === _tab.key ? "bg-white text-zinc-900 font-semibold" : "text-white/80 hover:bg-white/10"}`}
                    >{_tab.label}</button>
                ))}
            </div>

            {tab === "login" && <LoginForm onSubmit={(v) => onLogin?.(v)} />}
            {tab === "register" && <RegisterForm onSubmit={(v) => onRegister?.(v)} />}
            {tab === "login" && <GuestPanel onEnter={() => onGuest?.()} />}
        </LoginModal>
    )
}