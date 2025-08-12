"use client"

import { useState } from "react"
import axiosClient from "@/lib/axios/axiosClient"

export default function useEnterAsGuest() {

    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const enter = async () => {
        
        console.log(`baseURL`, (axiosClient as any).defaults.baseURL)
        setPending(true)
        setError(null)

        try{
            await axiosClient.post(`/api/auth/guest`) // httpOnly guest_id 쿠키 세팅
        }catch(err: any) {
            setError(err?.message || "Guest enter failed")
            throw err
        }finally {
            setPending(false)
        }
    }

    const leave = async () => {
        
        setPending(true)
        setError(null)

        try{
            await axiosClient.delete(`/api/auth/guest`) // 쿠키 제거
        }catch(err: any) {
            setError(err?.message || "Guest leave failed")
            throw err
        }finally {
            setPending(false)
        }
    }

    return { enter, leave, pending, error }
}