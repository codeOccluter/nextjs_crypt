import { ReactNode } from "react"

export interface Subject {
    id: string
    name: string
    description: string
    details: string
    difficulty: string
    credit: number
    recommended: boolean
    icon: ReactNode
}