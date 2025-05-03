"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useTime } from "@/components/time-provider"

export function ThinkingIndicator() {
  const [dots, setDots] = useState(1)
  const { timeOfDay } = useTime()

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev % 3) + 1)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-adaptive-card-muted">Thinking</div>
      <div className="flex space-x-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-[rgb(var(--time-primary))] transition-opacity duration-300 time-transition",
              i <= dots ? "opacity-100" : "opacity-30",
            )}
          />
        ))}
      </div>
    </div>
  )
}
