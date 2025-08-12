"use client"

import { useState } from "react"
import Input from "@/components/common/Input"

export default function LoginForm({ 
    onSubmit 
}: { onSubmit: (v: { email: string, password: string }) => void }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
    
        onSubmit({ email, password })
    }

    return (
        <form
            onSubmit={(e) => handleSubmit}
            className="space-y-4"
        >
            <Input 
                label="이메일"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="email@example.com"
            />
            <Input 
                label="비밀번호"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="***********"
            />
            <button
                type="submit"
                className=" mt-2 inline-flex h-10 w-full
                            justify-center rounded-lg bg-sky-500
                            px-4 font-semibold text-white shadow-lg
                            hover:bg-sky-600 active:scale-95 transition"
            >로그인</button>
        </form>
    )
}