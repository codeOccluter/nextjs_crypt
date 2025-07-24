import { NextResponse } from "next/server"
import { readdir, readFile } from "fs/promises"
import path from "path"

export async function GET() {

    const dir = path.join(process.cwd(), "registered-keys")

    try {
        const files = await readdir(dir)
        const keys = await Promise.all(
            files.map(async (filename) => {
                const content = await readFile(path.join(dir, filename), "utf-8")

                return {
                    username: filename.replace(".pub", ""),
                    publicKey: content
                }
            })
        )

        return NextResponse.json({ keys })
    }catch(error) {
        return NextResponse.json({ keys: [] }, { status: 500 })
    }
}