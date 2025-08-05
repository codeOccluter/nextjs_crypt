import "reflect-metadata"
import { DataSource } from "typeorm"
import { Subject } from "@/types/entities/Subject"

declare global {
    var _clientDB: DataSource | undefined
}

export const ClientDB = global._clientDB ?? new DataSource({
    type: "mysql",
    host: process.env.CLIENT_DB_HOST,
    port: Number(process.env.CLIENT_DB_PORT),
    username: process.env.CLIENT_DB_USER,
    password: process.env.CLIENT_DB_PASSWORD,
    database: process.env.CLIENT_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Subject],
})

if(!global._clientDB) {
    global._clientDB = ClientDB
}