"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

export type TimeOfDay = "dawn" | "day" | "dusk" | "night"

// More granular time segments to improve transitions
export type TimeSegment =
  | "early-dawn"
  | "mid-dawn"
  | "late-dawn"
  | "early-day"
  | "mid-day"
  | "late-day"
  | "early-dusk"
  | "mid-dusk"
  | "late-dusk"
  | "early-night"
  | "mid-night"
  | "late-night"

interface TimeContextType {
  timeOfDay: TimeOfDay
  timeSegment: TimeSegment
  timePercentage: number // 0-100 representing progress through the day
  setManualTime: (percentage: number | null) => void
  isManualMode: boolean
  isDarkMode: boolean // Helper to determine if we're in a dark mode (dusk/night)
  getLightValue: (light: number, dark: number) => number // Helper to get values based on light/dark mode
}

const TimeContext = createContext<TimeContextType>({
  timeOfDay: "day",
  timeSegment: "mid-day",
  timePercentage: 50,
  setManualTime: () => {},
  isManualMode: false,
  isDarkMode: false,
  getLightValue: () => 0,
})

export const useTime = () => useContext(TimeContext)

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day")
  const [timeSegment, setTimeSegment] = useState<TimeSegment>("mid-day")
  const [timePercentage, setTimePercentage] = useState(50)
  const [manualTime, setManualTime] = useState<number | null>(null)
  const isManualMode = manualTime !== null

  // Helper to determine if we're in a dark mode (dusk/night)
  const isDarkMode = timeOfDay === "night" || timeOfDay === "dusk"

  // Helper function to get values based on light/dark mode
  // Helps with transitional periods by smoothly interpolating between values
  const getLightValue = useCallback(
    (light: number, dark: number): number => {
      if (timeOfDay === "day") return light
      if (timeOfDay === "night") return dark

      // For dawn and dusk, we calculate a percentage based on where we are in the transition
      let factor = 0

      if (timeOfDay === "dawn") {
        // In dawn, we transition from dark to light
        if (timeSegment === "early-dawn")
          factor = 0.2 // Still mostly dark
        else if (timeSegment === "mid-dawn")
          factor = 0.5 // 50-50
        else factor = 0.8 // Mostly light
      } else if (timeOfDay === "dusk") {
        // In dusk, we transition from light to dark
        if (timeSegment === "early-dusk")
          factor = 0.8 // Still mostly light
        else if (timeSegment === "mid-dusk")
          factor = 0.5 // 50-50
        else factor = 0.2 // Mostly dark
      }

      return light * factor + dark * (1 - factor)
    },
    [timeOfDay, timeSegment],
  )

  // Function to determine time of day and segment based on percentage
  const calculateTimeInfo = (percentage: number) => {
    let timeOfDay: TimeOfDay
    let timeSegment: TimeSegment

    if (percentage >= 0 && percentage < 5) {
      timeOfDay = "night"
      timeSegment = "late-night"
    } else if (percentage >= 5 && percentage < 10) {
      timeOfDay = "dawn"
      timeSegment = "early-dawn"
    } else if (percentage >= 10 && percentage < 15) {
      timeOfDay = "dawn"
      timeSegment = "mid-dawn"
    } else if (percentage >= 15 && percentage < 25) {
      timeOfDay = "dawn"
      timeSegment = "late-dawn"
    } else if (percentage >= 25 && percentage < 40) {
      timeOfDay = "day"
      timeSegment = "early-day"
    } else if (percentage >= 40 && percentage < 55) {
      timeOfDay = "day"
      timeSegment = "mid-day"
    } else if (percentage >= 55 && percentage < 70) {
      timeOfDay = "day"
      timeSegment = "late-day"
    } else if (percentage >= 70 && percentage < 75) {
      timeOfDay = "dusk"
      timeSegment = "early-dusk"
    } else if (percentage >= 75 && percentage < 80) {
      timeOfDay = "dusk"
      timeSegment = "mid-dusk"
    } else if (percentage >= 80 && percentage < 85) {
      timeOfDay = "dusk"
      timeSegment = "late-dusk"
    } else if (percentage >= 85 && percentage < 90) {
      timeOfDay = "night"
      timeSegment = "early-night"
    } else if (percentage >= 90 && percentage < 95) {
      timeOfDay = "night"
      timeSegment = "mid-night"
    } else {
      timeOfDay = "night"
      timeSegment = "late-night"
    }

    return { timeOfDay, timeSegment }
  }

  useEffect(() => {
    const updateTimeOfDay = () => {
      // If in manual mode, use the manual time
      if (isManualMode) {
        setTimePercentage(manualTime)
        const { timeOfDay: newTimeOfDay, timeSegment: newTimeSegment } = calculateTimeInfo(manualTime)
        setTimeOfDay(newTimeOfDay)
        setTimeSegment(newTimeSegment)
        return
      }

      // Otherwise calculate based on current time
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      // Calculate percentage through the day (0-100)
      const totalMinutes = hours * 60 + minutes
      const percentage = (totalMinutes / 1440) * 100
      setTimePercentage(percentage)

      // Determine time of day and segment
      const { timeOfDay: newTimeOfDay, timeSegment: newTimeSegment } = calculateTimeInfo(percentage)
      setTimeOfDay(newTimeOfDay)
      setTimeSegment(newTimeSegment)
    }

    // Initial update
    updateTimeOfDay()

    // Update every minute if not in manual mode
    let interval: NodeJS.Timeout | null = null
    if (!isManualMode) {
      interval = setInterval(updateTimeOfDay, 60000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isManualMode, manualTime])

  const handleSetManualTime = (percentage: number | null) => {
    setManualTime(percentage)
  }

  return (
    <TimeContext.Provider
      value={{
        timeOfDay,
        timeSegment,
        timePercentage,
        setManualTime: handleSetManualTime,
        isManualMode,
        isDarkMode,
        getLightValue,
      }}
    >
      {children}
    </TimeContext.Provider>
  )
}
