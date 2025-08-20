import { AxiosError } from "axios"

export function parseAxiosError(err: unknown, fallback = "Request failded") {

    const axiosError = err as AxiosError<any>

    return (
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        fallback
    )
}