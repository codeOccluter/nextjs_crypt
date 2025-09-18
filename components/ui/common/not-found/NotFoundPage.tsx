"use client"

import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline"
import "@/styles/glitch/glitch.css"

interface NotFoundPageProps {
    title?: string
    message?: string
    showHomeButton?: boolean
    href?: string
    backPage?: string
}

export default function NotFoundPage({
    title,
    message,
    showHomeButton,
    href,
    backPage
}: NotFoundPageProps) {

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-black text-white">
            <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
                <WrenchScrewdriverIcon className="w-20 h-20 text-yellow-500 mb-4 animate-bounce"/>
                <h1 className="glitch-text text-7xl font-extrabold mb-4 relative text-yellow-400">
                    {title}
                    <span aria-hidden="true">{title}</span>
                    <span aria-hidden="true">{title}</span>
                </h1>
                <p className="text-gray-400 mb-6">
                    {message}
                </p>
                {showHomeButton && (
                    <a
                        href={href}
                        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition animate-pulse"
                    >{backPage}</a>
                )}
            </main>
        </div>
    )
}