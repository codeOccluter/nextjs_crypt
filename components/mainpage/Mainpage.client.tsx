"use client"

import Card from "../ui/common/card/Card"
import { ReactNode, useState } from "react"

type Variant = "default" | "dashboard" | "cryptography" | "compact"
type TagTone = "blue" | "slate" | "emerald" | "violet" | "rose"

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