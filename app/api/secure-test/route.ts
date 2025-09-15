import { NextResponse } from "next/server"
import { auth } from "@/server/utils/auth/auth"

export async function GET() {
    
    const session = await auth()
    if(!session) {
        return NextResponse.json({ error: "unauthenticated" }, { status: 401 })
    }
    return NextResponse.json({ ok: true, user: session.user })
}