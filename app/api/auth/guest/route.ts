// app/api/auth/guest/route.ts
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"
import { createGuest } from "@/services/auth/guest/login.service"

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Guest 로그인 시 ID 생성 및 저장
export async function POST(req: NextRequest) {

    const body = await req.json().catch(() => ({}))
    console.log(body)
    const { nickname, ttlMs } = body ?? {}
    const guest = await createGuest({ nickname, ttlMs })

    const response = NextResponse.json(
        { id: guest.id, name: guest.nickname, role: 0 as const },
        { status: 201 }
    )

    response.cookies.set({
        name: "guest_id",
        value: guest.id,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: Math.floor((ttlMs ?? 24 * 60 * 60 * 1000) / 1000)
    })

    return response
}

// Guest 로그아웃 시 ID 삭제
export async function DELETE() {
    await ensureClientDBReady()
    
    const guestId = cookies().get("guest_id")?.value
    if(guestId) {
        const repo = ClientSQL.getRepository(Entities.GuestUser)
        await repo.delete(guestId).catch((err) => { console.log(`[Guest Delete Error]: ${err}`) })
    }

    const response = new NextResponse(null, { status: 204 })
    response.cookies.set({
        name: "guest_id",
        value: "",
        maxAge: 0,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true
    })

    return response
}