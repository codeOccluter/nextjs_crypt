import { NextRequest } from "next/server"

export async function GET(_req: NextRequest) {

    // 예시: 세션 없음
    // return new Response(null, { status: 401 })

    // 예시: 세션 있음 (관리자)
    // return Response.json({ id: "u-123", name: "MOON", role: 2, email: "@" }, { status: 200 })

    return new Response(null, { status: 401 })
}