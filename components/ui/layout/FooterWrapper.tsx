"use client"

import { useEffect, useState, useRef } from "react"
import Footer from "./Footer"

export default function FooterWrapper() {

    const [visible, setVisible] = useState(true)
    const ticking = useRef(false)

    useEffect(() => {

        const onScroll = () => {
            if (ticking.current) return
            ticking.current = true
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY
                const windowHeight = window.innerHeight
                const fullHeight = document.body.scrollHeight

                if (scrollTop < 8 || scrollTop + windowHeight > fullHeight - 8) {
                    setVisible(true)
                } else {
                    setVisible(false)
                }
                ticking.current = false
            })
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <div
            className={[
                "fixed bottom-0 left-0 w-full z-40",
                "transition-transform duration-300 ease-out",
                visible ? "translate-y-0" : "translate-y-full",
                "pointer-events-none"
            ].join(" ")}
        >
            <div className="pointer-events-auto">
                <Footer />
            </div>
        </div>
    )
}