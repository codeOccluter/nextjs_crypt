import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kihoon1234"

export async function POST(req: Request) {

    const { password } = await req.json()

    if(password === ADMIN_PASSWORD) {
        
        (await cookies()).set("admin-auth", "true", {
            httpOnly: true,
            maxAge: 3600
        })

        return NextResponse.json({ success: true })
    }else {
        return NextResponse.json({ success: false, message: "비밀번호가 틀렸습니다." })
    }
}