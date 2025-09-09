import { ReadonlyURLSearchParams } from "next/navigation"
import { SUPPORTED_LOCALES, type Locale } from "./config"

type MaybeSearchParams = URLSearchParams | ReadonlyURLSearchParams | null | undefined

function makeLocalePrefixRegex(): RegExp {

    const group = SUPPORTED_LOCALES.map(lang => lang.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")
    return new RegExp(`^/(${group})(?=/|$)`)
}

export function normalizePathLocale(pathname: string, nextLocale: Locale): string {
 
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`
    const rx = makeLocalePrefixRegex()
    if(rx.test(path)) return path.replace(rx, `/${nextLocale}`)
    return `/${nextLocale}${path === "/" ? "" : path}`
}

export function serializeSearchParams(sp: MaybeSearchParams): string {
    
    if(!sp) return ""

    try {
        return (sp as URLSearchParams).toString()
    }catch{
        return ""
    }
}

export function buildLocaleUrl(
    pathname: string,
    searchParams: MaybeSearchParams,
    nextLocale: Locale
): string {
    const base = normalizePathLocale(pathname ?? "/", nextLocale)
    const qs = serializeSearchParams(searchParams)

    return qs ? `${base}?${qs}` : base
}

export function ensureHrefLocale(href: string, current: Locale): string {

    if(/^https?:\/\//i.test(href)) return href

    const rx = makeLocalePrefixRegex()
    const path = href.startsWith("/") ? href : `/${href}`

    return rx.test(path) ? path : `/${current}${path}`
}

export function toggleLocale(current: Locale): Locale {

    const list = SUPPORTED_LOCALES as readonly Locale[]
    const i = list.indexOf(current)

    return i === -1 ? list[0] : list[(i + 1) % list.length]
}