export default function HeroSection({
    eyebrow,
    title,
    subtitle,
    actions,
}: {
    eyebrow?: string
    title: string
    subtitle?: string
    actions?: { label: string, href: string, primary?: boolean }[]
}) {
    return (
        <section className="text-center">
            {eyebrow && (
                <div className="mb-2 text-xs font-semibold tracking-widset text-blue-600">
                    {eyebrow}
                </div>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {title}
            </h1>
            {subtitle && (
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark-text-gray-300">
                    {subtitle}
                </p>
            )}
            {actions && actions.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {actions.map((action) => (
                        <a
                            key={action.href}
                            href={action.href}
                            className={[
                                "px-4 py-2 rounded-lg text-sm font-medium transition",
                                action.primary
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/15 dark:text-blue-300"
                            ].join(" ")}
                        >{action.label}</a>
                    ))}
                </div>
            )}
        </section>
    )
}