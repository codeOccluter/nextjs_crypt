import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { GET, POST } = NextAuth(authConfig)

export { GET, POST }