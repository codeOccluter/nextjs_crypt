"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { parseAxiosError } from "@/lib/error/axios/parseAxiosError"
import { logoutGuest } from "@/services/auth/guest/logout.service"

const SESSION_KEY = [["me"], ["session"]] as const

export default function useGuestLogout() {
    const queryClient = useQueryClient()

    const resetSessionCache = () => {
        try { queryClient.setQueryData(["session"], null) } catch {}
        for (const key of SESSION_KEY) queryClient.invalidateQueries({ queryKey: key })
        queryClient.removeQueries({ queryKey: ["session"], exact: true })
    }

    const mutation = useMutation({
        mutationFn: () => logoutGuest(),
        onSuccess: () => {
            resetSessionCache()
        },
        onError: (err) => {
            // console.error(`[logoutGuest() failed]: ${parseAxiosError(err)}`)
        },
        retry: 1
    })

    return {
        guestLogout: mutation.mutateAsync,
        pending: mutation.isPending,
        guestLogoutError: mutation.error ? parseAxiosError(mutation.error, `Guest logout failed`) : null,
        reset: mutation.reset,
        _mutation: mutation,
    }
}