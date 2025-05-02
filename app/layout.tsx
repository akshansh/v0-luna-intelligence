import type React from "react"
import type { Metadata } from "next"
import { Nunito_Sans, Fraunces } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TimeProvider } from "@/components/time-provider"
import { TimeThemeWrapper } from "@/components/time-theme-wrapper"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: "Luna Intelligence | Digital Wilderness",
  description: "Create AI Masterminds from your unstructured data with Luna Intelligence",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TimeProvider>
            <TimeThemeWrapper>{children}</TimeThemeWrapper>
          </TimeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
