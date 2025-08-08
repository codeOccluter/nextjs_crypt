"use client"

import { useState } from "react"


export default function LoginForm({ 
    onSubmit 
}: { onSubmit: (v: { email: string, password: string }) => void }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
    
        onSubmit({ email, password })
    }

    return (
        <form
            onSubmit={(e) => handleSubmit}
            className="space-y-4"
        >
            
        </form>
    )
}