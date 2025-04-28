"use client"

import { useTime } from "@/components/time-provider"

export function RidgelineDivider() {
  const { isDarkMode } = useTime()

  // Determine opacity based on time of day
  const opacity = isDarkMode ? "0.15" : "0.1"

  return (
    <div className="relative h-4 w-full overflow-hidden">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-16">
        <path
          d="M0,0 L0,120 L1200,120 L1200,0 L1080,60 L960,0 L840,60 L720,0 L600,60 L480,0 L360,60 L240,0 L120,60 L0,0 Z"
          fill="rgb(var(--button-primary))"
          opacity={opacity}
          className="time-transition"
        ></path>
      </svg>
    </div>
  )
}
