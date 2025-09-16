"use client"

import axiosClient from "@/lib/axios/axiosClient"
import { useRouter, useParams } from "next/navigation"

export default function DeleteGraphButton({ slug }: { slug: string }) {

    const router = useRouter()

    const onDelete = async () => {
        if(!confirm(`정말 삭제할까요?`)) return

        await axiosClient.delete(`/api/graph/${slug}`)
        router.replace(`/main`)
        router.refresh()
    }

    return (
        <button
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onDelete}
        >삭제</button>
    )
}