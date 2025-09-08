export default function TechStack({
    categories,
}: {
    categories: { 
        name: string
        items: string[] 
}[];
}) {
    return (
        <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">기술 스택</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {categories.map((c) => (
                    <div key={c.name} className="rounded-2xl border border-black/10 dark:border-white/10 p-5">
                        <div className="font-semibold mb-3">{c.name}</div>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            {c.items.map((t) => (
                                <li key={t} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
