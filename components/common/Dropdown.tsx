"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface DropdownItem {
    href: string
    label: string
}

interface DropdownProps {
    label: string
    items: DropdownItem[]
}

export default function Dropdown({ label, items }: DropdownProps) {

    const pathname = usePathname()

    return (
        <div className="relative group">
            <button
                className="nav-link"
            >{label}</button>
            <div
                className="absolute mt-2 bg-gray-700 rounded shadow w-32 z-10
                           opacity-0 scale-95 transform transition-all duration-150 ease-in-out
                           group-hover:opacity-100 group-hover:scale-100"
            >
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 hover:bg-gray-500 ${pathname === item.href ? "font-bold" : ""}`}
                        >{item.label}</Link>
                    ))}
            </div>
        </div>
    )
}