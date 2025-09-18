import type { AuthTabKey, AuthValidities } from "./oauth.constants"

export function getAuthPrimaryDisabled(
    tab: AuthTabKey,
    pending: boolean | undefined,
    validities: AuthValidities
): boolean {
    if(pending) return true

    switch(tab) {
        case "login":
            return !Boolean(validities.login)
        case "guest":
            return !Boolean(validities.guest)
        case "admin":
            return false
        default:
            return true
    }
}

export function getCurrentTabLabel(t: (k: string) => string, tabKey: AuthTabKey): string {

    const map: Record<AuthTabKey, string> = {
        login: "login_modal.tap.login",
        guest: "login_modal.tap.guest",
        admin: "login_modal.tap.admin",
    }
    
    return t(map[tabKey])
}