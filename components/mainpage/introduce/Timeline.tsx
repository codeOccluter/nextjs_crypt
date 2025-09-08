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
            <ol className="relative border-s border-gray-200 dark:border-white/10 ps-6 space-y-6">
                {items.map((it, i) => (
                    <li key={i} className="relative">
                        <span className="absolute -start-1.5 top-1.5 h-3 w-3 rounded-full bg-blue-600" />
                        <div className="text-xs text-gray-500">{it.date}</div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{it.title}</div>
                        {it.desc && <p className="text-sm text-gray-600 dark:text-gray-300">{it.desc}</p>}
                    </li>
                ))}
            </ol>
        </section>
    );
}
