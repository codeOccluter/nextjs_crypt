import NewGraphPage from "@/components/graph/new/NewGraphPage"

export default function NewGraph({ params }: { params: { locale: "ko" | "en" } }) {

    return <NewGraphPage locale={params.locale} />
}