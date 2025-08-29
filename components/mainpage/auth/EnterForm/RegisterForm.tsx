"use client"

import { useState } from "react"
import Input from "@/components/ui/common/Input"

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
                label="이름"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
            />
            <Input 
                label="생년월일"
                type="date"
                value={form.birth}
                onChange={(v) => setForm({ ...form, birth: v })}
            />
            <Input 
                label="휴대폰 번호"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="010-1234-5678"
            />
            <Input 
                label="이메일"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
            />
            <Input 
                label="비밀번호"
                type="password"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
            />
            <Input 
                label="주 사용 언어"
                value={form.primaryLang ?? "JavaScript"}
                onChange={(v) => setForm({ ...form, primaryLang: v })}
                placeholder="JavaScript, Java ..."
            />
            <button
                type="submit"
                className=" mt-2 inline-flex h-10 w-full
                            items-center justify-center rounded-lg 
                            bg-emerald-500 px-4 font-semibold text-white shadow-lg 
                            hover:bg-emerald-600 active:scale-95 transition"
            >가입하기</button>
            <p className="text-xs text-white/60">프로필 사진은 가입 후 마이페이지에서 변경할 수 있어요.</p>
        </form>
    )
}