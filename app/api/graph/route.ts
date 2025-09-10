import { NextRequest, NextResponse } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    await ensureClientDBReady()

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get("page") || 1)
    const limit = Math.min(Number(searchParams.get("limit") || 20 ), 100)
    const skip = (page - 1) * limit

    const GraphRepository = ClientSQL.getRepository(Entities.Graph)

    const [rows, total] = await GraphRepository.findAndCount({
        where: { is_active: 1 },
        order: { order_priority: "ASC", title: "ASC" },
        skip,
        take: limit
    })

    const hasMore = page * limit < total

    return NextResponse.json(
        {
            data: rows,
            page,
            limit,
            total,
            hasMore,
            nextPage: hasMore ? page + 1 : null
        },
        { status: 200 },
    )
}