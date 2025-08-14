import "reflect-metadata"

import { GuestUser as GuestUserClass } from "@/types/entities/GuestUser"
import { User as UserClass } from "@/types/entities/User"

export const Entities = {
    GuestUser: GuestUserClass,
    User: UserClass
} as const

export const EntityList = Object.values(Entities)