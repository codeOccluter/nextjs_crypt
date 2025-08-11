"use client"

import Cookies from "js-cookie"
import { v4 as uuid } from "uuid"
import { ClientDB } from "@/lib/db/client-db"
import { GuestUser } from "@/types/entities/GuestUser"

const COOKIE_NAME = "guest_id"
const MAX_AGE_SEC = 24 * 60 * 60 // 24H

export async function ensureClientDB() {
    if(!ClientDB.isInitialized)
        await ClientDB.initialize()
}

export async function cleanupExpiredGuest() {
    await ensureClientDB()
    
    const repo = ClientDB.getRepository(GuestUser)
    const all = await repo.find()
    const now = new Date()
    const expired = all.filter(g => new Date(g.expires_at).getTime() <= now.getTime())
    if(expired.length) await repo.remove(expired)
}

export async function issueGuest(): Promise<string> {
    await ensureClientDB()

    const repo = ClientDB.getRepository(GuestUser)

    const id = uuid()
    const now = new Date()
    const expires = new Date(now.getTime() + MAX_AGE_SEC * 1000)

    const guest = repo.create({
        id,
        role: 0,
        created_at: now,
        expires_at: expires
    })
    await repo.save(guest)

    Cookies.set(COOKIE_NAME, id, { expires: 1, path: "/" }) // 1일
    return id
}

export function readGuestIdFromCookie(): string | null {
    return Cookies.get(COOKIE_NAME) ?? null
}

export async function isGuestValid(id: string): Promise<boolean> {
    await ensureClientDB()

    const repo = ClientDB.getRepository(GuestUser)
    const g = await repo.findOne({ where: { id } })
    if(!g) return false

    return new Date(g.expires_at).getTime() > Date.now()
}

export async function clearGuest() {
    Cookies.remove(COOKIE_NAME, { path: "/" })
    await ensureClientDB()

    const repo = ClientDB.getRepository(GuestUser)
    const id = readGuestIdFromCookie()
    if(id) {
        const g = await repo.findOne({ where: { id } })
        if(g) await repo.remove(g)
    }
}