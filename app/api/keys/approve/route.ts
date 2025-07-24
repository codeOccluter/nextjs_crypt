import { NextResponse } from "next/server"
import { writeFile, readFile } from "fs/promises"
import path from "path"
import { cookies } from "next/headers"

export async function POST(req: Request) {

    const isAdmin = (await cookies()).get("admin-auth")?.value === "true"
    if(!isAdmin) {
        return NextResponse.json({ success: false, message: "관리자만 접근이 가능합니다." })
    }

    const { username } = await req.json()
    const filePath = path.join(process.cwd(), "registered-keys", `${username}.json`)
    const content = await readFile(filePath, "utf-8")
    const data = JSON.parse(content)

    data.status = "approved"

    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")

    return NextResponse.json({ success: true })
}