"use client"

import Link from "next/link"

export default function NotGraph({ slug }: { slug: string }) {

    return (
        <div className="mx-auto max-w-xl py-10 text-center">
            <h1 className="text-xl font-bold mb-4">그래프가 아직 없습니다.</h1>
            <Link
                href={`/main/graph/${slug}/new`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >데이터 추가하기</Link>
        </div>
    )
}