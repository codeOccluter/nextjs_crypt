import { NextResponse } from "next/server"
import { auth } from "@/server/utils/auth/auth"
import { signAccessToken } from "@/services/auth/jwt"

export async function POST() {
    
    const session = await auth()
    if(!session?.user?.email) {
        return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 })
    }

    const accessToken = await signAccessToken(
        { sub: session.user.email, role: 1 },
        "30m",
    )

    return NextResponse.json({ ok: true, accessToken })
}