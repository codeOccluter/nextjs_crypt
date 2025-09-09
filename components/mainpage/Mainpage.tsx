import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"
import { mapRowsToCards } from "../../features/main/main.mapper"
import Card from "../ui/common/card/Card"
import DataFunctionGrid from "@/components/mainpage/DataFunctionGrid"

export const dynamic = "force-dynamic"

// export default async function Mainpage() {
//     await ensureClientDBReady()

//     const dataFunctionRepo = ClientSQL.getRepository(Entities.DataFunction)
//     const dataFunction = await dataFunctionRepo.find({
//         where: { is_active: 1 },
//         order: { order_priority: "ASC", title: "ASC" }
//     })

//     const cards = mapRowsToCards(dataFunction)

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {cards.map((card) => (
//                 <Card 
//                     key={card.href}
//                     {...card}
//                 />
//             ))}
//         </div>
//     )
// }

export default async function Mainpage() {
    return (
        <div className="pt-4 sm:pt-6">
            <DataFunctionGrid />
        </div>
    )
}