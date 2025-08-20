"use client"

import "@/styles/components/layout/header.css"
import Link from "next/link"
import Dropdown from "../common/Dropdown"
import GuestLogoutButton from "../mainpage/auth/GuestLogoutButton"
import useAuthStatus from "../../hooks/auth/useAuthStatus"

export default function Header() {

    const { status, user } = useAuthStatus()

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

    const Greeting = () => {
        if(status === "loading") return null
        // if(status !== "guest" && status !== "authenticated")  return null

        let name: string | undefined = ""
        if(status === "guest") {
            name = user?.name
        }
        // const name = user?.name ?? "게스트"

        return (
            <span
                className="ml-4 hidden sm:inline text-sm text-white/85 truncate max-w-[16rem]"
                title={`${name} 님 안녕하세요!`}
            >
                {name} 님 안녕하세요!
            </span>
        )
    }

    return (
        <header className="h-16 flex items-center justify-between px-60 bg-black text-white">
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
             <div className="ml-auto flex items-center gap-8">
                <Greeting />
                <GuestLogoutButton 
                    redirectToLanding
                />
            </div>
        </header>
    )
}