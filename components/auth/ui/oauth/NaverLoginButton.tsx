"use client"

export default function NaverLoginButton() {
    const handleNaverLogin = () => {
        // TODO: 네이버 로그인 구현
        console.log("Naver login clicked - 준비 중")
    }

    return (
        <button
            onClick={handleNaverLogin}
            disabled
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white/70 border border-white/10 cursor-not-allowed flex items-center justify-center gap-2"
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.273 24H24V0h-7.727v12.845Z"/>
            </svg>
            네이버 로그인 (준비 중)
        </button>
    )
}