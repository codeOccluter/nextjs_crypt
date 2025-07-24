import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(req: Request) {

    const { username, publicKey } = await req.json()

    if(!username || !publicKey) {
        return NextResponse.json({ success: false, message: "입력값 누락" }, { status: 400 })
    }

    try {
        const dir = path.join(process.cwd(), "registered-keys")
        await mkdir(dir, { recursive: true })

        const filePath = path.join(dir, `${username}.json`)
        const payload = {
            username,
            publicKey,
            status: "pending",
            createdAt: new Date().toISOString()
        }

        await writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8")

        return NextResponse.json({ success: true })
    }catch(error) {
        return NextResponse.json({ success: false, message: "저장 실패" }, { status: 500 })
    }
}