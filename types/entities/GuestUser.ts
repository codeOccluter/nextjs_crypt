import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index
} from "typeorm"

@Entity("guest_users")
export class GuestUser {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "tinyint", default: 0 })
    role!: 0 // 0: guest - 고정값

    @Index()
    @Column({ type: "datetime" })
    expires_at!: Date

    @CreateDateColumn({ type: "datetime" })
    created_at!: Date
}