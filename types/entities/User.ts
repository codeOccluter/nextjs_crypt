import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid") 
    idx!: number

    @Column({ type: "tinyint", default: 1 })
    role!: 0 | 1 | 2 // 0: guest, 1: user, 2: admin

    @Column({ type: "varchar", length: 45, nullable: true })
    provider?: string

    @Column({ type: "varchar", length: 255, nullable: true })
    provider_id?: string

    @Column({ type: "varchar", length: 50, nullable: true })
    name?: string

    @Column({ type: "varchar", length: 20, nullable: true })
    phone?: string

    @Column({ type: "varchar", length: 30, nullable: true })
    birth?: string
    
    @Column({ type: "varchar", length: 255,  unique: true, nullable: true })
    email?: string // 고유 ID

    @Column({ type: "varchar", nullable: true })
    image?: string

    @Column({ type: "tinyint", default: 0 })
    is_delete!: number //0: 정상, 1: 삭제(회원탈퇴)

    @Column({ type: "timestamp", nullable: true })
    deleted_at?: Date

    @CreateDateColumn({ type: "datetime", precision: 6 })
    created_at!: Date

    @UpdateDateColumn({ type: "datetime", precision: 6 })
    updated_at!: Date
}