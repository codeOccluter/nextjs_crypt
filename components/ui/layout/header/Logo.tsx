"use client"

import Link from "next/link"

export function HeaderLogo({ brandName, variant = "default" }: { brandName: string, variant: string }) {

    const label = brandName

    const Orb = (
        <span className="relative inline-block h-7 w-7 md:h-8 md:w-8">
            <span className="absolute inset-0 rounded-full
                bg-[radial-gradient(closest-side,_rgba(0,179,255,0.95),_rgba(0,179,255,0)_70%)]
                blur-[2px] opacity-90" />
            <span className="absolute inset-0 rounded-full
                bg-[radial-gradient(closest-side,_rgba(0,0,0,0.35),_rgba(0,0,0,0)_70%)]" />
            <span className="absolute inset-0 rounded-full ring-1 ring-white/25" />
        </span>
    )

    const Wordmark = (
        <span className="flex items-baseline">
            <span className="text-xl md:text-2xl font-semibold tracking-tight
                text-transparent bg-clip-text
                bg-[linear-gradient(90deg,_#8EE7FF_0%,_#00B3FF_100%)]
                drop-shadow-[0_0_12px_rgba(0,179,255,0.25)]">
                {label}
            </span>
            <span className="ml-0.5 translate-y-[2px] text-cyan-300/85 text-lg md:text-xl">_</span>
        </span>
    )

    if(variant === "icon") {
        return (
            <Link href="/main" aria-label={label} className="group inline-flex items-center">
                <span className="relative">{Orb}</span>
            </Link>
        )
    }
    if (variant === "compact") {
        return (
          <Link href="/main" aria-label={label} className="group inline-flex items-center gap-2">
            {Orb}
            <span className="sr-only md:not-sr-only">{Wordmark}</span>
          </Link>
        )
      }
    
      // default
      return (
        <Link href="/main" aria-label={label} className="group inline-flex items-center gap-2">
          {Orb}
          {Wordmark}
        </Link>
      )
}