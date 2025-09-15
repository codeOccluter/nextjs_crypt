import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if(account?.provider === "google") {
                token.provider = "google"
            }
            if(profile) {
                token.name = profile.name ?? token.name
                token.email = (profile as any).email ?? token.email
                token.picture = (profile as any).picture ?? token.picture
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                name: token.name as string | undefined,
                email: token.email as string | undefined,
                image: token.picture as string | undefined,
                role: (token as any).role ?? 0,
                provider: (token as any).provider ?? "google",
            } as any
            return session
        }
    }
}

export default authOptions