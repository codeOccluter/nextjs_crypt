import { SignJWT, jwtVerify, errors } from "jose"

const AUTH_JWT_SECRET = new TextEncoder().encode(process.env.AUTH_JWT_SECRET || `dev-secret-change-me`)

const ACCESS_TTL = process.env.ACCESS_TTL ?? "1h"
const REFRESH_TTL = process.env.REFRESH_TTL ?? "2h" // 개발 중: 2h → 운영(서비스 중): 24h

export async function signAccessToken(
    payload: Record<string, any>, 
    expiresIn = ACCESS_TTL
) {

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setSubject(String(payload.guestId))
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(AUTH_JWT_SECRET)
}

export async function signRefreshToken(
    payload: Record<string, any> & { guestId: string | number }, 
    expiresIn = REFRESH_TTL
) {

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setSubject(String(payload.guestId))
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(AUTH_JWT_SECRET)
}

export async function verifyToken<T = any>(token: string) {
    
    const { payload } = await jwtVerify(token, AUTH_JWT_SECRET)
    
    return payload as T
}

export const JwtErrors = errors