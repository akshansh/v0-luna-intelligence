"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Calendar, AlertCircle, BarChart3, User, Home, Bell, Target, Layers, LayoutDashboard } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Goals", href: "/goals", icon: Target },
  ]

  const spacesNavItems = [
    { name: "Everything", href: "/everything", icon: Layers },
    { name: "Development", href: "/development", icon: LayoutDashboard, color: "bg-blue-500" },
    { name: "HR", href: "/hr", icon: User, color: "bg-pink-500" },
    { name: "Operations", href: "/operations", icon: BarChart3, color: "bg-green-500" },
  ]

  const attendanceNavItems = [
    { name: "Calendar", href: "/", icon: Calendar, active: true },
    { name: "Discrepancies", href: "/discrepancies", icon: AlertCircle },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const NavItem = ({ item, section }: { item: any; section: string }) => {
    const isActive = pathname === item.href || item.active
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium",
          isActive
            ? "bg-slate-100 text-glacier-teal dark:bg-slate-800"
            : "text-slate-600 hover:bg-slate-100 hover:text-glacier-teal dark:text-slate-300 dark:hover:bg-slate-800",
        )}
      >
        {section === "spaces" && item.color && <div className={cn("h-2 w-2 rounded-full", item.color)} />}
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className="flex w-56 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-luna-navy/50">
      <div className="flex h-14 items-center border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="flex items-center">
          <span className="text-glacier-teal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="ml-2 font-fraunces text-lg font-bold text-luna-navy dark:text-mountain-snow">Luna</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-6 px-2">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.name} item={item} section="main" />
            ))}
          </div>

          <div>
            <h3 className="mb-1 px-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Spaces</h3>
            <div className="space-y-1">
              {spacesNavItems.map((item) => (
                <NavItem key={item.name} item={item} section="spaces" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-1 px-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Attendance</h3>
            <div className="space-y-1">
              {attendanceNavItems.map((item) => (
                <NavItem key={item.name} item={item} section="attendance" />
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t border-slate-200 p-2 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-glacier-teal/20 text-glacier-teal">
              <div className="flex h-full w-full items-center justify-center font-medium">AC</div>
            </div>
            <div className="text-xs">
              <div className="font-medium text-slate-900 dark:text-white">Akshansh C.</div>
              <div className="text-slate-500 dark:text-slate-400">CTO</div>
            </div>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
