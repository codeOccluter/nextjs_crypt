const DATA_FUNCTION = {
    variants: ["default", "dashboard", "graph", "compact"] as const,
    tagTones: ["blue", "slate", "emerald", "violet", "rose"] as const,
    visibilities: ["public", "guest", "authenticated", "admin"] as const,
}

export type Variant = (typeof DATA_FUNCTION.variants)[number]
export type TagTone = (typeof DATA_FUNCTION.tagTones)[number]
export type Visibility = (typeof DATA_FUNCTION.visibilities)[number]


const STYLES = {
    variants: {
        default:
            "p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 " +
            "dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900/80 " +
            "border-gray-100 dark:border-slate-800",
        dashboard:
            "p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 " +
            "dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800 " +
            "border-slate-200/60 dark:border-slate-700",
        graph:
            "p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 " +
            "dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 " +
            "border-violet-100 dark:border-violet-900/50",
        compact:
            "p-4 bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800",
    },
    tagTone: {
        blue: "bg-blue-600 text-white",
        slate: "bg-slate-600 text-white",
        emerald: "bg-emerald-600 text-white",
        violet: "bg-violet-600 text-white",
        rose: "bg-rose-600 text-white",
    },
    cn: {
        BASE:   "group relative w-full rounded-2xl border border-transparent shadow-md transition-all " +
                "hover:shadow-xl focus-within:shadow-xl hover:-translate-y-0.5 focus-within:-translate-y-0.5 outline-none",
        FOCUS:  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:outline-none",
        DISABLED: "opacity-50 pointer-events-none select-none"
    }
}

const ArrowIcon = () => {
    return (
        <svg
            width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
        >
            <path d="M7 5l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const DataFunctionDefines = {
    DATA_FUNCTION,
    STYLES,
    ArrowIcon,
}