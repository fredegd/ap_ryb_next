"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const STICKY_OFFSET_PX = 48
const STICKY_HYSTERESIS_PX = 8

interface ServiceKeyDetailsStickyProps {
    duration?: string
    price?: string
    priceDescription?: string
    bookingLink?: string
}

export function ServiceKeyDetailsSticky({
    duration,
    price,
    priceDescription,
    bookingLink,
}: ServiceKeyDetailsStickyProps) {
    const stickyRef = useRef<HTMLDivElement>(null)
    const [isStuck, setIsStuck] = useState(false)

    useEffect(() => {
        const node = stickyRef.current
        if (!node) return

        let raf = 0

        const update = () => {
            raf = 0
            const rect = node.getBoundingClientRect()
            setIsStuck((prev) => {
                if (prev) {
                    return rect.top <= STICKY_OFFSET_PX + STICKY_HYSTERESIS_PX
                }
                return rect.top <= STICKY_OFFSET_PX + 1
            })
        }

        const onScroll = () => {
            if (raf) return
            raf = window.requestAnimationFrame(update)
        }

        const onResize = () => {
            if (raf) return
            raf = window.requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onResize)

        return () => {
            if (raf) window.cancelAnimationFrame(raf)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onResize)
        }
    }, [])

    const showBooking = isStuck
    const bookingHref = bookingLink || "https://calendly.com/your-booking-link"
    const hasDuration = Boolean(duration)
    const hasPrice = Boolean(price || priceDescription)
    const cardCount = Number(hasDuration) + Number(hasPrice)
    const gridColsClass = showBooking
        ? cardCount <= 1
            ? "md:grid-cols-2"
            : "md:grid-cols-3"
        : "md:grid-cols-2"
    const compact = showBooking

    return (
        <div ref={stickyRef} className="sticky top-12 right-0 z-40 mb-12">
            <div
                className={cn(
                    "grid grid-cols-3 items-stretch gap-2 transition-all duration-300 md:gap-6 md:auto-rows-fr",
                    "px-2 py-2 md:px-4 md:py-2 border-2 border-border-500 bg-background/50 backdrop-blur-md rounded-lg",
                    gridColsClass,
                )}
            >
                {hasDuration && (
                    <Card className={cn("h-full w-full", compact && "py-1")}>
                        <CardContent className={cn("flex items-center h-full", compact ? "p-2 md:p-4" : "p-3 md:p-6")}>
                            <Clock className={cn("text-primary mr-2", compact ? "w-4 h-4 md:w-6 md:h-6" : "w-6 h-6 md:w-8 md:h-8")} />
                            <div>
                                <h3 className={cn("font-semibold", compact ? "text-xs md:text-base" : "text-sm md:text-lg")}>Durata</h3>
                                <p className="text-muted-foreground text-xs md:text-base leading-snug">{duration}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {hasPrice && (
                    <Card className={cn("h-full w-full", compact && "py-1")}>
                        <CardContent className={cn("flex items-center h-full", compact ? "p-2 md:p-4" : "p-3 md:p-6")}>
                            <Tag className={cn("text-primary mr-2", compact ? "w-4 h-4 md:w-6 md:h-6" : "w-6 h-6 md:w-8 md:h-8")} />
                            <div>
                                <h3 className={cn("font-semibold", compact ? "text-xs md:text-base" : "text-sm md:text-lg")}>Prezzo</h3>
                                <p className="text-muted-foreground text-xs md:text-base leading-snug">
                                    {price && (
                                        <span className={cn("block font-bold", compact ? "text-sm md:text-lg" : "text-base md:text-xl")}>
                                            € {price}.-
                                        </span>
                                    )}
                                    {priceDescription && <span>{priceDescription}</span>}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {showBooking && (
                    <Card className="h-full w-full border-0 bg-primary text-background shadow-sm">
                        <CardContent className="h-full p-0">
                            <a
                                href={bookingHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-full w-full px-2 py-3 text-[11px] md:text-base font-passion-one font-semibold uppercase tracking-wide text-center leading-tight transition-colors hover:bg-primary/90 rounded-xl"
                            >
                                <span className="sm:hidden">Prenota</span>
                                <span className="hidden sm:inline">Prenota un Appuntamento</span>
                            </a>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
