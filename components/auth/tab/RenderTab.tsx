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
        return (
            <GuestForm 
                onGuestSubmit={async (opts) => { await onGuestLogin?.(opts) }}
                onValidChange={(ok) => onGuestValidChange?.(ok)}
            />
        )
    }

