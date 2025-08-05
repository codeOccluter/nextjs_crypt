import "reflect-metadata"
import { DataSource } from "typeorm"

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
    logging: true,
    entities: [],
})

if(!global._serverDB) {
    global._serverDB = ServerDB
}