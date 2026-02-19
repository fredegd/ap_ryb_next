"use client"

import { useEffect, useState } from "react"

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setIsVisible(window.scrollY > 420)
        }

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            }`}
        >
            ^ Back to top
        </button>
    )
}
