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
  const [mounted, setMounted] = useState(false)
  const mobileNavItems = [
    { href: "/about", label: "About" },
    { href: "/servizi", label: "Servizi" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contatti", isAnchor: true },
  ]

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    closeMobileMenu()
  }, [pathname, mounted])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu()
      }
    }
    window.addEventListener("resize", handleResize, { passive: true })
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsVisible(true)
        setLastScrollY(window.scrollY)
        return
      }
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
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="max-w-8xl mx-auto xl:mx-34 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <img className="w-8 h-8" alt="AP Logo" src="/favicon.svg" />
            <span className="font-passion-one font-semibold text-foreground dark:text-accent sm:inline text-lg tracking-wide">MASSOTERAPIA</span>
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
        <div className="fixed inset-0 z-40 md:hidden h-screen">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="relative h-screen flex flex-col items-center justify-center space-y-8">
            {mobileNavItems.map((item, index) => {
              const isActive = item.href === "/about"
                ? pathname === "/about"
                : item.href === "/blog"
                  ? pathname?.startsWith("/blog")
                  : item.href === "/servizi"
                    ? pathname?.startsWith("/servizi")
                    : false
              const baseClasses = `mobile-nav-item text-3xl font-semibold transition-colors ${isActive
                ? "text-accent"
                : "text-foreground hover:text-accent"
                }`

              if (item.isAnchor) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={baseClasses}
                    onClick={closeMobileMenu}
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={baseClasses}
                  onClick={closeMobileMenu}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
