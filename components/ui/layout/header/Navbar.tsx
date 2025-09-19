"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import LocaleLink from "../../common/i18n/LocaleLink"
import Dropdown from "../../common/Dropdown"

export function HeaderNavbar() {
    const { t } = useTranslation()

    const navLinks = [
        { href: "/main", label: t("header.home") },
        { href: "/main/introduce", label: t("header.introduce") },
        { href: "/docs", label: t("header.document") },
    ]

    const algoLinks = [
        { href: "/main/graph/new", label: t("header.link.graph") }
    ]

    return (
        <nav className="hidden md:flex items-center">
            <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <LocaleLink
                            href={link.href}
                            className="nav-link"
                        >{link.label}</LocaleLink>
                    </li>                        
                ))}
                <li className="relative">
                    <Dropdown label={`${t("header.insert_data")}`} items={algoLinks} /> 
                </li>
            </ul>
        </nav>
    )
}