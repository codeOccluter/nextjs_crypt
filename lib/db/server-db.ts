import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "@/types/entities/User"

declare global {
    var _serverDB: DataSource | undefined
}

export const ServerDB = global._serverDB ?? new DataSource({
    type: "mysql",
    host: process.env.SERVER_DB_HOST,
    port: Number(process.env.SERVER_DB_PORT),
    username: process.env.SERVER_DB_USER,
    password: process.env.SERVER_DB_PASSWORD,
    database: process.env.SERVER_DB_NAME,
    synchronize: true,
    // synchronize: true는 개발 단계에서만, 실무 배포 시에는 "migration" 사용
    logging: true,
    entities: [User],
})

if(!global._serverDB) {
    global._serverDB = ServerDB
}