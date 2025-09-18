export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
    return (
        <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">자주 묻는 질문</h2>
            <div className="space-y-3">
                {items.map((f, i) => (
                    <details
                        key={i}
                        className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5"
                    >
                        <summary className="cursor-pointer font-medium">{f.q}</summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
