import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { verifyToken } from "@/services/auth/jwt"
import { toGuestNickname } from "@/lib/common/user/function.user"

export async function GET() {
  // 1) 토큰 파싱
    const auth = headers().get("authorization") ?? ""
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined

    // 2) 토큰이 있으면 검증, 없으면 payload는 null
    const payload = token
        ? await verifyToken<{ guestId: string; role: number, nickname: string, guestIdx: number }>(token).catch(() => null)
        : null

    // 3) 응답 헤더(캐시 방지 + 프록시 캐시 안전)
    const baseInit: ResponseInit = {
            headers: {
                "Cache-Control": "no-store",
                Vary: "Authorization",
            },
    }

    // 4-A) 토큰이 아예 없으면 → 게스트 허용 (200)
    if (!token) {
        return NextResponse.json(
            { authenticated: false, user: null }, // 혹은 { id:null, role:null, name:"Guest" }
            { ...baseInit, status: 200 }
        )
    }

    // 4-B) 토큰이 있었는데 검증 실패 → 401 (클라가 재로그인 트리거)
    if (!payload) {
        const res = NextResponse.json(
            { status: "unauthenticated" },
            { ...baseInit, status: 200 }
        )
        // 권장: 401에는 WWW-Authenticate 헤더를 달아주면 표준적
        res.headers.set("WWW-Authenticate", 'Bearer error="invalid_token"')
        return res
    }

    // 4-C) 유효한 토큰 → 로그인 상태
    return NextResponse.json(
        {
            user: { 
                guestId: payload.guestId, 
                role: payload.role, 
                nickname: toGuestNickname(payload.guestId, payload.guestIdx), 
                guestIdx: payload.guestIdx 
            },
        },
        { ...baseInit, status: 200 }
    )
}
