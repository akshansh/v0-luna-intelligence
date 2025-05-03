"use client"

import { useTime } from "@/components/time-provider"
import { LunaEyes } from "@/components/luna-eyes"
import { Button } from "@/components/ui/button"
import { Settings, Moon, Sun, Sunrise, Sunset } from "lucide-react"

export function LunaHeader() {
  const { timeOfDay } = useTime()

  const timeIcons = {
    dawn: <Sunrise className="h-4 w-4 icon-adaptive-dark" />,
    day: <Sun className="h-4 w-4 icon-adaptive-dark" />,
    dusk: <Sunset className="h-4 w-4 icon-adaptive-dark" />,
    night: <Moon className="h-4 w-4 icon-adaptive-dark" />,
  }

  return (
    <header
      className="relative z-50 border-b border-adaptive time-transition"
      style={{ borderColor: "var(--conversation-border)" }}
    >
      <div className="backdrop-blur-md time-transition" style={{ background: "var(--sidebar-bg)" }}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <LunaEyes />
            </div>
            <h1 className="font-heading text-xl md:text-2xl font-bold text-adaptive-sidebar">
              Luna <span className="text-[rgb(var(--time-primary))] time-transition">Intelligence</span>
            </h1>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-adaptive-sidebar-muted hover:text-adaptive-sidebar">
              {timeIcons[timeOfDay]}
              <span className="ml-2 capitalize">{timeOfDay}</span>
            </Button>
            <Button
              variant="ghost"
              className="text-adaptive-sidebar-muted hover:text-adaptive-sidebar hover:bg-white/5"
            >
              Documentation
            </Button>
            <Button
              variant="ghost"
              className="text-adaptive-sidebar-muted hover:text-adaptive-sidebar hover:bg-white/5"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
