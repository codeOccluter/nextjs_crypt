import axios from "axios"

export async function fetchRegisteredKeys() {

    const result = await axios.get("/api/keys")
    return result.data.keys
}