"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Card from "../../ui/common/card/Card"
import { mapRowsToCards } from "@/features/main/main.mapper"
import axiosClient from "@/lib/axios/axiosClient"
import { type GraphRow } from "@/features/graph/new/new.types"
import { useTranslation } from "@/lib/i18n/i18n-client"

type ApiResponse<T> = {
    data: T[]
    page: number
    limit: number
    total: number
    hasMore: boolean
    nextPage: number | null
}

export default function GraphGrid() {

    const [items, setItems] = useState<GraphRow[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    const inFlightRef = useRef(false)
    const requestedPagesRef = useRef<Set<number>>(new Set())
    const didInitRef = useRef(false)
    const { t } = useTranslation()

    const fetchPage = useCallback(
        async (page: number) => {
            if(!hasMore) return
            if(inFlightRef.current) return
            if(requestedPagesRef.current.has(page)) return

            inFlightRef.current = true
            requestedPagesRef.current.add(page)
            setLoading(true)
            setError(null)

            try {
                const response = await axiosClient.get<ApiResponse<GraphRow>>(
                    `/api/graph`,
                    { params: { page: page, limit: 16 } }
                )
                // if(response.status !== 200) {
                // TODO: 예외 처리 코드 필요함
                // }
                const json = response.data
                setItems((prev) => [...prev, ...json.data])
                setHasMore(json.hasMore)
                setPage(json.nextPage ?? page)
            }catch(error: any){
                setError(error?.message ?? "Load error")
            }finally {
                setLoading(false)
            }
        }, [hasMore, loading])

    useEffect(() => {
        if(didInitRef.current) return
        didInitRef.current = true
        
        fetchPage(1)
    }, [fetchPage])

    useEffect(() => {
        if(!sentinelRef.current) return
        const element = sentinelRef.current

        const io = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if(first.isIntersecting && hasMore && !loading) {
                    fetchPage(page)
                }
            },
            { root: null, rootMargin: "800px", threshold: 0 }
        )
        io.observe(element)
        
        return () => io.unobserve(element)
    }, [page, hasMore, loading, fetchPage])

    const cards = useMemo(() => mapRowsToCards(items), [items])

    return (
        <div className="w-full">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-10 auto-rows-fr">
                    {cards.map((card) => (
                        <div key={card.slug} className="h-full">
                            <Card 
                                {...card}
                            />
                        </div>
                    ))}

                    {loading &&
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={`skeleton-${i}`} 
                                className="h-40 animate-pulse rounded-2xl border border-gray-200/70 bg-gray-100/60"
                            />
                        ))}
                </div>

                {error && (
                    <p className="mt-4 text-sm text-red-600">
                       {`${t("main.graph_grind.get_data_error")}`} {error}
                    </p>
                )}
                <div ref={sentinelRef} className="h-10" />
                {!hasMore && !loading && (
                    <p className="mt-6 text-center text-sm text-gray-500">
                        {`${t("main.graph_grid.no_more_data")}`}
                    </p>
                )}
            </div>
        </div>
    )
}