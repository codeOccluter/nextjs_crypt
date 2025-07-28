"use client"

import "@/styles/components/layout/header.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Header() {

    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "Introduce" },
        { href: "/docs", label: "Document" },
        { href: "/keys", label: "PublickeyList" }
    ]

    const algoLinks = [
        { href: "/encrypt/des", label: "DES" },
        { href: "/encrypt/aes", label: "AES" },
        { href: "/encrypt/rsa", label: "RSA" }
    ]

    return (
        <header className="header">
            <h1 className="header-title">NextJS Crypt</h1>
             <nav className="flex space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
                    >{link.label}</Link>
                ))}
                {/* 리스트 드랍다운 */}
                <div className="relative group">
                    <button
                        className="nav-link"
                    >list</button>
                    <div 
                        className="absolute mt-2 bg-gray-700 rounded shadow w-32 z-10
                                    opacity-0 scale-95 transform transition-all duration-150 ease-in-out
                                    group-hover:opacity-100 group-hover:scale-100
                        ">
                        {algoLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-2 hover:bg-gray-500 ${pathname === link.href ? "font-bold" : ""}`}
                            >{link.label}</Link>
                        ))}
                    </div>
                    
                </div>
             </nav>
        </header>
    )
}