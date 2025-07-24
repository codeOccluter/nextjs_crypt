"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminLogin } from "@/lib/api/adminLogin"

export default function AdminLoginPage() {

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try{
            const result = await adminLogin(password)
            
            if(result.success) {
                router.push("/admin")
            }else {
                setError(`로그인 실패: ${result.message}`)
            }
        }catch(error) {
            setError(`서버 오류 발생`)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">관리자 로그인</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn"
                >로그인</button>
            </form>
            {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
        </div>
    )
}