"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import {
    OAUTH_PROVIDERS
} from "@/features/auth/oauth/oauth.constants"
import GoogleLoginButton from "../../ui/oauth/GoogleLoginButton"
import NaverLoginButton from "../../ui/oauth/NaverLoginButton"
import KakaoLoginButton from "../../ui/oauth/KakaoLoginButton"

export default function LoginTab() {
    const { t } = useTranslation()

    const OAUTH_COMPONENTS = {
        google: GoogleLoginButton,
        naver: NaverLoginButton,
        kakao: KakaoLoginButton,
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{t("login_modal.signin")}</h3>
                <p className="text-white/70 text-sm">OAuth로 간편하게 로그인</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {OAUTH_PROVIDERS.map((provider) => {
                    const Component = OAUTH_COMPONENTS[provider.key]
                    
                    return Component ? <Component key={provider.key} /> : null
                })}
            </div>
        </div>
    )
}