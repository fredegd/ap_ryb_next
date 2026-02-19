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
                return rect.top <= STICKY_OFFSET_PX - STICKY_HYSTERESIS_PX
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
                    "grid grid-cols-1 md:auto-rows-fr max-h-24 px-4 py-2 border-2 border-border-500 bg-background/50 backdrop-blur-md rounded-lg gap-6 transition-all duration-300",
                    gridColsClass,
                )}
            >
                {hasDuration && (
                    <Card className={cn("h-full", compact && "py-4")}>
                        <CardContent className={cn("flex items-center h-full p-0")}>
                            <Clock className={cn("text-primary mr-4", compact ? "w-6 h-6" : "w-8 h-8")} />
                            <div>
                                <h3 className={cn("font-semibold", compact ? "text-base" : "text-lg")}>Durata</h3>
                                <p className="text-muted-foreground">{duration}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {hasPrice && (
                    <Card className={cn("h-full", compact && "py-4")}>
                        <CardContent className={cn("flex items-center justify-center h-full p-0")}>
                            <Tag className={cn("text-primary mr-4", compact ? "w-6 h-6" : "w-8 h-8")} />
                            <div>
                                <h3 className={cn("font-semibold", compact ? "text-base" : "text-lg")}>Prezzo</h3>
                                <p className="text-muted-foreground">
                                    {price && (
                                        <span className={cn("block font-bold", compact ? "text-lg" : "text-xl")}>
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
                    <Card className="h-full border-0 bg-primary text-background shadow-sm">
                        <CardContent className="h-full p-0">
                            <a
                                href={bookingHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-full w-full px-6 py-4 text-base font-passion-one font-semibold uppercase tracking-wide whitespace-nowrap transition-colors hover:bg-primary/90 rounded-xl"
                            >
                                Prenota un Appuntamento
                            </a>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
