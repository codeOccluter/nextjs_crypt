"use client"

import { useState, useMemo, useEffect } from "react"
import axiosClient from "@/lib/axios/axiosClient"
import { useRouter, useParams } from "next/navigation"
import type { ChartApiResponse, ChartDefinition, ChartType } from "@/features/graph/Chart/chart.constant"
import { normalizeType, chartUUID } from "@/features/graph/Chart/chart.utils"
import { useGraphActivityNotification } from "@/features/notification/bar/bar.features"

type Row = Record<string, string | number>


export default function NewGraphDataPage() {

    const router = useRouter()
    const { locale, slug } = useParams() as { 
        locale: string 
        slug: string
    }
    const { notifyDataAdded } = useGraphActivityNotification()
    const [tab, setTab] = useState<"form" | "json">("form")
    const [title, setTitle] = useState(`샘플 그래프`)
    const [graphInfo, setGraphInfo] = useState<{title: string; slug: string} | null>(null)
    const [typeLabel, setTypeLabel] = useState<ChartType>("Bar")
    const [xKey, setXKey] = useState("label")
    const [yKey, setYKey] = useState("value")
    const [rows, setRows] = useState<Row[]>([
        { label: "A", value: 10 },
        { label: "B", value: 20 },
    ])

    const updateCell = (ri: number, key: string, value: string) => {
        setRows((prev) => prev.map((row, idx) => (
            (idx === ri ? { ...row, [key]: isFinite(+value) ? Number(value) : value } : row)
        )))
    }
    const addRow = () => setRows((prev) => [...prev, { [xKey]: "", [yKey]: 0 }])
    const removeRow = (ri: number) => setRows((prev) => prev.filter((_, idx) => idx !== ri))

    const formPayload: ChartApiResponse = useMemo(
        () => ({
            def: {
                id: "tmp-preview",
                slug,
                type: normalizeType(typeLabel),
                fieldMap: { x: xKey, y: yKey },
                options: { title },
                dataSource: { kind: "inline" },
            },
            data: rows,
        }),
        [slug, typeLabel, xKey, yKey, title, rows]
    )

    const exampleJson = useMemo(
        () => JSON.stringify({
            def: {
                idf: "tmp or any",
                slug: "will-be-overriden-by-url",
                type: "Bar",
                fieldMap: { x: "label", y: "value" },
                option: { title: "title" },
                dataSource: { kind: "inline" },
            },
            data: [{ label: "A", value: 10 }],
        }, null, 2),
    [])
    const [jsonText, setJosnText] = useState<string>(exampleJson)
    const [saving, setSaving] = useState(false)

    // 그래프 정보 가져오기
    useEffect(() => {
        const fetchGraphInfo = async () => {
            try {
                const response = await axiosClient.get(`/api/graph/${slug}/info`)
                setGraphInfo(response.data)
            } catch (error) {
                console.error("Failed to fetch graph info:", error)
                // 실패 시 slug를 제목으로 사용
                setGraphInfo({ title: slug, slug })
            }
        }
        
        fetchGraphInfo()
    }, [slug])

    const saveFromForm = async () => {
        try {
            setSaving(true)
            
            const payload: ChartApiResponse = {
                ...formPayload,
                def: { ...formPayload.def, slug },
            }
            if(!payload.def.id || payload.def.id === "tmp-priview") {
                payload.def.id = (crypto as any)?.randomUUID?.() ?? "id_" + Date.now()
            }

            await axiosClient.post(`/api/graph/${slug}`, payload)
            
            // 성공 시 알림 트리거 (실제 그래프 제목 사용)
            const graphTitle = graphInfo?.title || slug
            notifyDataAdded(graphTitle)
            
            router.replace(`/main/graph/${slug}`)
            router.refresh()
        }catch(err: any) {
            alert(`저장 실패: ${err?.message} - Unknown Error`)
        }finally {
            setSaving(false)
        }
    }

    const saveFromJson = async () => {
        try {
            setSaving(true)
            let payload = JSON.parse(jsonText) as ChartApiResponse

            const raw = (payload.def?.type ?? "Bar") as any as ChartType
            payload.def.type = normalizeType(
                (typeof raw === "string" ? (raw.charAt(0).toUpperCase() + raw.slice(1)) : "Bar") as ChartType
            )
            payload.def.slug = slug
            if(!payload.def.id || payload.def.id === "tmp-priview") {
                payload.def.id = (crypto as any)?.randomUUID?.() ?? "id_" + Date.now()
            }

            await axiosClient.post(`/api/graph/${slug}`, payload)
            
            // 성공 시 알림 트리거 (실제 그래프 제목 사용)
            const graphTitle = graphInfo?.title || slug
            notifyDataAdded(graphTitle)
            
            router.replace(`/main/graph/${slug}`)
            router.refresh()
        }catch(err: any) {
            alert("JSON이 유효한지 확인해주세요.\n" + (err?.message ?? "unknown error"));
        }finally {
            setSaving(false)
        }
    }


    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">
                {graphInfo ? `${graphInfo.title} - 데이터 추가` : "데이터 추가"}
            </h1>
            
            <div className="mb-4 flex- gap-2">
                <button
                    className={`px-3 py-1.5 rounded border ${tab === "form" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-900"}`}
                    onClick={() => setTab("form")}
                >폼으로 입력</button>
                <button
                    className={`px-3 py-1.5 rounded border ${tab === "json" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-900"}`}
                    onClick={() => setTab("json")}
                >JSON으로 입력</button>
            </div>

            {tab === "form" ? (
                <div className="space-y-6">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1">
                            <span className="text-sm font-medium">제목(Title)</span>
                            <input
                                className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="그래프 제목"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="text-sm font-medium">타입(Type)</span>
                            <select
                                className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                                value={typeLabel}
                                onChange={(e) => setTypeLabel(e.target.value as ChartType)}
                            >
                                <option>Bar</option>
                                <option>Pie</option>
                                <option>Doughnut</option>
                                <option>Line</option>
                                <option>Histogram</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="text-sm font-medium">X 키</span>
                            <input 
                                className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                                value={xKey}
                                onChange={(e) => setXKey(e.target.value)}
                                placeholder="label"
                            />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="text-sm font-medium">Y 키</span>
                            <input 
                                className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                                value={yKey}
                                onChange={(e) => setYKey(e.target.value)}
                                placeholder="label"
                            />
                        </label>
                    </section>
                    
                    <section>
                        <div className="mb-2 flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                데이터(임시 수동 입력) - 엑셀 업로드는 추후 'file/remote' dataSource로 기능 확장 예정
                            </div>
                            <button
                                onClick={addRow}
                                className="px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700"
                            >행 추가</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border text-sm">
                                <thead className="bg-black/5 dark:bg-white/10">
                                    <tr>
                                        <th className="border px-2 py-1 text-left">{xKey}</th>
                                        <th className="border px-2 py-1 text-left">{yKey}</th>
                                        <th className="border px-2 py-1 w-24">삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="border p-1">
                                                <input 
                                                    className="w-full rounded border px-2 py-1 bg-white dark:bg-slate-900"
                                                    value={(row[xKey] as any) ?? ""}
                                                    onChange={(e) => updateCell(idx, xKey, e.target.value)}
                                                />
                                            </td>               
                                            <td className="border p-1">
                                                <input 
                                                    className="w-full rouned border px-2 py-1 bg-white dark:bg-slate-900"
                                                    value={(row[yKey] as any) ?? ""}
                                                    onChange={(e) => updateCell(idx, yKey, e.target.value)}
                                                />
                                            </td>                     
                                            <td className="border p-1 text-center">
                                                <button
                                                    onClick={() => removeRow(idx)}
                                                    className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                                >삭제</button>
                                            </td>                                            
                                        </tr>
                                    ))}
                                    {rows.length === 0 && (
                                        <tr>
                                            <td className="border p-2 text-center text-gray-500" colSpan={3}>
                                                행이 없습니다. "행 추가를 눌러주세요."
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={saveFromForm}
                            disabled={saving}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                        >{saving ? "저장 중..." : "저장"}</button>
                    </div>

                    <details className="mt-4">
                        <summary className="cursor-point text-sm text-gray-600 dark:text-gray-300">
                            JSON 미리보기
                        </summary>
                        <pre
                            suppressHydrationWarning 
                            className="mt-2 whitespace-pre-wrap rounded border p-3 bg-black/5 dark:bg-white/5 text-xs"
                        >
                            {JSON.stringify(formPayload, null, 2)}
                        </pre>
                    </details>
                </div>
            ) : (
                // JSON 탭
                <div className="space-y-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        오른쪽 예시를 참고해 JSON을 직접 붙여넣어 저장할 수 있습니다.
                        저장 시 <code>def.slug</code>는 현재 주소의 <code>{slug}</code>로 강제 설정됩니다.
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <div className="mb-1 text-sm font-semibold">입력</div>
                            <textarea 
                                className="w-full min-h-[460px] border rounded p-2 font-mono text-sm resize-y overflow-auto"
                                value={jsonText}
                                onChange={(e) => setJosnText(e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                        <div>
                            <div className="mb-1 text-sm font-semibold">예시</div>
                            <pre className="w-full min-h-[460px] border rounded p-2 font-mono text-xs bg-black/5 dark:bg-white/5 overflow-auto">
                                {exampleJson}
                            </pre>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={saveFromJson}
                            disabled={saving}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                        >{saving ? "저장 중..." : "저장"}</button>
                    </div>
                </div>
            )} 
        </div>
    )
}