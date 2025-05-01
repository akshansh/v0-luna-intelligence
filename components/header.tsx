"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { useTimeOfDay } from "./time-provider"
import { Calendar, AlertCircle, User, BarChart3 } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { timeOfDay } = useTimeOfDay()

  // Get background color based on time of day
  const getBackgroundColor = () => {
    switch (timeOfDay) {
      case "dawn":
        return "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10"
      case "day":
        return "bg-white dark:bg-luna-navy/50"
      case "dusk":
        return "bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-900/20 dark:to-amber-900/10"
      case "night":
        return "bg-gradient-to-r from-slate-900/10 to-slate-800/5 dark:from-slate-900 dark:to-slate-800/80"
    }
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Calendar },
    { name: "Discrepancies", href: "/discrepancies", icon: AlertCircle },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200 transition-colors duration-500 dark:border-slate-800",
        getBackgroundColor(),
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-glacier-teal">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="ml-2 font-fraunces text-xl font-bold text-luna-navy dark:text-mountain-snow">
              Luna Attendance
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-glacier-teal"
                    : "text-slate-600 hover:text-glacier-teal dark:text-slate-300 dark:hover:text-glacier-teal",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
                {isActive && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-glacier-teal" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
