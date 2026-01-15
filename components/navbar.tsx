"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img className="w-8 h-8" alt="AP Logo" src="/favicon.svg" />
            <span className="font-semibold text-foreground dark:text-accent sm:inline font-passion-one">MASSOTERAPIA</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6 text-sm font-medium">

              <Link
                href="/servizi"
                className={`transition-colors ${pathname?.startsWith("/servizi")
                  ? "text-accent font-semibold"
                  : "text-foreground hover:text-accent"
                  }`}
              >
                Servizi
              </Link>
              <Link
                href="/blog"
                className={`transition-colors ${pathname?.startsWith("/blog")
                  ? "text-accent font-semibold"
                  : "text-foreground hover:text-accent"
                  }`}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={`transition-colors ${pathname === "/about"
                  ? "text-accent font-semibold"
                  : "text-foreground hover:text-accent"
                  }`}
              >
                About
              </Link>
              <a href="#contact" className="text-foreground hover:text-accent transition-colors">
                Contatti
              </a>
            </div>
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="relative h-full flex flex-col items-center justify-center space-y-8">
            <Link
              href="/about"
              className={`text-3xl font-semibold transition-colors ${pathname === "/about"
                ? "text-accent"
                : "text-foreground hover:text-accent"
                }`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="/servizi"
              className={`text-3xl font-semibold transition-colors ${pathname?.startsWith("/servizi")
                ? "text-accent"
                : "text-foreground hover:text-accent"
                }`}
              onClick={closeMobileMenu}
            >
              Servizi
            </Link>
            <Link
              href="/blog"
              className={`text-3xl font-semibold transition-colors ${pathname?.startsWith("/blog")
                ? "text-accent"
                : "text-foreground hover:text-accent"
                }`}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <a
              href="#contact"
              className="text-3xl font-semibold text-foreground hover:text-accent transition-colors"
              onClick={closeMobileMenu}
            >
              Contatti
            </a>
          </div>
        </div>
      )}
    </>
  )
}
