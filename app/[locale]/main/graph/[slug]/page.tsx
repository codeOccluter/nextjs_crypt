import ChartClient from "./ChartClient"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function GraphPage({ params }: 
    { params: {
        slug: string
    } 
}) {
    return (
        <div className="mx-auto max-w-4xl py-6">
            <ChartClient 
                slug={params.slug}
            />
        </div>
    )
}