"use client"

import "@/styles/components/layout/header.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {

    const pathname = usePathname()
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "Introduce" },
        { href: "/docs", label: "Document" },
        { href: "/keys", label: "PublickeyList" }
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
             </nav>
        </header>
    )
}