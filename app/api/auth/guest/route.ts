// app/api/auth/guest/route.ts
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"
import { createGuest } from "@/server/controllers/auth/guest/login.controller"
import { signAccessToken, signRefreshToken, verifyToken } from "@/services/auth/jwt"

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_BASE = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    path: "/" as const,
    secure: process.env.NODE_ENV === "production",
}

// Guest 로그인 시 ID 생성 및 저장
export async function POST(req: NextRequest) {

    const body = await req.json().catch(() => ({}))
    const { nickname, ttlMs } = body ?? {}
    const guest = await createGuest({ nickname, ttlMs })

    const accessToken = await signAccessToken({ guestId: guest.id, role: guest.role, nickname: guest.nickname, guestIdx: guest.idx })
    const refreshToken = await signRefreshToken({ guestId: guest.id, role: guest.role, nickname: guest.nickname, guestIdx: guest.idx })

    const response = NextResponse.json(
        { 
            id: guest.id, 
            name: guest.nickname, 
            role: 0 as const,
            accessToken,
            accessTokenExpiresIn: 15 * 60,
        },
        { status: 201 }
    )

    response.cookies.set({
        name: "refresh_token",
        value: refreshToken,
        ...COOKIE_BASE,
        maxAge: 7 * 24 * 60 * 60
    })
    response.cookies.set({
        name: "guest_id",
        value: "",
        ...COOKIE_BASE,
        maxAge: 0,
        expires: new Date(0)
    })
    response.headers.set("Cache-Control", "no-store")

    return response
}

// Guest 로그아웃 시 ID 삭제
export async function DELETE() {
    await ensureClientDBReady()

    const response = new NextResponse(null, { status: 204 })

    const refreshToken = cookies().get("refresh_token")?.value
    if(refreshToken) {
        try{
            const payload = await verifyToken<{ sub: string }>(refreshToken)
            const guestId = payload?.sub

            if(guestId) {
                const repo = ClientSQL.getRepository(Entities.GuestUser)
                await repo.delete(guestId).catch((err) => { console.error(`[Guest Delete Error]: ${err}`) })
            }
        }catch(err) {
            console.warn(`[Guest Logout]: invalid refresh token: ${err}`)
        }
    }

    response.cookies.set({
        name: "refresh_token",
        value: "",
        ...COOKIE_BASE,
        maxAge: 0,
        expires: new Date(0)
    })
    response.cookies.set({
        name: "guest_id",
        value: "",
        ...COOKIE_BASE,
        maxAge: 0,
        expires: new Date(0)
    })

    return response
}