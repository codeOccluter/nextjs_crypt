export default function CTASection({
    title,
    subtitle,
    primary,
    secondary,
}: {
    title: string
    subtitle?: string
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
}) {
    return (
        <section className="text-center rounded-3xl border border-blue-200/60 dark:border-blue-900/40 p-8 bg-blue-50/60 dark:bg-blue-500/10">
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{title}</h3>
            {subtitle && (
                <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-200/80">{subtitle}</p>
            )}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                    href={primary.href}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
                >
                    {primary.label}
                </a>
                {secondary && (
                    <a
                        href={secondary.href}
                        className="px-4 py-2 rounded-lg bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 text-sm font-medium dark:bg-transparent dark:text-blue-300 dark:border-blue-900/40"
                    >
                        {secondary.label}
                    </a>
                )}
            </div>
        </section>
    );
}
