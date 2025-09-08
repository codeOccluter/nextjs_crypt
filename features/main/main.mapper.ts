import {
    DataFunctionDefines,
    type Variant,
    type TagTone,
    type Visibility
} from "@/features/data-functions/new/new.constants"
import {
    DataFunctionRow,
    type CardProps
} from "@/features/data-functions/new/new.types"

const isVariant = (v: any): v is Variant => 
    DataFunctionDefines.DATA_FUNCTION.variants.includes(v as Variant)

const isTagTone = (t: any): t is TagTone =>
    DataFunctionDefines.DATA_FUNCTION.tagTones.includes(t as TagTone)

export function mapDataFunctionToCard(r: DataFunctionRow): CardProps {
    
    const variant: Variant = isVariant(r.variant) ? r.variant! : "default"
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

export function mapRowsToCards(rows: DataFunctionRow[]): CardProps[] {
    return rows.map(mapDataFunctionToCard)
}