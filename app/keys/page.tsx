"use client"

import { useEffect, useState } from "react"
import { fetchRegisteredKeys } from "@/lib/api/fetchRegisteredKeys"

type KeyInfo = {
    username: string
    publicKey: string
}

export default function KeyListPage() {

    const [keys, setKeys] = useState<KeyInfo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRegisteredKeys()
            .then((data) => setKeys(data))
            .finally(() => setLoading(false))
    })

    if(loading) return <p>로딩 중...</p>

    return (
        <div>
            <h2 className="section-title"></h2>
            {keys.length === 0 ? (
                <p>! 아직 등록된 키가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {keys.map((key) => (
                        <li
                            key={key.username}
                            className="border rounded p-4 bg-gray-50"
                        >
                            <p className="font-semibold">사용자: {key.username}</p>
                            <textarea
                                readOnly
                                value={key.publicKey}
                                className="w-full mt-2 font-mono text-xs h-32 border p-2 rounded"
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}