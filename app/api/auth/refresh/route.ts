import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signAccessToken, signRefreshToken, verifyToken } from "@/services/auth/jwt"

const COOKIE_BASE = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/" as const
}

function clearCookie(response: NextResponse, name: string) {
    response.cookies.set({
        name,
        value: "",
        ...COOKIE_BASE,
        maxAge: 0,
        expires: new Date(0)
    })
}

export async function POST() {

    const refresh = cookies().get("refresh_token")?.value
    if(!refresh) {
        return NextResponse.json({ message: "No refresh token" }, { status: 401 })
    }
    
    try {

        const refreshToken = cookies().get("refresh_token")?.value
        if(!refreshToken) {
            return NextResponse.json({ message: `No refresh token` }, { status: 401 })
        }

        const payload = await verifyToken<{ sub: string, role?: number; guestId?: string; nickname?: string; guestIdx?: number }>(refreshToken).catch(() => null)
        if(!payload) {
            const response = NextResponse.json({ message: `Invalid refresh` }, { status: 401 })
            response.cookies.set({
                name: "refresh_token",
                value: "",
                ...COOKIE_BASE,
                maxAge: 0
            })

            return response
        }
        
        const newAccessToken = await signAccessToken({
            sub: payload.sub,
            role: payload.role ?? 0,
            guestId: payload.guestId ?? payload.sub,
            nickname: payload.nickname,
            guestIdx: payload.guestIdx,
        })
        const response = NextResponse.json({ accessToken: newAccessToken }, { status: 200 })
        
        return response
    }catch(err){

        const response = NextResponse.json({ message: `Refresh failed` }, { status: 401 })
        response.cookies.set({
            name: "refresh_token",
            value: "",
            ...COOKIE_BASE,
            maxAge: 0,
        })

        return response
    }
}