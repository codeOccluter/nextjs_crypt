"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import { ensureHrefLocale } from "@/lib/i18n/locale"
import type { Locale } from "@/lib/i18n/config"

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
    href: string
}

export default function LocaleLink({ href, children, ...rest }: Props) {

    const { locale } = useParams() as { locale?: string }
    const current = (locale ?? "ko") as Locale

    let finalHref = href

    try{
        finalHref = ensureHrefLocale(href, current)
    }catch(err) {
        console.error(`[LocaleLink] ensureHrefLocale error: ${err}`)
    }

    return (
        <Link href={finalHref} {...rest}>
            {children}
        </Link>
    )
}