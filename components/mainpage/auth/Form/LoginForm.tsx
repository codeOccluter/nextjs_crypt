"use client"

import { useState, useEffect, useMemo } from "react"
import Input from "@/components/common/Input"

type LoginFormProps = {
    onSubmit: (v: {
        email:string 
        password: string 
    }) => void | Promise<void>
    onValidChange?: (valid: boolean) => void
}

export default function LoginForm({ 
    onSubmit,
    onValidChange
}: LoginFormProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const valid = useMemo(() => email.trim() !== "" && password.trim() !== "", [email, password])

    useEffect(() => {
        onValidChange?.(valid)
    }, [valid, onValidChange])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!valid) return
        onSubmit({ email, password })
    }

    return (
        <form
            id="login-form"
            onSubmit={handleSubmit}
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
        </form>
    )
}