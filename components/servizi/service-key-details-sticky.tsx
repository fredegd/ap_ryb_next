"use client"

import { Clock, Info, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ServiceKeyDetailsStickyProps {
    duration?: string
    price?: string | number
    priceDescription?: string
    bookingLink?: string
    bookingPhoneNr?: string
}

export function ServiceKeyDetailsSticky({
    duration,
    price,
    priceDescription,
    bookingLink,
    bookingPhoneNr,
}: ServiceKeyDetailsStickyProps) {
    const bookingPhoneHref = bookingPhoneNr
        ? `tel:${bookingPhoneNr.replace(/\s+/g, "")}`
        : undefined
    const bookingHref =
        bookingLink ||
        bookingPhoneHref ||
        "https://www.instagram.com/massoterapista_paradiso/"
    const hasDuration = Boolean(duration)
    const hasPrice = Boolean(price || priceDescription)
    const cardCount = Number(hasDuration) + Number(hasPrice) + 1
    const gridColsClass = cardCount <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"
    const compact = true

    return (
        <div className="sticky top-16 mx-auto z-30 mb-12">
            <div
                className={cn(
                    "grid grid-cols-3 items-stretch gap-2 transition-all duration-300 md:gap-6 md:auto-rows-fr",
                    "px-1.5 py-1.5 md:px-4 md:py-2 border-2 border-border-500 bg-background/60 backdrop-blur-md rounded-lg mx-auto w-full",
                    gridColsClass,
                )}
            >
                {hasDuration && (
                    <Card className={cn("h-full w-full", compact && "py-1 h-12")}>
                        <CardContent className={cn("flex items-center h-full", compact ? "p-1.5 md:p-4" : "p-3 md:p-6")}>
                            <Clock className={cn("text-primary mr-2", compact ? "w-3.5 h-3.5 md:w-6 md:h-6" : "w-6 h-6 md:w-8 md:h-8")} />
                            <div>
                                <h3 className={cn("font-semibold", compact ? "text-[10px] md:text-base" : "text-sm md:text-lg")}>Durata</h3>
                                <p className="text-muted-foreground text-[11px] md:text-base leading-snug">{duration}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {hasPrice && (
                    <Card className={cn("h-full w-full", compact && "py-1 h-12")}>
                        <CardContent
                            className={cn(
                                "relative flex items-center h-full",
                                compact ? "p-1.5 md:p-4" : "p-3 md:p-6",
                            )}
                        >
                            {priceDescription && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            aria-label="Dettagli prezzo"
                                            className="absolute right-1.5 top-1.5 inline-flex items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground/80 shadow-sm backdrop-blur-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                                        >
                                            <Info className="h-3.5 w-3.5" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="end"
                                        className="w-48 text-xs leading-snug text-muted-foreground"
                                    >
                                        {priceDescription}
                                    </PopoverContent>
                                </Popover>
                            )}
                            <Tag className={cn("text-primary mr-2", compact ? "w-3.5 h-3.5 md:w-6 md:h-6" : "w-6 h-6 md:w-8 md:h-8")} />
                            <div>
                                <h3 className={cn("font-semibold", compact ? "text-[10px] md:text-base" : "text-sm md:text-lg")}>Prezzo</h3>
                                {price && (
                                    <p className="text-muted-foreground text-[11px] md:text-base leading-snug">
                                        <span className={cn("block font-bold", compact ? "text-[13px] md:text-lg" : "text-base md:text-xl")}>
                                            € {price}.-
                                        </span>
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
                    <Card className="h-12 w-full border-0 bg-primary text-background shadow-sm p-0">
                        <CardContent className="h-full p-0 h-12">
                            <a
                                href={bookingHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-full w-full px-1.5 py-2 text-[10px] md:text-base !font-passion-one font-semibold uppercase tracking-wide text-center leading-tight transition-colors hover:bg-primary/90 rounded-xl"
                            >
                                <span className="sm:hidden">Prenota</span>
                                <span className="hidden sm:inline">Prenota un Appuntamento</span>
                            </a>
                        </CardContent>
                </Card>
            </div>
        </div>
    )
}
