import { NextRequest } from "next/server"
import { ClientSQL } from "@/lib/db/client-db"
import { GuestUser } from "@/types/entities/GuestUser"

async function ensureClientDB() {
    if(!ClientSQL.isInitialized) await ClientSQL.initialize()
}

export async function GET() {
    await ensureClientDB()

    const repo = ClientSQL.getRepository(GuestUser)
    const rows = await repo.find({ order: { created_at: "DESC" } as any })
    
    return Response.json(rows, { status: 200 })
}

export async function DELETE(_req: NextRequest) {

    // 만료된 게스트 일괄 삭제
    await ensureClientDB()

    const repo = ClientSQL.getRepository(GuestUser)
    const now = new Date()
    const all = await repo.find()
    const expired = all.filter((g) => new Date(g.expires_at) <= now)

    if(expired.length) await repo.remove(expired)

    return Response.json({ removed: expired.length }, { status: 200 })
}