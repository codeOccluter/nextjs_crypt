// app/api/auth/guest/route.ts
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/lib/db/client-db"
import { Entities } from "@/lib/orm/entities"

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24시간

// async function ensureClientDB() {
//     console.log("isInitialized:", ClientSQL.isInitialized)
//     if(!ClientSQL.isInitialized) await ClientSQL.initialize()

//     console.log("hasMetadata(GuestUser): ", ClientSQL.hasMetadata(Entities.GuestUser))
// }

export async function POST(_req: NextRequest) {
    await ensureClientDBReady()
    const repo = ClientSQL.getRepository(Entities.GuestUser)

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
    await ensureClientDBReady()
    // 만료된 게스트 일괄 삭제
    
    const cookieStore = cookies()
    const token = cookieStore.get("guest_id")?.value
    if(token) {
        try {
            const repo = ClientSQL.getRepository(Entities.GuestUser)
            await repo
                .createQueryBuilder()
                .delete()
                .from(Entities.GuestUser)
                .where("id = :id", { id: token, token })
                .execute()
        }catch{

        }
    }

    cookieStore.delete("guest_id")
    const res = new NextResponse(null, { status: 204 })

    res.cookies.set({
        name: "guest_id",
        value: "",
        maxAge: 0,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true
    })

    return res
}