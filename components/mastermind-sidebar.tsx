"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, ChevronRight, ChevronLeft, Mountain, AtSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTime } from "@/components/time-provider"
import { MastermindCreator } from "@/components/mastermind-creator"

interface Mastermind {
  id: string
  name: string
  color: string
  lastUpdated: string
  personality: string
}

export function MastermindSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedMastermind, setSelectedMastermind] = useState<string | null>("mastermind1")
  const [isCreatorOpen, setIsCreatorOpen] = useState(false)
  const { timeOfDay } = useTime()

  const masterminds: Mastermind[] = [
    {
      id: "mastermind1",
      name: "Research Analyst",
      color: "#17A2B8",
      lastUpdated: "2 hours ago",
      personality: "Analytical, thorough, precise",
    },
    {
      id: "mastermind2",
      name: "Creative Director",
      color: "#0E7490",
      lastUpdated: "Yesterday",
      personality: "Innovative, visionary, bold",
    },
    {
      id: "mastermind3",
      name: "Technical Expert",
      color: "#0F766E",
      lastUpdated: "3 days ago",
      personality: "Detailed, logical, systematic",
    },
  ]

  return (
    <>
      <div
        className={cn(
          "backdrop-blur-md transition-all duration-300 time-transition border-right border-adaptive",
          isExpanded ? "w-full md:w-72" : "w-16",
        )}
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--conversation-border)",
        }}
      >
        <div className="p-4 flex items-center justify-between">
          <h2
            className={cn(
              "font-heading text-lg transition-opacity",
              isExpanded ? "opacity-100" : "opacity-0 md:hidden",
              "text-adaptive-sidebar",
            )}
          >
            Masterminds
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-adaptive-sidebar-muted hover:text-adaptive-sidebar hover:bg-white/5"
          >
            {isExpanded ? (
              <ChevronLeft className="text-adaptive-sidebar" />
            ) : (
              <ChevronRight className="text-adaptive-sidebar" />
            )}
          </Button>
        </div>

        <div className="px-3 pb-4">
          <Button
            className={cn(
              "w-full bg-[rgb(var(--time-primary))] hover:bg-[rgb(var(--time-primary))]/90 text-white justify-start mb-4 group time-transition",
              !isExpanded && "justify-center p-2",
            )}
            onClick={() => setIsCreatorOpen(true)}
          >
            <PlusCircle className={cn("h-4 w-4 text-white group-hover:animate-pulse", isExpanded && "mr-2")} />
            {isExpanded && "New Mastermind"}
          </Button>

          <div className="space-y-2">
            {masterminds.map((mastermind) => (
              <button
                key={mastermind.id}
                onClick={() => setSelectedMastermind(mastermind.id)}
                className={cn(
                  "w-full rounded-lg p-3 flex items-center transition-all group",
                  selectedMastermind === mastermind.id
                    ? "text-adaptive-sidebar"
                    : "text-adaptive-sidebar-muted hover:bg-white/5 hover:text-adaptive-sidebar",
                  !isExpanded && "justify-center p-2",
                )}
                style={{
                  background: selectedMastermind === mastermind.id ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  boxShadow: selectedMastermind === mastermind.id ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                  borderLeft: selectedMastermind === mastermind.id ? "3px solid rgb(var(--time-primary))" : "none",
                }}
              >
                <div className="relative">
                  <div
                    className="h-8 w-8 rounded-md flex items-center justify-center time-transition"
                    style={{
                      backgroundColor:
                        selectedMastermind === mastermind.id ? `rgb(var(--time-primary))` : mastermind.color,
                    }}
                  >
                    <AtSign className="h-4 w-4 text-white" />
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center",
                      selectedMastermind === mastermind.id ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300",
                    )}
                    style={{
                      background: "var(--sidebar-bg)",
                    }}
                  >
                    <Mountain className="h-3 w-3 text-[rgb(var(--time-primary))] time-transition" />
                  </div>
                </div>

                {isExpanded && (
                  <div className="ml-3 text-left overflow-hidden">
                    <div className="font-medium truncate text-adaptive-sidebar">{mastermind.name}</div>
                    <div className="text-xs text-adaptive-sidebar-muted truncate">{mastermind.personality}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <MastermindCreator isOpen={isCreatorOpen} onClose={() => setIsCreatorOpen(false)} />
    </>
  )
}
