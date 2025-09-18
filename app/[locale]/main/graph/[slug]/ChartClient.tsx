"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/lib/axios/axiosClient"
import Link from "next/link"
import type { ChartDefinition } from "@/features/graph/Chart/chart.constant"
import ChartRenderer from "@/components/ui/common/graph/chart/ChartRenderer"
import NotGraph from "@/components/graph/ui/NotGraph"
import DeleteGraphButton from "@/components/graph/ui/DeleteGraphButton"

type ApiResponse = { 
    def: ChartDefinition
    data: any[]
}

export default function ChartClient({ slug }: { slug: string }) {

    const [response, setResponse] = useState<ApiResponse | null>(null)
    const [status, setStatus] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState<string | null>(null)

    useEffect(() => {
        
        let alive = true
        setErr(null)
        setStatus(null)
        setLoading(true)

        axiosClient.get<ApiResponse>(`/api/graph/${slug}`, {
            validateStatus: (status) => status < 500 // 4xx도 정상 응답으로 처리
        })
            .then(result => {
                if(!alive) return

                // 404는 정상 응답으로 처리되므로 여기서 처리
                if(result.status === 404) {
                    setStatus(404)
                    setResponse(null)
                } else {
                    setResponse(result.data)
                    setStatus(result.status)
                }
            })
            .catch(error => {
                if(!alive) return

                setStatus(error?.status ?? null)
                setErr(error?.message)
            })
            .finally(() => alive && setLoading(false))

        return () => { alive = false }
    }, [slug])

    if(loading)
        return <div className="h-64 animate-pulse rounded-lg bg-black/5 dark:bg-white/10" />
    
    if(status === 404) {
        return <NotGraph slug={slug} />
    }

    if(err || !response)
        return <div className="text-red-600">Error: {err}</div>

    return (
        <div className="mx-auto max-w-5xl px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">{response.def.options?.title ?? response.def.slug}</h1>
            <ChartRenderer type={response.def.type} data={response.data} />
            <DeleteGraphButton slug={slug}/>
        </div>
    )
}