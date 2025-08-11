"use Client"

import { useState } from "react"
import { cleanupExpiredGuest, issueGuest } from "../guest.service"

export default function useEnterAsGuest() {

    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const enter = async () => {
        setPending(true)
        setError(null)

        try{
            await cleanupExpiredGuest()
            const id = await issueGuest() // 발급

            return id
        }catch(error: any) {
            setError(error?.message || "Guest enter failded")
            throw error
        }finally {
            setPending(false)
        }
    }

    return {
        enter,
        pending,
        error
    }
}