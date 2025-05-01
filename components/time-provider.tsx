"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type TimeOfDay = "dawn" | "day" | "dusk" | "night"

interface TimeContextType {
  timeOfDay: TimeOfDay
}

const TimeContext = createContext<TimeContextType>({ timeOfDay: "day" })

export function useTimeOfDay() {
  return useContext(TimeContext)
}

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day")

  useEffect(() => {
    // Update time of day based on current hour
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 8) {
        setTimeOfDay("dawn")
      } else if (hour >= 8 && hour < 17) {
        setTimeOfDay("day")
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay("dusk")
      } else {
        setTimeOfDay("night")
      }
    }

    // Initial update
    updateTimeOfDay()

    // Update every hour
    const interval = setInterval(updateTimeOfDay, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return <TimeContext.Provider value={{ timeOfDay }}>{children}</TimeContext.Provider>
}
