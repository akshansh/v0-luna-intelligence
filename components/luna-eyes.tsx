"use client"

import { useState, useEffect } from "react"
import { useTime } from "@/components/time-provider"
import { cn } from "@/lib/utils"

export function LunaEyes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const { timeOfDay } = useTime()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Random blinking
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 200)
      }
    }, 3000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(blinkInterval)
    }
  }, [])

  useEffect(() => {
    // Calculate eye movement (limited range)
    const maxMovement = 3
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const xMovement = ((mousePosition.x / windowWidth) * 2 - 1) * maxMovement
    const yMovement = ((mousePosition.y / windowHeight) * 2 - 1) * maxMovement

    setEyePosition({
      x: Math.max(-maxMovement, Math.min(maxMovement, xMovement)),
      y: Math.max(-maxMovement, Math.min(maxMovement, yMovement)),
    })
  }, [mousePosition])

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
          <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="20" cy="20" r="20" fill="#0D1B2A" />
          <path
            d="M5 15 Q20 5, 35 15 Q20 25, 5 15"
            fill="#0D1B2A"
            stroke="rgb(var(--time-primary))"
            strokeWidth="0.5"
            opacity="0.3"
            className="time-transition"
          />
          <path
            d="M5 25 Q20 15, 35 25 Q20 35, 5 25"
            fill="#0D1B2A"
            stroke="rgb(var(--time-primary))"
            strokeWidth="0.5"
            opacity="0.3"
            className="time-transition"
          />

          {/* Left eye */}
          <g className={cn(isBlinking && "animate-blink")}>
            <circle
              cx={12 + eyePosition.x}
              cy={20 + eyePosition.y}
              r="4"
              fill="rgb(var(--time-primary))"
              className="time-transition"
            />
            <circle cx={12 + eyePosition.x} cy={20 + eyePosition.y} r="2" fill="#000000" />
          </g>

          {/* Right eye */}
          <g className={cn(isBlinking && "animate-blink")}>
            <circle
              cx={28 + eyePosition.x}
              cy={20 + eyePosition.y}
              r="4"
              fill="rgb(var(--time-primary))"
              className="time-transition"
            />
            <circle cx={28 + eyePosition.x} cy={20 + eyePosition.y} r="2" fill="#000000" />
          </g>
        </g>
      </svg>
    </div>
  )
}
