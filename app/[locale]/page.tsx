// app/[locale]/page.tsx
// 서버 컴포넌트
import LandingWrapper from "./(no-layout)/LandingWrapper"
// import { getTranslations } from "@/lib/i18n/i18n-server"

export default function LocaleRoot({ params }: { params: { locale: "ko" | "en" } }) {

    // const { t } = getTranslations(params.locale)

    return(
        <>
            <LandingWrapper locale={params.locale} />
        </>
    ) 
}