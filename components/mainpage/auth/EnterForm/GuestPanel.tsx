"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import { useEffect, useState, useMemo } from "react"

type GuestPanelProps = {
    onGuestSubmit: (opts?: { 
        nickname?: string 
        ttlMs?: number 
    }) => void | Promise<void>
    onValidChange?: (valid: boolean) => void
}

export default function GuestPanel({
    onGuestSubmit,
    onValidChange
}: GuestPanelProps) {

    // TODO:
    // 약관 동의 (검증 단계 구현)
    const [agree, setAgree] = useState(false)
    const [nickname, setNickname] = useState("")
    const { t } = useTranslation()

    const valid = useMemo(() => {
        
        const inputNicknameLength = nickname.trim().length
        const nicknameValid = inputNicknameLength === 0 || (inputNicknameLength >=2 && inputNicknameLength <= 8)
        return agree && nicknameValid
    }, [agree, nickname])

    useEffect(() => {
        onValidChange?.(valid)
    }, [valid, onValidChange])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!valid) return

        const nName = nickname.trim()
        const opts = nName ? { nickname: nName } : undefined
        await onGuestSubmit(opts)
    }

    return (
        <form 
            id="guest-form"
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85">
                {`${t("login_modal.guest.guest_notify")}`}
            </div>

            <div className="space-y-1.5">
                <label
                    htmlFor="guest-nickname"
                    className="text-sm text-white/85"
                >{`${t("login_modal.guest.nickname")}`} <span className="text-white/40">{`${t("login_modal.guest.nickname_option")}`}</span></label>
                <input
                    id="guest-nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder={`${t("login_modal.guest.nickname_placeholder")}`}
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2
                               text-white placeholder:text-white/40 outline-none
                               focus:border-sky-400/60 focus:ring-0"
                />
                {nickname.trim().length > 0 && (nickname.trim().length < 2 || nickname.trim().length > 8) && (
                    <p className="text-xs text-rose-400">{`${t("login_modal.guest.nickname_warn")}`}</p>
                )}
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <input 
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-sky-500"
                />
                <span className="text-sm text-white/85">
                    {`${t("login_modal.guest.guest_agree")}`}
                    <br />
                    <span className="text-white/50 text-xs">{`${t("login_modal.guest.guest_session_notify")}`}</span>
                </span>
            </label>
        </form>
    )
}