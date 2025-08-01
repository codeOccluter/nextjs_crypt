"use client"

import "@/styles/components/layout/header.css"
import Link from "next/link"
import Dropdown from "../common/Dropdown"

export default function Header() {

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "Introduce" },
        { href: "/docs", label: "Document" },
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
                        className="nav-link"
                    >{link.label}</Link>
                ))}
                <Dropdown 
                    label="Algorithm"
                    items={algoLinks}
                />
             </nav>
        </header>
    )
}