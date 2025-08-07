"use client"

import { useTranslation as useTranslationOrg } from "next-i18next"

export function useTranslation(ns: string) {

    const { t } = useTranslationOrg(ns)
    return { t }
}