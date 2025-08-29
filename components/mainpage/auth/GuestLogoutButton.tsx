"use client"

import { LogOut, Loader2 } from "lucide-react"
import FullscreenLoader from "@/components/ui/common/FullscreenLoader"
import useSessionQuery from "../../../hooks/auth/useSessionQuery"
import useGuestLogout from "@/hooks/auth/useGuestLogout"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import ConfirmModal from "@/components/ui/common/ConfirmModal"
import axiosClient from "@/lib/axios/axiosClient"

export default function GuestLogoutButton({
    redirectToLanding = false
}: { redirectToLanding?: boolean }) {

    const { status, refresh } = useSessionQuery()
    const { guestLogout, pending, guestLogoutError } = useGuestLogout()

    const router = useRouter()
    const pathname = usePathname()
    
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [processing, setProcessing] = useState(false)

    if(status !== "guest") return null

    const extractLocale = () => 
        pathname?.match(/^\/(ko|en)(\/|$)/)?.[1] ?? "ko"

    const startLogout = () => {
        setConfirmOpen(true)
    }

    const handleCancel = () => {
        if(processing) return
        setConfirmOpen(false)
    }

    const handleConfirm = async () => {
        setProcessing(true)

        try{
            guestLogout()
            if(redirectToLanding) {
                const locale = extractLocale()
                router.replace(`/${locale}`)
            }
            router.refresh()
            await refresh()
        }catch(err) {
            guestLogoutError()
        }finally {
            setProcessing(false)
            setConfirmOpen(false)
        }
    }

    return (
        <>
            <FullscreenLoader 
                open={processing}
                text="로그아웃 중..."
            />
            <button
                onClick={startLogout}
                className="group inline-flex items-center gap-2
                            h-8 px-3 rounded-md border border-zinc-200/70
                            bg-white/95 text-zinc-900
                            text-[15px] leading-8 font-semibold tracking-tight
                            shadow-lg transition-all
                            hover:border-rose-400 hover:shadow-rose-300 hover:-translate-y-[0.5px]
                            active:translate-y-0
                            flex-shrink-0"                            
                aria-label="Guest Logout"
            >
                <LogOut size={16} className="text-zinc-700 translate-y-[0.5px]" />
                <span className="leading-8">로그아웃</span>
            </button>

            <ConfirmModal
                open={confirmOpen}
                title="게스트 로그아웃"
                description={
                    processing ? (
                        <span className="inline-flex items-center gap-2">                
                            <span>로그아웃 중... 잠시만 기다려주세요.</span>
                        </span>
                    ) :
                    "게스트 로그아웃을 하시겠습니까?"
                }
                confirmText={processing ? "처리 중..." : "예"}
                cancelText={processing ? "취소 불가" : "아니오"}
                confirmDisabled={processing}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    )
}