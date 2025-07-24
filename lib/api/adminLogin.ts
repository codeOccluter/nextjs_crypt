import axios from "@/lib/axios/instance"

export async function adminLogin(password: string) {

    const result = await axios.post(`/api/admin/login`, {password})

    return result.data
}