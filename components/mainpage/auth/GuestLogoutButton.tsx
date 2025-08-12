"use client"

import { LogOut } from "lucide-react"
import useAuthStatus from "./hook/useAuthStatus"
import useEnterAsGuest from "./hook/useEnterAsGuest"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

export default function GuestLogoutButton({
    redirectToLanding = false
}: { redirectToLanding?: boolean }) {

    const { status, refresh } = useAuthStatus()
    const { leave, pending } = useEnterAsGuest()
    const router = useRouter()
    const pathname = usePathname()
    const [hover, setHover] = useState(false)

    // TODO 버튼 정의 및 CSS 작업

    return (
        <div>
            
        </div>
    )
}