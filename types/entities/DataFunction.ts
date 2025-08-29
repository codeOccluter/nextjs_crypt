import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm"

import { type Variant, type TagTone, type Visibility } from "@/contants/data-function/defines"

@Entity("data_functions")
export class DataFunction {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ length: 80 })
    @Index({ unique: true })
    slug!: string

    @Column({ length: 120 })
    title!: string

    @Column({ type: "text", nullable: true })
    description?: string | null
    
    @Column({ type: "varchar", length: 200, nullable: true })
    path?: string | null

    @Column({ type: "varchar", length: 300, nullable: true })
    external_url?: string | null

    @Column({ type: "varchar", length: 20, default: "default" })
    variant!: Variant

    @Column({ type: "varchar", length: 60, nullable: true })
    icon_key?: string | null

    @Column({ type: "varchar", length: 20, nullable: true })
    tag?: string | null

    @Column({ type: "varchar", length: 20, default: "blue" })
    tag_tone!: TagTone

    @Column({ type: "varchar", length: 40, nullable: true })
    category?: string | null

    @Column({ type: "tinyint", width: 1, default: 1 })
    is_active!: number

    @Column({ type: "tinyint", width: 1, default: 1 })
    is_external!: number

    @Column({ type: "int", default: 100 })
    order_priority!: number

    @Column({ type: "varchar", length: 20, default: "public" })
    visibility!: Visibility

    @Column({ type: "json", nullable: true })
    metadata?: Record<string, any> | null

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn({ nullable: true })
    deleted_at!: Date | null
}
