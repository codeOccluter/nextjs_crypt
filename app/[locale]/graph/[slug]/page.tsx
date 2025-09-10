import ChartClient from "./ChartClient"
import { Metadata } from "next"

export const metadata: Metadata = { title: "Graph" }

export default function GraphPage({ params }: { params: { slug: string, locale: string } }) {

    return <ChartClient 
                slug={params.slug}
            />
}