import "reflect-metadata"

import { GuestUser as GuestUserClass } from "@/types/entities/GuestUser"
import { User as UserClass } from "@/types/entities/User"
import { DataFunction as DataFunctionClass } from "@/types/entities/DataFunction"

export const Entities = {
    GuestUser: GuestUserClass,
    User: UserClass,
    DataFunction: DataFunctionClass
} as const

export const EntityList = Object.values(Entities)