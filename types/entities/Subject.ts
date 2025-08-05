import "reflect-metadata"
import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Subject {
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column({ length: 200 })
    description!: string

    @Column({ type: "text" })
    details!: string

    @Column()
    difficulty!: string

    @Column()
    credit!: number

    @Column()
    recommended!: boolean
}