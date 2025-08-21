import { SignJWT, jwtVerify } from "jose"

const AUTH_JWT_SECRET = new TextEncoder().encode(process.env.AUTH_JWT_SECRET || `dev-secret-change-me`)

export async function signAccessToken(payload: Record<string, any>, expiresIn = "15m") {

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(AUTH_JWT_SECRET)
}

export async function signRefreshToken(payload: Record<string, any>, expiresIn = "7d") {

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(AUTH_JWT_SECRET)
}

export async function verifyToken<T = any>(token: string) {
    
    const { payload } = await jwtVerify(token, AUTH_JWT_SECRET)
    
    return payload as T
}