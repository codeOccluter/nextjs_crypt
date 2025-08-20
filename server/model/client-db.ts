import "reflect-metadata"
import { DataSource } from "typeorm"
import { Entities, EntityList } from "@/server/model/orm/entities"

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
    synchronize: false,
    logging: true,
    entities: EntityList
})

if(!global._clientSQL) {
    global._clientSQL = ClientSQL
}

export async function ensureClientDBReady() {

    if(!ClientSQL.isInitialized) await ClientSQL.initialize()

    if(!ClientSQL.hasMetadata(Entities.GuestUser)) {
        await ClientSQL.destroy();
        (ClientSQL.options as any).entities = EntityList
        await ClientSQL.initialize()
    }
}

export { Entities }