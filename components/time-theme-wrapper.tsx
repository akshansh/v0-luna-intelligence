"use client"

import type React from "react"

import { useTime } from "@/components/time-provider"
import { cn } from "@/lib/utils"

export function TimeThemeWrapper({ children }: { children: React.ReactNode }) {
  const { timeOfDay, timeSegment } = useTime()

  // Apply both the time-of-day theme and the more specific time segment theme
  return <div className={cn("time-transition", `theme-${timeOfDay}`, `theme-${timeSegment}`)}>{children}</div>
}
