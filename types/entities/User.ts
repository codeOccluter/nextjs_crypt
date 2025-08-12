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
    id?: string

    @Column({ length: 50 })
    name?: string

    @Column({ type: "date" })
    birth?: string // YYYY-MM-DD

    @Column({ length: 20 })
    phone?: string
    
    @Column({ unique: true })
    email?: string // 고유 ID

    @Column({ nullable: true })
    profileImage?: string

    @Column({ nullable: true })
    primaryLang?: string

    @Column({ select: false })
    passwordHash?: string

    @Column({ type: "tinyint", default: 1 })
    role?: 0 | 1 | 2 // 0: guest, 1: user, 2: admin

    @Column({ type: "tinyint", default: 0 })
    is_delete?: number //0: 정상, 1: 삭제(회원탈퇴)

    @Column({ type: "timestamp", nullable: true })
    deleted_at?: Date

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date
}