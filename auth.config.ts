import type { NextAuthOptions } from "next-auth"
import axiosClient from "./lib/axios/axiosClient"
import { ACTIVE_PROVIDERS, SUPPORTED_PROVIDERS } from "./features/auth/oauth/oauth.constants"

const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: ACTIVE_PROVIDERS.map(providerName => {
        const providerConfig = SUPPORTED_PROVIDERS[providerName as keyof typeof SUPPORTED_PROVIDERS]
        if(!providerConfig) {
            throw new Error(`Unsupported provider: ${providerName}`)
        }
        return (providerConfig.provider as any)(providerConfig.config)
    }),
    callbacks: {
        async jwt({ token, account, profile }) {
            if(account?.provider && profile) {
                try {
                    const response = await axiosClient.post(`${process.env.NEXTAUTH_URL}/api/auth/${account.provider}`, {
                        providerId: profile.sub,
                        email: profile.email,
                        name: profile.name,
                        image: profile.image
                    })

                    if(response.data) {
                        const data = response.data
                        
                        token.userId = data.id
                        token.role = data.role
                        token.provider = data.provider
                        token.accessToken = data.accessToken
                    }
                }catch(error) {
                    console.error(`${account.provider} Login API call failed: ${error}`)
                }
            }

            return token
        },
        async session({ session, token }) {
            
            if(token.userId) {
                session.user = {
                    ...session.user,
                    id: token.userId as string,
                    name: token.name as string,
                    email: token.email as string,
                    image: token.picture as string,
                    role: token.role as number,
                    provider: token.provider as string
                } as any
            }
            return session
        }
    }
}

export default authOptions