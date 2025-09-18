import axiosClient from "@/lib/axios/axiosClient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: { provider: string } }
) {

    const { searchParams } = new URL(request.url)
    const { provider } = params
    const code = searchParams.get("code")
    const stats = searchParams.get("state")

    if(!code) {
        return NextResponse.json({ error: `Missing code` }, { status: 400 })
    }

    try{
        const tokenResponse = await axiosClient.post(
            `https://oauth2.googleapis.com/token`,
            new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/${provider}/callback`,
                grant_type: `authorization_code`
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
    
        const { access_token } = tokenResponse.data
        if(!access_token) {
            return NextResponse.json(
                { error: `Token exchange failed`, detail: tokenResponse.data },
                { status: 400 }
            )
        }
    
        const profileResponse = await axiosClient.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            { headers: { Authorization: `Bearer ${access_token}` } }
        )
    
        const profile = profileResponse.data
    
        const saveRes = await axiosClient.post(
            `${process.env.NEXTAUTH_URL}/api/oauth/${provider}`,
            {
                providerId: profile.id,
                email: profile.email,
                name: profile.name,
                image: profile.picture
            },
        )
    
        const data = saveRes.data
    
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/main?login=success`
        )
    }catch(err: any) {
        console.error("OAuth callback error:", err.response?.data || err.message)
        return NextResponse.json({ error: "OAuth callback failed" }, { status: 500 })
    }
}