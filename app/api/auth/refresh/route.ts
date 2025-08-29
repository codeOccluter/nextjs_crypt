import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signAccessToken, signRefreshToken, verifyToken } from "@/services/auth/jwt"

const COOKIE_BASE = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/" as const
}

export async function POST() {

    // 1) 쿠키 검증 (refresh_token, guest_id)
    try {

        const refreshToken = cookies().get("refresh_token")?.value
        if(!refreshToken) {
            return NextResponse.json({ message: `No refresh token` }, { status: 401 })
        }

        const payload = await verifyToken<{ sub: string, role: number }>(refreshToken).catch(() => null)
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
        
        const newAccessToken = await signAccessToken({ sub: payload.sub, role: payload.role })
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