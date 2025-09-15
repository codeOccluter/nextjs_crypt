"use client"

import Link from "next/link"
import { GraphDefines, type Variant } from "@/features/graph/new/new.constants"
import { CardProps } from "@/features/graph/new/new.types"
import ArrowIcon from "../Icons/ArrowIcons"

export default function Card({
    slug,
    title,
    description,
    href,
    icon,
    tag,
    tagTone = "blue",
    variant = "Bar",
    external = false,
    disabled = false,
    prefetch = true,
    cta = "바로가기",
    className,
}: CardProps) {

    const cardClass = [
        GraphDefines.STYLES.cn.BASE,
        GraphDefines.STYLES.cn.FOCUS,
        GraphDefines.STYLES.variants[variant],
        disabled ? GraphDefines.STYLES.cn.DISABLED : "",
        className ?? "",
    ].join(" ")

    const tagClass = [
        "absolute top-4 right-4 rounded-full text-xs px-2 py-1 shadow-sm",
        GraphDefines.STYLES.tagTone[tagTone],
    ].join(" ")

    const content = (
        <div className={cardClass} aria-disabled={disabled || undefined}>
            {tag && <span className={tagClass}>{tag}</span>}
            {icon && (
                <div
                    className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl
                               text-blue-600 bg-white/60 dark:bg-white/5
                               ring-1 ring-black/5 dark:ring-white/10"
                    aria-hidden
                >
                    {icon}
                </div>
            )}
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100
                            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
            </h2>
            {description && (
                <p className="text-gray-600 dark:text-gray-300/80 mb-6 line-clamp-2">
                    {description}
                </p>
            )}
            {href && !disabled && (
                <div className="mt-auto flex-items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
                    <span>{cta}</span>
                    <ArrowIcon />
                </div>
            )}
        </div>
    )

    if(href && !disabled) {
        return (
            <Link
                href={`/main/graph/${slug}`}
                prefetch={prefetch}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="block focus:outline-none"
                aria-label={title}
            >
                {content}
            </Link>
        )
    }

    return <div role="group" className="block">{content}</div>
}

export function CardSkeleton({ variant = "Bar" as Variant }) {
    const skeletonClass = [
        GraphDefines.STYLES.cn.BASE,
        GraphDefines.STYLES.variants[variant],
        "animate-pulse",
    ].join(" ")

    return (
        <div className={skeletonClass}>
            <div className="h-6 w-1/3 bg-black/10 dark:bg-white/10 rounded mb-3" />
            <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded mb-2" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
        </div>
    )
}
