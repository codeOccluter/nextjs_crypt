import Link from "next/link"
import { ReactNode } from "react"

type Variant = "default" | "dashboard" | "cryptography" | "compact" 

interface CardProps {
    title: string
    description: string
    href: string
    icon?: ReactNode
    tag?: string
    variant?: Variant
}

export default function Card({
    title,
    description,
    href,
    icon,
    tag,
    variant = "default"
}: CardProps) {

    const baseStyle = "relative group rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
    const variantStyle = {
        default: "p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100",
        dashboard: "p-6 bg-gradient-to-br from-slate-50 via to-slate-100 border-gray-200",
        variant: "p-4 bg-white border border-gray-100"
    }

    return (
        <Link href={href}>
            <div className={`${baseStyle} ${variantStyle[`variant`]}`}>
                {tag && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                    >{tag}</span>
                )}
                {icon && <div className="mb-4 text-blue-600 w-12 h-12">{icon}</div>}
                <h2 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition"
                >{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    )
}