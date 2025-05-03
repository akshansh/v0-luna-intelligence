"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Mountain, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  color: string
  lastUpdated: string
}

export function ProjectSelector() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedProject, setSelectedProject] = useState<string | null>("project1")

  const projects: Project[] = [
    {
      id: "project1",
      name: "Marketing Content Analysis",
      color: "#17A2B8",
      lastUpdated: "2 hours ago",
    },
    {
      id: "project2",
      name: "Customer Support Data",
      color: "#D62828",
      lastUpdated: "Yesterday",
    },
    {
      id: "project3",
      name: "Product Documentation",
      color: "#6A0572",
      lastUpdated: "3 days ago",
    },
  ]

  return (
    <div
      className={cn(
        "bg-shadow-slate transition-all duration-300 border-r border-shadow-slate/30",
        isExpanded ? "w-full md:w-72" : "w-16",
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <h2
          className={cn(
            "font-heading text-lg text-white transition-opacity",
            isExpanded ? "opacity-100" : "opacity-0 md:hidden",
          )}
        >
          Masterminds
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-birch-silver hover:text-white hover:bg-luna-navy/20"
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      <div className="px-3 pb-4">
        <Button
          className={cn(
            "w-full bg-blood-sunset hover:bg-blood-sunset/90 text-white justify-start mb-4",
            !isExpanded && "justify-center p-2",
          )}
        >
          <PlusCircle className={cn("h-4 w-4", isExpanded && "mr-2")} />
          {isExpanded && "New Mastermind"}
        </Button>

        <div className="space-y-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={cn(
                "w-full rounded-lg p-3 flex items-center transition-all",
                selectedProject === project.id
                  ? "bg-luna-navy/30 text-white"
                  : "text-birch-silver hover:bg-luna-navy/20 hover:text-white",
                !isExpanded && "justify-center p-2",
              )}
            >
              <div
                className="h-6 w-6 rounded-md flex items-center justify-center"
                style={{ backgroundColor: project.color }}
              >
                <Mountain className="h-4 w-4 text-white" />
              </div>

              {isExpanded && (
                <div className="ml-3 text-left overflow-hidden">
                  <div className="font-medium truncate">{project.name}</div>
                  <div className="text-xs text-birch-silver/70">{project.lastUpdated}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
