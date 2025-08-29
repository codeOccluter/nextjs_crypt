"use client"

import { Typewriter as TypewriterEffect } from "react-simple-typewriter"

interface TypewriterProps {
    words: string[]
    loop?: boolean
    cursor?: boolean
    cursorStyle?: string
    typeSpeed?: number
    deleteSpeed?: number
    delaySpeed?: number
    className?: string
}

export default function Typewriter({
    words,
    loop = false,
    cursor = true,
    cursorStyle = "_",
    typeSpeed = 80,
    deleteSpeed = 50,
    delaySpeed = 1000,
    className = "",
}: TypewriterProps) {

    return (
        <span className={className}>
            <TypewriterEffect 
                words={words}
                loop={loop}
                cursor={cursor}
                cursorStyle={cursorStyle}
                typeSpeed={typeSpeed}
                deleteSpeed={deleteSpeed}
                delaySpeed={delaySpeed}
            />
        </span>
    )
}