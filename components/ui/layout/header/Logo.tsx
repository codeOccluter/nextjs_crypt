"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"

export function HedaerLogo() {
    const { t } = useTranslation()

    return (
        <h1 className="text-xl md:text-2xl font-bold">
            {`${t("header.logo")}`}
        </h1>
    )
}