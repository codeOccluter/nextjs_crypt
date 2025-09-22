import { NextResponse } from "next/server"
import { ensureClientDBReady, ClientSQL } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    try {
        await ensureClientDBReady()
        const GraphRepository = ClientSQL.getRepository(Entities.Graph)
        
        const graph = await GraphRepository.findOne({
            where: { slug: params.slug, is_active: 1 }
        })
        
        if (!graph) {
            return NextResponse.json({ error: "Graph not found" }, { status: 404 })
        }
        
        return NextResponse.json({
            slug: graph.slug,
            title: graph.title,
            description: graph.description,
            variant: graph.variant
        })
    } catch (error) {
        console.error("Error fetching graph info:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
