import { NextResponse } from "next/server"
import { readGraph, writeGraph, deleteGraph } from "@/server/utils/graph/fs-store"
import type { ChartApiResponse } from "@/features/graph/Chart/chart.constant"

export async function GET(_req: Request, { params }: { params: { slug: string } }) {

    const found = await readGraph(params.slug)
    console.log(JSON.stringify(params))
    if(!found) {
        return NextResponse.json({ error: `Not found` }, { status: 404 })
    }

    return NextResponse.json(found)
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
    try{
        const body = (await req.json()) as ChartApiResponse

        if(!body?.def) {
            return NextResponse.json({ error: `def is required` }, { status: 400 })
        }

        body.def.slug = params.slug
        await writeGraph(params.slug, body)
        
        return NextResponse.json({ ok: true })
    }catch(err: any) {
        return NextResponse.json({ ok: false, error: err?.message ?? `Unknown error` }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    
    try{
        const body = (await req.json()) as ChartApiResponse

        if(!body?.def) {
            return NextResponse.json({ error: `def is required` }, { status: 400 })
        }

        body.def.slug = params.slug
        await writeGraph(params.slug, body)
        
        return NextResponse.json({ ok: true })
    }catch(err: any) {
        return NextResponse.json({ ok: false, error: err?.message ?? `Unknown error` }, { status: 500 })
    }
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
    await deleteGraph(params.slug)
    return NextResponse.json({ ok: true })
}