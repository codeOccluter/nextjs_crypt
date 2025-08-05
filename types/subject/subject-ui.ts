import type { ReactNode } from "react"

export interface SubjectUI {
    id: string
    name: string
    description: string
    details: string
    difficulty: string
    credit: number
    recommended: boolean
    icon: ReactNode
}