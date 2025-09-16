"use client"

import { ReactNode, useState } from "react"

import type { Variant, TagTone } from "@/features/graph/new/new.constants"


type CardProps = {
    title: string
    description?: string
    href: string
    icon?: ReactNode,
    tag?: string
    tagTone?: TagTone
    variant?: Variant
    external?: boolean
    disabled?: boolean
    prefetch?: boolean
    cta?: string
    className?: string
    onClick?: (e: MouseEvent) => void
}