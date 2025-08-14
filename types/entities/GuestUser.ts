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

    @Index({ unique: true })
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

    // @BeforeInsert()
    // generateNickname() {
    //     if(!this.nickname) {
    //         const shortId = this.id
    //             ? this.id.replace(/-/g, "").substring(0, 4).toUpperCase()
    //             : Math.random().toString(36).substring(2, 8).toUpperCase()

    //         this.nickname = `Guest-${shortId}${this.idx}`
    //     }

    //     if(!this.expires_at) {
    //         this.created_at = new Date(Date.now() + 1000 * 60 * 60 * 24)
    //     }

    //     if(!this.role) {
    //         this.role = 0
    //     }
    // }
}