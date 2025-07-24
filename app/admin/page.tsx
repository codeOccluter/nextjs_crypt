"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchRegisteredKeys } from "@/lib/api/fetchRegisteredKeys"
import { approveKey } from "@/lib/api/keys/approveKey"
import { deleteKey } from "@/lib/api/keys/deleteKey"

type KeyData = {
    username: string
    publicKey: string
    status: string
}

export default function AdminPage() {

    const [keys, setKeys] = useState<KeyData[]>([])
    const [loading, setLoading] = useState(true)
    
    const router = useRouter()

    useEffect(() => {
        fetchRegisteredKeys()
            .then((data) => {
                const pending = data.filter((k: KeyData) => k.status === "pending")
                setKeys(pending)
            })
            .catch(() => {
                alert("관리자 인증이 필요합니다.")
                router.push("/admin/login")
            })
            .finally(() => setLoading(false))
    }, [])

    const handleApprove = async (username: string) => {
        await approveKey(username)
        setKeys(keys.filter((k) => k.username !== username))
    }

    const handleDelete = async (username: string) => {
        await deleteKey(username)
        setKeys(keys.filter((k) => k.username !== username))
    }

    if(loading) return <p>불러오는 중...</p>

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">승인 대기 중 공개키</h2>
            {keys.length === 0 ? (
                <p>대기 중인 키가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {keys.map((key) => (
                        <li key={key.username} className="border p-4 rounded bg-white">
                            <p className="font-semibold">{key.username}</p>
                            <textarea
                                readOnly
                                value={key.publicKey}
                                className="w-full mt-2 font-mono text-xs h-32 border p-2 rounded"
                            />
                            <div className="flex gap-3 mt-3">
                                <button
                                    onClick={() => handleApprove(key.username)}
                                    className="btn bg-green-600 hover:bg-green-700"
                                >승인</button>
                                <button
                                    onClick={() => handleDelete(key.username)}
                                    className="btn bg-red-600 hover:bg-red-700"
                                >삭제</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}