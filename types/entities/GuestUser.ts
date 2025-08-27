import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    Generated,
    BeforeInsert
} from "typeorm"

@Entity("guest_users")
export class GuestUser {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Index("uq_guest_users_idx", { unique: true })
    @Column({ type: "int" })
    @Generated("increment")
    idx!: number

    @Index({ unique: true })
    @Column({ type: "varchar", length: 30, nullable: true })
    nickname!: string

    @Column({ type: "tinyint", default: 0 })
    role!: number // 0: guest - 고정값

    @Column({ type: "datetime" })
    expires_at!: Date

    @CreateDateColumn({ type: "datetime" })
    created_at!: Date
}