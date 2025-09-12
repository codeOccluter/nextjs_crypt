import type { ChartApiResponse, ChartDefinition, ChartType } from "./chart.constant"

export function normalizeType(label: ChartType): ChartDefinition["type"] {

    const m = label

    return (m === "doughtnut" ? "donut" : m) as ChartDefinition["type"]
}

export function chartUUID() {
    if(typeof crypto !== "undefined" && (crypto as any).randomUUID) {
        return (crypto as any).randomUUID() as string
    }

    return `id_ ${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}
