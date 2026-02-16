import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "react-day-picker"
import { Navbar } from "@/components/navbar"

// Display Font - Bold, Impactful Headings
const passionOne = localFont({
  src: "./fonts/PassionOne-Regular.ttf",
  variable: "--font-passion-one",
  display: "swap",
  weight: "400",
})

// Elegant Serif - Content Headings & Accents
const cormorantGaramond = localFont({
  src: "./fonts/CormorantGaramond-SemiBold.ttf",
  variable: "--font-cormorant-garamond",
  display: "swap",
  weight: "600",
})

// Body Font - Clean, Modern UI
const onest = localFont({
  src: "./fonts/Onest-Regular.ttf",
  variable: "--font-onest",
  display: "swap",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Reset Your Body",
  description: "Professional massage therapy and wellness services",
  generator: "",
  metadataBase: new URL('https://resetyourbody.it'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://resetyourbody.it',
    siteName: 'Reset Your Body',
    title: 'Reset Your Body',
    description: 'Professional massage therapy and wellness services',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Reset Your Body',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reset Your Body',
    description: 'Professional massage therapy and wellness services',
    images: ['/opengraph-image.png'],
  },
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
      <body className={`${passionOne.variable} ${cormorantGaramond.variable} ${onest.variable} font-onest antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
