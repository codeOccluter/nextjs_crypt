// lib/nav/mainNav.ts
export const MAIN_BASE = "/main" as const

export const MAIN_NAV = [
    { key: "home", slug: "" },          // => /main
    { key: "introduce", slug: "introduce" }, // => /main/introduce
    { key: "document", slug: "docs" },      // => /main/docs
] as const;

export type MainNavKey = typeof MAIN_NAV[number]["key"];

export const MAIN_LABEL_KEY: Record<MainNavKey, `header.${MainNavKey}`> = {
    home: "header.home",
    introduce: "header.introduce",
    document: "header.document",
} as const

export function mainPath(slug: string) {
    return slug ? `${MAIN_BASE}/${slug}` : MAIN_BASE;
}

export function buildMainNavLinks<T extends (k: `header.${MainNavKey}`) => string>(t: T) {
    return MAIN_NAV.map(({ key, slug }) => ({
        key,
        href: mainPath(slug),
        label: t(MAIN_LABEL_KEY[key]),
    }))
}

export function matchActive(pathname: string, href: string) {
    const withoutLocale = pathname.replace(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//, "/")
    return withoutLocale === href || withoutLocale.startsWith(href + "/")
}
