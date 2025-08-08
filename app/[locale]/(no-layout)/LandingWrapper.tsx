import LandingPageClient from "./LandingPageClient"

export default function LandingWrapper({ locale }: { locale: string }) {

    return <LandingPageClient locale={locale} />
}