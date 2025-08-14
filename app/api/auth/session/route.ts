import { NextRequest } from "next/server"
import { cookies } from "next/headers"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// 세션 조회
// 회원 세션 또는 게스트 쿠키가 있으면 200, 없으면 401 반환
// 현재 게스트 처리만 구현
export async function GET() {

    // 예시: 세션 없음
    // return new Response(null, { status: 401 })

    // 예시: 세션 있음 (관리자)
    // return Response.json({ id: "u-123", name: "MOON", role: 2, email: "@" }, { status: 200 })

    const guest = cookies().get("guest_id")?.value
    if(guest) {
        return Response.json(
            {
                id: guest,
                name: "Guest",
                role: 0 as const
            },
            {
                status: 200
            }
        )
    }

    return new Response(null, { status: 401 })
}