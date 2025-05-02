"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useTime } from "@/components/time-provider"

interface Message {
  id: string
  sender: "user" | "ai"
  timestamp: Date
  thinking?: boolean
}

interface PawPrintTrailProps {
  messages: Message[]
}

export function PawPrintTrail({ messages }: PawPrintTrailProps) {
  const [visiblePrints, setVisiblePrints] = useState<string[]>([])
  const { isDarkMode } = useTime()

  useEffect(() => {
    // Only show paw prints for AI messages that aren't thinking
    const aiMessageIds = messages.filter((m) => m.sender === "ai" && !m.thinking).map((m) => m.id)

    // Add new prints with a delay
    const newPrints = aiMessageIds.filter((id) => !visiblePrints.includes(id))

    if (newPrints.length > 0) {
      const timer = setTimeout(() => {
        setVisiblePrints((prev) => [...prev, ...newPrints])
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [messages, visiblePrints])

  // Determine opacity based on time of day
  const pawPrintOpacity = isDarkMode ? "15" : "8"

  return (
    <div className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] pointer-events-none">
      {messages
        .filter((m) => m.sender === "ai" && !m.thinking && visiblePrints.includes(m.id))
        .map((message, index) => {
          // Calculate position based on message index
          const xPos = 20 + (index % 3) * 15 // Vary horizontal position slightly
          const yPos = 100 + index * 80 // Space vertically

          return (
            <div
              key={message.id}
              className={cn("absolute w-6 h-6 opacity-0 animate-fade-in", index % 2 === 0 ? "left-0" : "right-0")}
              style={{
                top: `${yPos}px`,
                [index % 2 === 0 ? "left" : "right"]: `${xPos}px`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.5 14.5c1.5 0 2.5-1 2.5-2.5S10 9.5 8.5 9.5 6 10.5 6 12s1 2.5 2.5 2.5zm7 0c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5-2.5 1-2.5 2.5 1 2.5 2.5 2.5zm-10 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm13 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.5 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                  className={`fill-[rgb(var(--button-primary))]/[0.${pawPrintOpacity}] time-transition`}
                />
              </svg>
            </div>
          )
        })}
    </div>
  )
}
