"use client"

import Link from "next/link"

export default function GraphCard({ 
    slug, title, description 
}: { 
    slug: string
    title: string
    description: string
}) {
    return (
        <Link
            href={`/ko/graph/${slug}`}
            className="block rounded-xl border p-4 hover:shadow-lg hover:-translate-y-0.5 transition"
        >
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            {description && <p className="text-sm text-gray-600">{description}</p>}
        </Link>
    )
}
