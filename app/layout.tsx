import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { IBM_Plex_Sans } from "next/font/google"

export const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
})

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Axiom Pulse | Token Discovery",
  description: "Real-time token discovery and trading table - Track new pairs, migrations, and market movements",
  keywords: ["crypto", "trading", "tokens", "solana", "defi", "pulse"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased h-screen overflow-hidden {ibmPlex.variable}">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
