export default function ValueProps({
    items,
}: {
    items: { 
        title: string
        description?: string
        icon?: string
    }[]
}) {

    return (
        <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">우리가 중요하게 생각하는 것</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {items.map((v, i) => (
                    <div
                        key={i}
                        className="h-full rouned-2xl border border-black/10 dark:border-white/10 p-5 bg-white/70 dark:bg-white/5"
                    >
                        <div className="text-3xl mb-2">{v.icon ?? "✨"}</div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{v.title}</div>
                        {v.description && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{v.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}