import { NextRequest } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/lib/db/client-db"
import { Entities } from "@/lib/orm/entities"

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    await ensureClientDBReady()

    const repo = ClientSQL.getRepository(Entities.GuestUser)
    const rows = await repo.find({ order: { created_at: "DESC" as const } })
    
    return Response.json(rows, { status: 200 })
}

export async function DELETE(_req: NextRequest) {
    // 만료된 게스트 일괄 삭제
    await ensureClientDBReady()

    const repo = ClientSQL.getRepository(Entities.GuestUser)

    const result = await repo
        .createQueryBuilder()
        .delete()
        .from(Entities.GuestUser)
        .where("expires_at <= NOW")
        .execute()
    // const now = new Date()
    // const all = await repo.find()
    // const expired = all.filter((g) => new Date(g.expires_at) <= now)
    // console.log(`expired: ${expired}`)
    // if(expired.length) await repo.remove(expired)

    return Response.json({ removed: result.affected ?? 0 }, { status: 200 })
}