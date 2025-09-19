import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao"
import NaverProvider from "next-auth/providers/naver"

export type AuthStatus = "authenticated" | "unauthenticated" | "guest" | "loading"
export type AuthTabKey = "login" | "guest" | "admin"
export type OAuthProviderKey = "google" | "kakao" | "naver"
export type guestStatus = "idle" | "valid" | "invalid" | "checking"

export type UnifiedUser = {
    id?: string | number
    name?: string
    guestId?: string | number
    uniqueName?: string
    email?: string
    image?: string
    role?: number
    guestIdx?: number
    provider?: string
}

export type QueryLike<T> = {
    data: T | undefined
    isLoading: boolean
    refetch: () => Promise<void>
}

export type SessionData = {
    user: UnifiedUser | null
    status: AuthStatus
}

export type AuthValidities = {
    login?: boolean
    guest?: boolean
    admin?: boolean
}

export type AuthSessionUser = {
    user: {
        userId: string
        role: number
        name: string
        image: string
        provider: string
    }
}

export type AuthModalProps = {
    open: boolean
    pending?: boolean
    onGuestLogin?: (opts?: {
        nickname?: string
        ttlMs?: number
    }) => Promise<void> | void
}

export const AUTH_TABS = [
    {
        key: "login",
        label: "login_modal.tap.login",
    },
    {
        key: "guest",
        label: "login_modal.tap.guest",
    },
    {
        key: "admin",
        label: "login.modal.tap.google",
    },
] as const

export const OAUTH_PROVIDERS: {
    key: OAuthProviderKey
    label: string
    enabled: boolean
}[] = [
    {
        key: "google",
        label: "Google",
        enabled: true
    },
    {
        key: "kakao",
        label: "Kakao",
        enabled: true
    },
    {
        key: "naver",
        label: "Naver",
        enabled: false
    }
]

export const ACTIVE_PROVIDERS = ['google', 'kakao', 'naver']
export const SUPPORTED_PROVIDERS = {
    google: {
        provider: GoogleProvider,
        config: {
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        },
    },
    kakao: {
        provider: KakaoProvider,
        config: {
            clientId: process.env.AUTH_KAKAO_ID!,
            clientSecret: process.env.AUTH_KAKAO_SECRET!,
        },
    },
    naver: {
        provider: NaverProvider,
        config: {
            clientId: process.env.AUTH_NAVER_ID!,
            clientSecret: process.env.AUTH_NAVER_SECRET!,
        },
    },
}