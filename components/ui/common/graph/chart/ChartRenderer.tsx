"use client"

import BarChartView from "./BarChartView"
import type { ChartType } from "@/features/graph/Chart/chart.constant"

interface ChartRendererProps {
    type: ChartType
    data: any
}

export default function ChartRenderer({ type, data }: ChartRendererProps) {

    switch(type) {
        case "Bar":
            return <BarChartView data={data} />
        default:
            return <p>지원하지 않는 차트 타입입니다.</p>
    }
}