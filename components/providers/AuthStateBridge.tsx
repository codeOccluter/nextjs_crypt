// "use client"

// import { useEffect } from "react"
// import { useSession } from "next-auth/react"
// import useSessionQuery from "@/hooks/auth/useSessionQuery"
// import { useAuthStore } from "@/stores/auth/auth.store"

// export default function AuthStateBridge() {
//     const { data: nextAuthSession, status: nextAuthStatus } = useSession()
//     const { status: guestStatus, user: guestUser } = useSessionQuery()
//     const setAuthState = useAuthStore((s) => s.setAuthState)

//     useEffect(() => {
        
//         if(nextAuthStatus === "authenticated" && nextAuthSession?.user) {
//             setAuthState({
//                 status: "authenticated",
//                 user: {
//                     name: nextAuthSession.user.name ?? undefined,
//                     email: (nextAuthSession.user as any).email,
//                     image: nextAuthSession.user.image ?? undefined,
//                     role: (nextAuthSession.user as any).role,
//                     provider: (nextAuthSession.user as any).provider ?? "google",
//                 },
//             })
//             return
//         }

//         if(guestStatus === "guest") {
//             const g = (guestUser as any)?.user
//             setAuthState({
//                 status: "guest",
//                 user: {
//                     guestId: g?.guestId,
//                     nickname: g?.nickname,
//                     guestIdx: g?.guestIdx,
//                     role: 0,
//                 },
//             })
//             return
//         }

//         if(nextAuthStatus === "loading" || guestStatus === "loading") {
//             setAuthState({ status: "loading", user: null })
//             return
//         }

//         setAuthState({ status: "unauthenticated", user: null })
//     }, [nextAuthStatus, nextAuthSession, guestStatus, guestUser, setAuthState])

//     return null
// }


