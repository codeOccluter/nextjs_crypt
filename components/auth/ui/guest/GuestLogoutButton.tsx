"use client"

import { LogOut, Loader2 } from "lucide-react"
import FullscreenLoader from "@/components/ui/common/FullscreenLoader"
import useSessionQuery from "../../../../hooks/auth/useSessionQuery"
import useGuestLogout from "@/hooks/auth/useGuestLogout"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import ConfirmModal from "@/components/ui/common/ConfirmModal"
import { useTranslation } from "@/lib/i18n/i18n-client"

export default function GuestLogoutButton({
    redirectToLanding = false
}: { redirectToLanding?: boolean }) {

    const { status, refresh } = useSessionQuery()
    const { guestLogout, pending, guestLogoutError } = useGuestLogout()

    const router = useRouter()
    const pathname = usePathname()
    
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [processing, setProcessing] = useState(false)
    const { t } = useTranslation()

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
                text={`${t("guest_logout.is_loading")}`}
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
                aria-label={`${t("guest_logout.guest_logout")}`}
            >
                <LogOut size={16} className="text-zinc-700 translate-y-[0.5px]" />
                <span className="leading-8">{`${t("guest_logout.logout")}`}</span>
            </button>

            <ConfirmModal
                open={confirmOpen}
                title={`${t("guest_logout.guest_logout")}`}
                description={
                    processing ? (
                        <span className="inline-flex items-center gap-2">                
                            <span>{`${t("guest_logout.is_loading_confirm")}`}</span>
                        </span>
                    ) :
                    t("guest_logout.logout_confirm")
                }
                confirmText={processing ? `${t("guest_logout.processing")}` : `${t("guest_logout.yes")}`}
                cancelText={processing ? `${t("guest_logout.no_cancel")}` : `${t("guest_logout.no")}`}
                confirmDisabled={processing}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    )
}