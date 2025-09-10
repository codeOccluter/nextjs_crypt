import {
    GraphDefines,
    type Variant,
    type TagTone,
    type Visibility
} from "@/features/graph/new/new.constants"
import {
    GraphRow,
    type CardProps
} from "@/features/graph/new/new.types"

const isVariant = (v: any): v is Variant => 
    GraphDefines.GRAPH.variants.includes(v as Variant)

const isTagTone = (t: any): t is TagTone =>
    GraphDefines.GRAPH.tagTones.includes(t as TagTone)

export function mapGraphToCard(r: GraphRow): CardProps {
    
    const variant: Variant = isVariant(r.variant) ? r.variant! : "Bar"
    const tagTone: TagTone = isTagTone(r.tag_tone) ? r.tag_tone! : "blue"

    const href =
        r.is_external
            ? (r.external_url ?? "#")
            : (r.path ?? (r.slug ? `/data/${r.slug}` : "#"))

    return {
        title: r.title,
        description: r.description ?? undefined,
        href,
        external: !!r.is_external,
        tag: r.tag ?? undefined,
        tagTone,
        variant
    }
}

export function mapRowsToCards(rows: GraphRow[]): CardProps[] {
    return rows.map(mapGraphToCard)
}