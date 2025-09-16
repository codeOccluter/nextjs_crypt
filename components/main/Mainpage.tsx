import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"
import { mapRowsToCards } from "../../features/main/main.mapper"
import Card from "../ui/common/card/Card"
import GraphGrid from "./GraphGrid"

export const dynamic = "force-dynamic"

export default async function Mainpage() {
    return (
        <div className="pt-4 sm:pt-6">
            <GraphGrid />
        </div>
    )
}