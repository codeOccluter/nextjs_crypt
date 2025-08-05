import axios from "@/lib/axios/axiosClient"

export async function approveKey(username: string) {

    const result = await axios.post("/api/keys/approve", { username })

    return result.data
}