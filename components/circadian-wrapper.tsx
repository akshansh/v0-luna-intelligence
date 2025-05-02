"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"

type CircadianWrapperProps = {
  children: React.ReactNode
}

export function CircadianWrapper({ children }: CircadianWrapperProps) {
  const [timeOfDay, setTimeOfDay] = useState<"dawn" | "day" | "dusk" | "night">("day")

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 8) {
        setTimeOfDay("dawn")
        document.documentElement.classList.add("dawn-mode")
        document.documentElement.classList.remove("day-mode", "dusk-mode", "night-mode")
      } else if (hour >= 8 && hour < 17) {
        setTimeOfDay("day")
        document.documentElement.classList.add("day-mode")
        document.documentElement.classList.remove("dawn-mode", "dusk-mode", "night-mode")
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay("dusk")
        document.documentElement.classList.add("dusk-mode")
        document.documentElement.classList.remove("dawn-mode", "day-mode", "night-mode")
      } else {
        setTimeOfDay("night")
        document.documentElement.classList.add("night-mode")
        document.documentElement.classList.remove("dawn-mode", "day-mode", "dusk-mode")
      }
    }

    updateTimeOfDay()
    const interval = setInterval(updateTimeOfDay, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div
        className={`min-h-screen bg-mountain-snow dark:bg-luna-navy transition-colors duration-300 ${timeOfDay}-mode`}
      >
        <div className="relative">
          {/* Subtle terrain pattern background */}
          <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10">
            <div className="h-full w-full bg-[url('/placeholder.svg?height=400&width=400')] bg-repeat"></div>
          </div>

          {/* Luna's paw prints - subtle navigation indicators */}
          <div className="absolute top-4 left-4 w-24 h-6 opacity-10 dark:opacity-20 pointer-events-none">
            <div className="h-full w-full bg-[url('/placeholder.svg?height=24&width=96')] bg-no-repeat"></div>
          </div>

          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}
