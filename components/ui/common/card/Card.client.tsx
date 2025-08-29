"use client"

import Link from "next/link"
import { DataFunctionDefines, type Variant } from "@/contants/data-function/defines"
import { CardProps } from "@/contants/data-function/types"

export default function Card({
    title,
    description,
    href,
    icon,
    tag,
    tagTone = "blue",
    variant = "default",
    external = false,
    disabled = false,
    prefetch = true,
    cta = "바로가기",
    className,
}: CardProps) {

    const cardClass = [
        DataFunctionDefines.STYLES.cn.BASE,
        DataFunctionDefines.STYLES.cn.FOCUS,
        DataFunctionDefines.STYLES.variants[variant],
        disabled ? DataFunctionDefines.STYLES.cn.DISABLED : "",
        className ?? "",
    ].join(" ")

    const tagClass = [
        "absolute top-4 right-4 rounded-full text-xs px-2 py-1 shadow-sm",
        DataFunctionDefines.STYLES.tagTone[tagTone],
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
                    <DataFunctionDefines.ArrowIcon />
                </div>
            )}
        </div>
    )

    if(href && !disabled) {
        return (
            <Link
                href={href}
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

export function CardSkeleton({ variant = "default" as Variant }) {
    const skeletonClass = [
        DataFunctionDefines.STYLES.cn.BASE,
        DataFunctionDefines.STYLES.variants[variant],
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
