import { NextResponse } from "next/server"
import { unlink } from "fs/promises"
import path from "path"
import { cookies } from "next/headers"

export async function POST(req: Request) {

    const isAdmin = (await cookies()).get("admin-auth")?.value === "true"
    if(!isAdmin) return NextResponse.json({ success: false, message: "권한 없음" }, { status: 403 })

    const { username } = await req.json()
    const filePath = path.join(process.cwd(), "resgistered-keys", `${username}.json`)

    try{
        await unlink(filePath)
        return NextResponse.json({ success: true })
    }catch(error) {
        return NextResponse.json({ success: false, message: "삭제 실패" }, { status: 500 })
    }
}