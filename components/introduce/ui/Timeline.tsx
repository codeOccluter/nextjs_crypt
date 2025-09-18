export default function Timeline({
    items,
}: {
    items: { 
        date: string
        title: string
        desc?: string 
}[]
}) {
    return (
        <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">히스토리</h2>
            <ol className="relative ps-8 space-y-6">
                <div className="pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10" />
                {items.map((it, i) => (
                    <li key={i} className="relative pl-6">
                        <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" aria-hidden/>
                        <div className="block text-xs text-gray-500 tabular-nums">
                            {it.date}
                            </div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {it.title}
                            </div>
                        {it.desc && 
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {it.desc}
                            </p>
                        }
                    </li>
                ))}
            </ol>
        </section>
    );
}
