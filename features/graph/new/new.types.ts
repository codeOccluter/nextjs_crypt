import type { Variant, TagTone, Visibility } from "../../../features/graph/new/new.constants"

export type GraphRow = {
    id: string
    slug: string
    title: string
    description?: string | null
    path?: string | null
    external_url?: string | null
    variant: Variant
    icon_key?: string | null
    tag?: string | null
    tag_tone: TagTone | null
    category?: string | null
    is_active: number
    is_external: number
    order_priority: number
    visibility: Visibility
    metadata?: Record<string, any> | null
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CardProps {
    slug: string
    title: string
    description?: string
    href: string
    icon?: React.ReactNode
    tag?: string
    tagTone?: TagTone
    variant?: Variant
    external?: boolean
    disabled?: boolean
    prefetch?: boolean
    cta?: string
    className?: string
}

