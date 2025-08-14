"use client"

import "@/styles/components/layout/header.css"
import Link from "next/link"
import Dropdown from "../common/Dropdown"
import GuestLogoutButton from "../mainpage/auth/GuestLogoutButton"

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
        <header className="h-16 flex items-center px-60 bg-black text-white">
            <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold mr-6">ABOUT SQL</h1>
                <nav className="flex items-center space-x-6">
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
            </div>

             <div className="ml-auto flex items-center">
                <GuestLogoutButton 
                    redirectToLanding
                />
            </div>
        </header>
    )
}