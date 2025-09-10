"use client"

import { useState } from "react"
import Input from "@/components/ui/common/Input"
import { useTranslation } from "@/lib/i18n/i18n-client"

type RegisterPayload = {
    name: string
    birth: string
    phone: string
    email: string
    password: string
    primaryLang?: string
}

export default function RegisterForm({ 
    onSubmit
}: { onSubmit: (v: RegisterPayload) => void }) {

    const [form, setForm] = useState<RegisterPayload>({
        name: "",
        birth: "",
        phone: "",
        email: "",
        password: "",
        primaryLang: ""
    })
    const { t } = useTranslation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        onSubmit(form)
    }
    
    const handleBirthChange = (value: string) => {
        // 숫자 8자리만 허용
        const input = value.replace(/[^0-9]/g, "").slice(0, 8)
        setForm({...form, birth: input})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
                label={`${t("login_modal.signup.name")}`}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
            />
            <Input 
                label={`${t("login_modal.signup.birth")}`}
                type="text"
                value={form.birth}
                onChange={handleBirthChange}
                placeholder={`${t("login_modal.signup.birth_placeholder")}`}
            />
            <Input 
                label={`${t("login_modal.signup.phone")}`}
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder={`${t("login_modal.signup.phone_placeholder")}`}
            />
            <Input 
                label={`${t("login_modal.signup.email")}`}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
            />
            <Input 
                label={`${t("login_modal.signup.pw")}`}
                type="password"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
            />
            <Input 
                label={`${t("login_modal.signup.main_language")}`}
                value={form.primaryLang ?? "JavaScript"}
                onChange={(v) => setForm({ ...form, primaryLang: v })}
                placeholder={`${t("login_modal.signup.ml_placeholder")}`}
            />
            <button
                type="submit"
                className=" mt-2 inline-flex h-10 w-full
                            items-center justify-center rounded-lg 
                            bg-emerald-500 px-4 font-semibold text-white shadow-lg 
                            hover:bg-emerald-600 active:scale-95 transition"
            >{`${t("login_modal.signup.join")}`}</button>
            <p className="text-xs text-white/60">{`${t("login_modal.signup.profile_notify")}`}</p>
        </form>
    )
}