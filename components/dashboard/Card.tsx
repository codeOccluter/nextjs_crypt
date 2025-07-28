import Link from "next/link"

interface CardProps {
    title: string
    description: string
    href: string
}

export default function Card({
    title,
    description,
    href
}: CardProps) {

    return (
        <Link href={href}>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    )
}