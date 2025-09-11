import fs from "fs/promises"
import path from "path"
import type { ChartApiResponse, ChartDefinition } from "@/features/graph/Chart/chart.constant"

const ROOT = path.join(process.cwd(), "data", "graph")

async function ensureDir() {
    await fs.mkdir(ROOT, { recursive: true })
}

function filePath(slug: string) {
    return path.join(ROOT, `${slug}.json`)
}

export async function readGraph(slug: string) {
    await ensureDir()
    
    try{
        const text = await fs.readFile(filePath(slug), "utf-8")
        return JSON.parse(text) as ChartApiResponse
    }catch{
        return null
    }
}

export async function writeGraph(slug: string, payload: ChartApiResponse): Promise<void> {
    await ensureDir()
    payload.def.slug = slug

    await fs.writeFile(filePath(slug), JSON.stringify(payload, null, 2), "utf-8")
}

export async function deleteGraph(slug: string): Promise<void> {
    await ensureDir()

    try{
        await fs.unlink(filePath(slug))
    }catch{}
}

export async function listGraphs(): Promise<ChartDefinition[]> {
    await ensureDir()

    const files = await fs.readdir(ROOT)
    const defs: ChartDefinition[] = []

    for(const file of files) {
        if(!file.endsWith(".json")) continue

        const buf = await fs.readFile(path.join(ROOT, file), "utf-8")
        const json = JSON.parse(buf) as ChartApiResponse

        defs.push(json.def)
    }

    return defs
}