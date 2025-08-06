"use client"

import { useEffect, useState } from "react"
import Footer from "./Footer"

export default function FooterWrapper() {

    const [visible, setVisible] = useState(true)

    useEffect(() => {

        const handleScroll = () => {

            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const fullHeight = document.body.scrollHeight

            if(scrollTop === 0 || scrollTop + windowHeight >= fullHeight) {
                setVisible(true)
            }else {
                setVisible(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            className={`fixed bottom-0 left-0 w-full transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
        >
            <Footer />
        </div>
    )
}