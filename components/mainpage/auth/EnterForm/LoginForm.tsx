"use client"

import { useState, useEffect, useMemo } from "react"
import Input from "@/components/ui/common/Input"
import { useTranslation } from "@/lib/i18n/i18n-client"

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
    const { t } = useTranslation()

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
        <div>
            <form
                id="login-form"
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <Input 
                    label={`${t("login_modal.email.email")}`}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder={`${t("login_modal.email.email_placeholder")}`}
                />
                <Input 
                    label={`${t("login_modal.email.pw")}`}
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder={`${t("login_modal.email.pw_placeholder")}`}
                />
            </form>
        </div>
    )
}