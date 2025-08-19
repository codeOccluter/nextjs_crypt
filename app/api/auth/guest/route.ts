// app/api/auth/guest/route.ts
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/lib/db/client-db"
import { Entities } from "@/lib/orm/entities"
import { createGuest } from "@/lib/auth/guest/createGuest"

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Guest 로그인 시 ID 생성 및 저장
export async function POST(_req: NextRequest) {

    const body = await _req.json().catch(() => ({}))
    console.log(body)
    const { nickname, ttlMs } = body ?? {}

    const guest = await createGuest({ nickname, ttlMs })

    return Response.json(guest, { status: 201 })
}

// Guest 로그아웃 시 ID 삭제
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