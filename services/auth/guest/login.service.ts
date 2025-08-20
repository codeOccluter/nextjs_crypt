import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

type CreateGuestInput = {
    nickname?: string
    ttlMs?: number
}

export async function createGuest({
    nickname,
    ttlMs = 60 * 60 * 1000 * 24
}: CreateGuestInput) {
    await ensureClientDBReady()
    const guestRepo = ClientSQL.getRepository(Entities.GuestUser)

    const tempNickname = nickname ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`
    let guest = guestRepo.create({
        nickname: tempNickname,
        role: 0,
        expires_at: new Date(Date.now() + ttlMs)
    })
    guest = await guestRepo.save(guest)

    if(!nickname) {
        const uuid4 = guest.id.replace(/-/g, "").slice(0, 4).toUpperCase()
        const finalNickname = `Guest_${uuid4}${guest.idx}`

        await guestRepo.update(
            { id: guest.id },
            { nickname: finalNickname }
        )
        guest.nickname = finalNickname
    }

    const guestCookie: ResponseCookie = {
        name: "guest_id",
        value: guest.id,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: Math.floor(ttlMs / 1000),
    }
    cookies().set(guestCookie)

    return guest
}