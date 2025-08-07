// app/[locale]/page.tsx
import LandingPage from "./(no-layout)/page"

export default function LocaleRoot({ params }: { params: { locale: string } }) {
    return <LandingPage />
}
