import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// 세션 조회
// 회원 세션 또는 게스트 쿠키가 있으면 200, 없으면 401 반환
// 현재 게스트 처리만 구현
export async function GET() {
    await ensureClientDBReady()

    const guestId = cookies().get("guest_id")?.value
    if(!guestId) {
        return NextResponse.json({ status: "unauthenticated" }, { status: 401 })
    }

    const repo = ClientSQL.getRepository(Entities.GuestUser)
    const guest = await repo.findOne({ where: { id: guestId } })

    if(!guestId || !guest || new Date(guest.expires_at) <= new Date()) {

        const response = NextResponse.json({ status: "unauthenticated" }, { status: 401 })
        response.cookies.set({ name: "guest_id", value: "", path: "/", maxAge: 0 })
        response.headers.set("Cache-Control", "no-store")

        return response
    }

    const response = NextResponse.json(
        { id: guest.id, name: guest.nickname, role: 0 as const },
        { status: 200 }
    )
    response.headers.set("Cache-Control", "no-store")

    return response
}