import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ClientSQL, ensureClientDBReady } from "@/server/model/client-db"
import { Entities } from "@/server/model/orm/entities"
import { signAccessToken, signRefreshToken } from "@/services/auth/jwt"

export const runtiem = "nodejs"
export const dynamic = "force-dynamic"

const COOKIE_BASE = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    path: "/" as const,
    secure: process.env.NODE_ENV === "production"
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

export async function POST(
    req: NextRequest,
    { params }: { params: { provider: string } }
) {
    try {
        await ensureClientDBReady()

        const { provider } = params

        const supportedProviders = ["google", "kakao", "naver"]
        if(!supportedProviders.includes(provider)) {
            return NextResponse.json(
                { error: `Unsupported provider: ${provider}` },
                { status: 400 }
            )
        }

        const body = await req.json().catch(() => ({}))
        const { providerId, email, name, image } = body

        // if(!providerId || !email)
        if(!providerId) {
            return NextResponse.json(
                { error: `Provider ID ar required` },
                { status: 400 }
            )
        }

        const authUserRepo = ClientSQL.getRepository(Entities.User)

        let user = await authUserRepo.findOne({
            where: {
                provider: provider,
                provider_id: providerId
            }
        })
        if(user) {
            user.email = email
            user.name = name
            user.image = image
            user.updated_at = new Date()
            user = await authUserRepo.save(user)
        }else {
            user = authUserRepo.create({
                provider,
                provider_id: providerId,
                email,
                name,
                image,
                role: 1,
                is_delete: 0
            })
            user = await authUserRepo.save(user)
        }

        const basePayload = {
            userId: user.idx,
            role: user.role,
            name: user.name,
            email: user.email,
            image: user.image,
            provider: user.provider
        }

        const accessToken = await signAccessToken(basePayload)
        const refreshToken = await signRefreshToken(basePayload)

        const response = NextResponse.json(
            {
                id: user.idx,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
                provider: user.provider,
                accessToken,
                accessTokenExpiresIn: 60 * 60,
            },
            { status: 201 }
        )
        response.cookies.set({
            name: `refresh_token`,
            value: refreshToken,
            ...COOKIE_BASE,
            maxAge: 2 * 60 * 60
        })
        response.headers.set(`Cache-Control`, `no-store`)

        return response
    }catch(error) {
        console.error(`Auth Login Error: ${error}, provider: ${params.provider}`)
        
        return NextResponse.json(
            { error: `Internal server error` },
            { status: 500 }
        )
    }
}