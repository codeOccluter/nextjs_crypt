import axios from "@/lib/axios/axiosClient"

export async function registerPublicKey({ username, publicKey }: { username: string, publicKey: string }) {

    const result = await axios.post(`/api/keys/register`, { username, publicKey })

    return result.data
}