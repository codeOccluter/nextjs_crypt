import { SignJWT, jwtVerify, errors, JWTPayload } from "jose"

const AUTH_JWT_SECRET = new TextEncoder().encode(process.env.AUTH_JWT_SECRET || `dev-secret-change-me`)

const ACCESS_TTL = process.env.ACCESS_TTL ?? "1h"
const REFRESH_TTL = process.env.REFRESH_TTL ?? "2h" // 개발 중: 2h → 운영(서비스 중): 24h

export async function signAccessToken(
    payload: Record<string, any>, 
    expiresIn = ACCESS_TTL
) {
    if(!payload || typeof payload !== "object") {
        throw new Error("signAccessToken: payload must be a non-null object")
    }
    // sub 우선순위: payload.sub > payload.guestId
    const subject = (payload as any).sub ?? (payload as any).guestId

    return await new SignJWT(payload as JWTPayload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setSubject(String(subject))
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(AUTH_JWT_SECRET)
}

export async function signRefreshToken(
    payload: Record<string, any> & { guestId?: string | number, sub?: string | number }, 
    expiresIn = REFRESH_TTL
) {
    if(!payload || typeof payload !== "object") {
        throw new Error("signRefreshToken: payload must be a non-null object")
    }
    const subject = (payload as any).sub ?? (payload as any).guestId

    return await new SignJWT(payload as JWTPayload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setSubject(String(subject))
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(AUTH_JWT_SECRET)
}

export async function verifyToken<T = any>(token: string) {
    
    const { payload } = await jwtVerify(token, AUTH_JWT_SECRET)
    
    return payload as T
}

export const JwtErrors = errors