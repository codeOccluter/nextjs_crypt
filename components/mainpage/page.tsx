import Card from "../common/card/Card"
import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"

export default async function MainComponent() {
    await ensureClientDBReady()

    const repo = ClientSQL.getRepository(Entities.DataFunction)

    return (
        <div>
            mainpage
        </div>
    )
}