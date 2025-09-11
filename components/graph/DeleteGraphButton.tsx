"use client"

import axiosClient from "@/lib/axios/axiosClient"
import { useRouter, useParams } from "next/navigation"

export default function DeleteGraphButton({ slug }: { slug: string }) {

    const router = useRouter()
    const { locale } = useParams() as { locale: string }

    const handleDelete = async () => {
        if(!confirm(`정말 삭제하시겠습니까?`)) return

        await axiosClient.delete(`/api/graph/${slug}`)
        router.push(`/${locale}/graph`)
    }

    return (
        <button
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={handleDelete}
        >삭제</button>
    )
}