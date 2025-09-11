"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoginGuestOptions, loginGuest } from "@/services/auth/guest/login.service"
import { parseAxiosError } from "@/lib/error/axios/parseAxiosError"

const SESSION_KEY = [["me"], ["session"]] as const

export default function useGuestLogin() {
    const queryClient = useQueryClient()

    const invalidateSession = () => {
        for (const key of SESSION_KEY) queryClient.invalidateQueries({ queryKey: key })
    }

    const mutation = useMutation({
        mutationFn: (opts?: LoginGuestOptions) => loginGuest(opts),
        onSuccess: () => {
            invalidateSession()
        },
        onError: (err) => {
            // console.error(`[loginGuest() failed]: ${parseAxiosError(err)}`)
        },
        retry: 1 // 재시도 횟 수
    })

    return {
        guestLogin: mutation.mutateAsync,
        pending: mutation.isPending,
        error: mutation.error ? parseAxiosError(mutation.error, `Guest login failed`) : null,
        reset: mutation.reset,
        _mutation: mutation,
    }
}