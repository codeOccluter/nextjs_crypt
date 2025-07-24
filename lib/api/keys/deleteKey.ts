import axios from "@/lib/axios/instance"

export async function deleteKey(username: string) {

    const result = await axios.post("/api/keys/delete", { username })

    return result.data
}