"use client"

import { useParams } from "next/navigation"
import en from "@/../public/locales/en.json"
import ko from "@/../public/locales/ko.json"

type Locale = "ko" | "en"
const translations: Record<Locale, any> = { ko, en }

export function useTranslation() {

    const params = useParams()
    const locale = (params?.locale as Locale) || "ko"

    function t(pathStr: string) {
        return pathStr.split(".").reduce((acc, key) => acc?.[key], translations[locale]) || pathStr
    }

    return { t, locale }
}