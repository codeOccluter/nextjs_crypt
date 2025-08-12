import "reflect-metadata"
import { DataSource } from "typeorm"
import { GuestUser } from "@/types/entities/GuestUser"

declare global {
    var _clientSQL: DataSource | undefined
}

export const ClientSQL = global._clientSQL ?? new DataSource({
    type: "mysql",
    host: process.env.CLIENT_DB_HOST,
    port: Number(process.env.CLIENT_DB_PORT),
    username: process.env.CLIENT_DB_USER,
    password: process.env.CLIENT_DB_PASSWORD,
    database: process.env.CLIENT_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [GuestUser],
})

if(!global._clientSQL) {
    global._clientSQL = ClientSQL
}