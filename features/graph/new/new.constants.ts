const GRAPH = {
    variants: ["Pie", "Bar", "Doughnut", "Line", "Histogram"] as const,
    tagTones: ["blue", "slate", "emerald", "violet", "rose"] as const,
    visibilities: ["public", "guest", "authenticated", "admin"] as const,
}

export type Variant = (typeof GRAPH.variants)[number]
export type TagTone = (typeof GRAPH.tagTones)[number]
export type Visibility = (typeof GRAPH.visibilities)[number]


const STYLES = {
    variants: {
        "Pie":
            "p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 " +
            "dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900/80 " +
            "border-gray-100 dark:border-slate-800",
        "Bar":
            "p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 " +
            "dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800 " +
            "border-slate-200/60 dark:border-slate-700",
        "Doughnut":
            "p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 " +
            "dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 " +
            "border-violet-100 dark:border-violet-900/50",
        "Line":
            "p-4 bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800",
        "Histogram":
            "p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 " +
            "dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 " +
            "border-violet-100 dark:border-violet-900/50",
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

export const GraphDefines = {
    GRAPH,
    STYLES,
}