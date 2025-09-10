export type ChartType = "Bar" | "Pie" | "Doughnut" | "Histogram" | "Line" | string
export type Kind = "dataset" | "api" | "inline"

export type ChartFieldMap = {
    x?: string 
    y?: string
    category?: string
}

export type ChartOptions = {
    title?: string
    legend?: boolean
    bins?: number
    donutInner?: number
}

export type ChartDefinition = {
    id: string
    slug: string
    type: ChartType
    fieldMap: ChartFieldMap
    options: ChartOptions
    dataSource: {
        kind: Kind
        datasetId?: string
        apiUrl?: string
        inlineData?: any[]
    }
}

export type ChartApiResponse = {
    def: ChartDefinition
    data: any[]
}