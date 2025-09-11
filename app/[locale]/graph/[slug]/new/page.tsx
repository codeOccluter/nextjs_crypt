"use client"

import { useState } from "react"
import axiosClient from "@/lib/axios/axiosClient"
import { useRouter, useParams } from "next/navigation"
import type { ChartApiResponse } from "@/features/graph/Chart/chart.constant"

export default function NewGraphDataPage() {
    
    const [json, setJson] = useState<string>(JSON.stringify({
        def: {
            id: "tmp",
            slug: "my-chart",
            type: "Bar",
            fieldMap: { 
                x: "label", 
                y: "value" 
            },
            options: { 
                title: "샘플 그래프" 
            },
            dataSource: { kind: "inline" }
        },
        data: [
            { label: "A", value: 10 },
            { label: "B", value: 20 }
        ]
    }, null, 2))

    const router = useRouter()
    const { locale, slug } = useParams() as { locale: string; slug: string }

    const handleSave = async () => {
        try{
            const payload = JSON.parse(json) as ChartApiResponse
            payload.def.slug = slug
            console.log(`payload: ${JSON.stringify(payload)}`)
            await axiosClient.post(`/api/graph/${slug}`, payload)

            router.push(`/graph/${slug}`)
            router.refresh()
        }catch(err: any) {
            alert(`저장 실패: ${err?.message}`)
        }
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">데이터 추가</h1>
            <textarea 
                className="w-full h-96 border rounded p-2 font-mono text-sm"
                value={json}
                onChange={(e) => setJson(e.target.value)}
            />
            <div className="mt-3">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >추가</button>
            </div>
        </div>
    )
}