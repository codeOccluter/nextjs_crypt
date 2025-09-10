import "reflect-metadata"

import { GuestUser as GuestUserClass } from "@/types/entities/GuestUser"
import { User as UserClass } from "@/types/entities/User"
import { Graph as GraphClass } from "@/types/entities/Graph"

export const Entities = {
    GuestUser: GuestUserClass,
    User: UserClass,
    Graph: GraphClass
} as const

export const EntityList = Object.values(Entities)