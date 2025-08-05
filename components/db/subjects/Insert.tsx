"use client"

import { useState } from "react"
import axiosClient from "@/lib/axios/axiosClient"

export default function Insert() {

    const [message, setMessage] = useState("")

    const handleSeed = async () => {

        try{
            const result = await axiosClient.post(`/api/seed/subjects`)
            setMessage(result.data.message)
        }catch(error) {
            console.log(error)
            setMessage(`오류가 발생했습니다. ${error}`)
        }
    }

    return (
        <div className="p-6">
            <button
                    onClick={handleSeed}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >더미데이터 삽입 (axiosClient)</button>
                {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    )
}