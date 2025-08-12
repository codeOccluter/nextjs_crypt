// app/api/auth/guest/route.ts
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { ClientSQL } from "@/lib/db/client-db"
import { GuestUser } from "@/types/entities/GuestUser"

export const dynamic = "force-dynamic"

const MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24시간

async function ensureClientDB() {
    if(!ClientSQL.isInitialized) await ClientSQL.initialize()
}

export async function POST(_req: NextRequest) {
    await ensureClientDB()

    const repo = ClientSQL.getRepository(GuestUser)
    const now = new Date()
    const expires = new Date(now.getTime() + MAX_AGE_MS)

    const created = repo.create({ role: 0, expires_at: expires })
    const saved = await repo.save(created)

    cookies().set({
        name: "guest_id",
        value: saved.id,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: MAX_AGE_MS / 1000,
    })

    return Response.json(
        {
            id: saved.id,
            expires_at: expires,
        },
        {
            status: 201        
        }
    )
}

export async function DELETE() {
    await ensureClientDB()
    // 만료된 게스트 일괄 삭제
    
    const repo = ClientSQL.getRepository(GuestUser)

    const c = cookies()
    const guestId = c.get("guest_id")?.value
    if(guestId) {
        const row = await repo.findOne({ where: { id: guestId } })
        if(row) await repo.remove(row)
    }
    c.set("guest_id", "", { path: "/", httpOnly: true, maxAge: 0 })

    return new Response(null, { status: 204 })
}