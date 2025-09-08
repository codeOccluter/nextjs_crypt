import Link from "next/link"
import { DataFunctionDefines, type Variant, type TagTone, type Visibility } from "@/features/data-functions/new/new.constants"
import { CardProps } from "@/features/data-functions/new/new.types"
import ArrowIcon from "../Icons/ArrowIcons"

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
        "relative h-full flex flex-col rounded-2xl border",
        "transition-all duration-200 ease-out",
        "bg-white/75 dark:bg-white/5 backdrop-blur-[1px]",
        "hover:shadow-xl focus-within:shadow-xl hover:translate-y-[2px] focus-within:-translate-y-[2px]",
        className ?? "",
    ].join(" ")

    const tagClass = [
        "absolute top-4 right-4 rounded-full text-[11px] leading-5 px-2 py-[2px] shadow-sm select-none",
        DataFunctionDefines.STYLES.tagTone[tagTone],
    ].join(" ")

    const Body = (
        <div
            className={cardClass}
            aria-disabled={disabled || undefined}
            role="article"
        >
            {tag && <span className={tagClass}>{tag}</span>}
            {icon && (
                <div
                className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl
                            text-blue-600 bg-white/70 dark:bg-white/10
                            ring-1 ring-black/5 dark:ring-white/10
                            transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400"
                aria-hidden
                >{icon}</div>
            )}
            <h2
                className="text-xl sm:text-2xl font-bold mb-1
                text-gray-800 dark:text-gray-100
                transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400"
            >{title}</h2>

            {description && (
                <p className="text-[15px] text-gray-600 dark:text-gray-300/80 mb-5 line-clamp-2 min-h-[44px]"
                >{description}</p>
            )}
            {description && <div className="h-px bg-black/5 dark:bg-white/10 mb-4" />}
            {href && !disabled && (
                <div
                    className="mt-auto flex items-center gap-2 text-sm font-medium
                                text-blue-700 dark:text-blue-400"
                >
                    <span className="transition-colors group-hover:underline underline-offset-4"
                    >{cta}</span>
                    <span className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                    ><ArrowIcon /></span>
                    {external && (
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded
                                        bg-blue-50 text-blue-700
                                        dark:bg-blue-500/15 dark:text-blue-300"
                        >외부</span>
                    )}
                </div>
            )}
            {disabled && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/40 dark:bg-black/30" />
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
            >{Body}</Link>
        )
    }

    return (
        <div role="group" className="block">
            {Body}
        </div>
    )
}

export function CardSkeleton({ variant = "default" as Variant }) {
    const skeletonClass = [
        DataFunctionDefines.STYLES.cn.BASE,
        DataFunctionDefines.STYLES.variants[variant],
        "relative h-full rounded-2xl border overflow-hidden"
    ].join(" ")

    return (
        <div className={skeletonClass}>
            <div className="h-6 w-1/3 bg-black/10 dark:bg-white/10 rounded mb-3" />
            <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded mb-2" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
            
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-grandient-to-r
                            from-transparent via-white/40 to-transparent dark:via-white/10" />
            <style jsx>{`
                @keyframes shimmer{
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    )
}
