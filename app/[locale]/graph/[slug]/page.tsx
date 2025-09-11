import { readGraph } from "@/server/utils/graph/fs-store"
import ChartClient from "./ChartClient"
import Link from "next/link"
import DeleteGraphButton from "@/components/graph/DeleteGraphButton"

export default async function GraphPage({ 
    params 
}: { params: { 
    slug: string
} }) {

    const graph = await readGraph(params.slug)
    if(!graph) {
        return (
            <div className="mx-auto max-w-xl py-10 text-center">
                <h1 className="text-xl font-bold mb-4">그래프가 아직 없습니다.</h1>
                <Link
                    href={`/graph/${params.slug}/new`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    데이터 추가하기
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl py-6">
            <h1 className="text-2xl font-bold mb-4">{graph.def.options?.title ?? graph.def.slug}</h1>
                <ChartClient slug={params.slug} />
            
            <div className="mt-4 flex justify-end">
                <DeleteGraphButton slug={params.slug} />
            </div>
        </div>
    )
}