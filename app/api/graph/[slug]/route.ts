import { NextResponse } from "next/server"
import { ChartApiResponse } from "@/features/graph/Chart/chart.constant"

export async function GET(_: Request, { params }: { params: { slug: string } }) {

    let response: ChartApiResponse

    const def = {
        id: 1,
        slug: params.slug,
        type: "Bar",
        fiedMap: { x: "month", y: "value" },
        options: { title: "월별 매출", legend: true, stacked: false },
        dataSource: { kind: "inline" }
    }

    const data = [
        { month: "Jan", vale: 12 },
        { month: "Feb", vale: 18 },
        { month: "Mar", vale: 7 },
    ]

    return NextResponse.json({ def, data })
}
