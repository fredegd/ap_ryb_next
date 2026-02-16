"use client"

import Link from "next/link"

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export function Hero({
  // Default values serve as fallbacks if CMS data is missing or fails to load
  title = "RESET YOUR BODY",
  subtitle = "Alessandro Paradiso | Massoterapia | Chinesiologia",
  ctaText = "SCOPRI I SERVIZI",
  ctaLink = "/servizi"
}: HeroProps) {

  // Logic to split title after the first word
  const splitTitle = (text: string) => {
    const parts = text.trim().split(" ")
    if (parts.length === 0) return { first: "", rest: "" }
    const first = parts[0]
    const rest = parts.slice(1).join(" ")
    return { first, rest }
  }

  const { first: titleFirst, rest: titleRest } = splitTitle(title)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-32 md:py-48 min-h-[80dvh] flex items-center">
      {/* Decorative blur circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl -z-10 dark:opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 dark:opacity-50"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 dark:opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 ">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 ">{titleFirst}</h1>
        {titleRest && <h2 className="text-6xl md:text-7xl font-bold mb-8 text-accent">{titleRest}</h2>}
        <p className="text-lg text-foreground/70 font-cormorant-garamond mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Link href={ctaLink} className="px-8 py-3 border-2 border-primary rounded-md text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors duration-300 inline-block">
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
