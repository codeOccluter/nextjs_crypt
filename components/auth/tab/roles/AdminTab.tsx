"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"

export default function AdminForm() {

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">관리자 로그인</h3>
            <p className="text-white/70 text-sm">승인된 관리자만 접근 가능합니다</p>
            </div>
            <div className="w-full max-w-sm">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
                <div className="text-yellow-400 text-sm font-medium mb-2">준비 중</div>
                <div className="text-white/60 text-xs">관리자 로그인 기능은 추후 구현될 예정입니다</div>
            </div>
            </div>
        </div>
    )
}