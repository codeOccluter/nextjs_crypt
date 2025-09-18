import { useCallback } from "react"
import GuestForm from "./roles/GuestTab"
import AdminForm from "./roles/AdminTab"
import LoginForm from "./roles/LoginTab"

type RenderGuestTabProps = {
    onGuestLogin?: (opts?: { nickname?: string; ttlMs?: number }) => Promise<void> | void
    onGuestValidChange?: (ok: boolean) => void
}

export const RenderLoginTab =() => {
        return (
            <LoginForm />
        )
    }

export const RenderAdminTab =() => {
        return (
            <AdminForm />
        )
    }

export const RenderGuestTab = ({ onGuestLogin, onGuestValidChange }: RenderGuestTabProps) => {
        const handleGuestSubmit = useCallback(async (opts?: { nickname?: string; ttlMs?: number }) => {
            await onGuestLogin?.(opts)
        }, [onGuestLogin])

        const handleValidChange = useCallback((ok: boolean) => {
            onGuestValidChange?.(ok)
        }, [onGuestValidChange])

        return (
            <GuestForm 
                onGuestSubmit={handleGuestSubmit}
                onValidChange={handleValidChange}
            />
        )
    }

