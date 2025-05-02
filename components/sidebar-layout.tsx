"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon, FileText, Settings, Plus, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState<"dawn" | "day" | "dusk" | "night">("day")

  useEffect(() => {
    setMounted(true)

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const masterminds = [
    {
      id: "1",
      name: "Research Analyst",
      description: "Analytical, thorough, precise",
    },
    {
      id: "2",
      name: "Creative Director",
      description: "Innovative, visionary, bold",
    },
    {
      id: "3",
      name: "Technical Expert",
      description: "Detailed, logical, systematic",
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-luna-navy/90 backdrop-blur-sm text-white p-4 flex justify-between items-center border-b border-glacier-teal/20 z-10">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-glacier-teal flex items-center justify-center">
            <div className="w-4 h-4 flex">
              <div className="w-1.5 h-1.5 rounded-full bg-luna-navy"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-luna-navy ml-1"></div>
            </div>
          </div>
          <span className="font-fraunces text-xl font-bold">
            Luna<span className="text-glacier-teal">Intelligence</span>
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-white">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="ml-2 capitalize">{timeOfDay}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-white">
            <FileText className="h-5 w-5" />
            <span className="ml-2">Documentation</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-white">
            <Settings className="h-5 w-5" />
            <span className="ml-2">Settings</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-luna-navy/80 backdrop-blur-sm text-white border-r border-glacier-teal/20 flex flex-col">
          <div className="p-4 border-b border-glacier-teal/20 flex items-center">
            <Link href="/masterminds" className="flex items-center text-lg font-medium">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Masterminds
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <Button className="w-full bg-glacier-teal hover:bg-glacier-teal/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Mastermind
              </Button>
            </div>
            <nav className="px-2">
              {masterminds.map((mastermind) => (
                <Link
                  key={mastermind.id}
                  href={`/masterminds/${mastermind.id}/edit`}
                  className={`flex items-center p-3 my-1 rounded-md transition-colors ${
                    pathname.includes(`/masterminds/${mastermind.id}`)
                      ? "bg-glacier-teal text-white"
                      : "hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      pathname.includes(`/masterminds/${mastermind.id}`)
                        ? "bg-white text-glacier-teal"
                        : "bg-glacier-teal/20 text-white"
                    }`}
                  >
                    @
                  </div>
                  <div>
                    <div className="font-medium">{mastermind.name}</div>
                    <div className="text-xs opacity-80">{mastermind.description}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          {/* Terrain pattern background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="opacity-10 dark:opacity-5" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="terrain-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(5)"
              >
                <path
                  d="M 0,50 C 20,30 30,30 50,50 C 70,70 80,70 100,50 M 0,100 C 20,80 30,80 50,100 M 50,0 C 70,20 80,20 100,0"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-luna-navy dark:text-mountain-snow"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#terrain-pattern)" />
            </svg>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
