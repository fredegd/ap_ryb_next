"use client"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs">
              RB
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">Reset Your Body</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              <Link href="/about" className="text-foreground hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/servizi" className="text-foreground hover:text-accent transition-colors">
                Servizi
              </Link>
              <Link href="/blog" className="text-foreground hover:text-accent transition-colors">
                Blog
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
              className="text-3xl font-semibold text-foreground hover:text-accent transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              href="/servizi"
              className="text-3xl font-semibold text-foreground hover:text-accent transition-colors"
              onClick={closeMobileMenu}
            >
              Servizi
            </Link>
            <Link
              href="/blog"
              className="text-3xl font-semibold text-foreground hover:text-accent transition-colors"
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
