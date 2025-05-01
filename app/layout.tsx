import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Nunito_Sans, Fraunces } from "next/font/google"
import { cn } from "@/lib/utils"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: "Luna Attendance",
  description: "Employee attendance management system by Luna Intelligence",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-nunito antialiased", nunito.variable, fraunces.variable)}>{children}</body>
    </html>
  )
}
