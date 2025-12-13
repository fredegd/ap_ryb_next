import type React from "react"
import type { Metadata } from "next"
import { Passion_One, Fira_Sans, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "react-day-picker"
import { Navbar } from "@/components/navbar"

const passionOne = Passion_One({
  weight: ['400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-passion-one"
})

const firaSans = Fira_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-fira-sans"
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
})

export const metadata: Metadata = {
  title: "Reset Your Body",
  description: "Professional massage therapy and wellness services",
  generator: "",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${passionOne.variable} font-passion-one antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
