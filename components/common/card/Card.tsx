import Link from "next/link"
import { ReactNode, MouseEvent } from "react"

type Variant = "default" | "dashboard" | "cryptography" | "compact" 
type TagTone = "blue" | "slate" | "emerald" | "violet" | "rose"

interface CardProps {
    title: string
    description?: string
    href: string
    icon?: ReactNode
    tag?: string
    tagTone?: TagTone
    variant?: Variant
    external?: boolean
    disabled?: boolean
    prefetch?: boolean
    cta?: string
    className?: string
    onClick?: (e: MouseEvent) => void
}

function cn(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ")
}

const baseStyle = 
    "group relative w-full rounded-2xl border border-transparent shadow-md transition-all " +
    "hover:shadow-xl focus-within:shadow-xl " +
    "hover:-translate-y-0.5 " +
    "focus-within:-translate-y-0.5 " +
    "outline-none"

const focusStyle =
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:outline-none"
  
const disabledStyle =
    "opacity-50 pointer-events-none select-none"
  
const variantStyle: Record<Variant, string> = {
    default:
        "p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 " +
        "dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900/80 " +
        "border-gray-100 dark:border-slate-800",
    dashboard:
        "p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 " +
        "dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800 " +
        "border-slate-200/60 dark:border-slate-700",
    cryptography:
        "p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 " +
        "dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 " +
        "border-violet-100 dark:border-violet-900/50",
    compact:
        "p-4 bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800",
}
  
  const tagToneStyle: Record<TagTone, string> = {
    blue: "bg-blue-600 text-white",
    slate: "bg-slate-600 text-white",
    emerald: "bg-emerald-600 text-white",
    violet: "bg-violet-600 text-white",
    rose: "bg-rose-600 text-white",
  }

  function ArrowIcon() {
    return (
        <svg
            width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
        >
            <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
  }

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
    onClick,
}: CardProps) {

    const content = (
        <div 
            className={cn(
                baseStyle,
                focusStyle,
                variantStyle[variant],
                disabled && disabledStyle,
                className
            )}
            aria-disabled={disabled || undefined}
        >
            {tag && (
                <span
                    className={cn(
                        "absolute top-4 right-4 rounded-full text-xs px-2 py-1 shadow-sm",
                        tagToneStyle[tagTone]
                    )}
                >{tag}</span>
            )}
            {icon && (
                <div
                    className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl
                        text-blue-600 bg-white/60 dark:bg-white/5
                        ring-1 ring-black/5 dark:ring-white/10"
                    aria-hidden
                >{icon}</div>
            )}
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100
                            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >{title}</h2>
            {description && (
                <p className="text-gray-600 dark:text-gray-300/80 mb-6 line-clamp-2">
                    {description}
                </p>
            )}
            {href && !disabled && (
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
                    <span>{cta}</span>
                    <ArrowIcon />
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
                onClick={onClick}
            >{content}</Link>
        )
    }

    return (
        <div role="group" className="block">{content}</div>
    )
}

export function CardSkeleton({ variant = "default" as Variant }) {
    return (
        <div className={cn(baseStyle, variantStyle[variant], "animate-pulse")}>
            <div className="h-6 w-1/3 bg-black/10 dark:bg-white/10 rounded mb-3" />
            <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded mb-2" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded " />
        </div>
    )
}