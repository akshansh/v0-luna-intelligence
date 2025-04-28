"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Sunrise, Sunset, RotateCcw, Clock } from "lucide-react"
import { useTime, type TimeOfDay } from "@/components/time-provider"
import { cn } from "@/lib/utils"

export function TimeSlider() {
  const { timePercentage, setManualTime, isManualMode, timeOfDay, isDarkMode } = useTime()
  const [sliderValue, setSliderValue] = useState(timePercentage)
  const [isOpen, setIsOpen] = useState(false)

  // Update slider when time changes externally
  useEffect(() => {
    if (!isManualMode) {
      setSliderValue(timePercentage)
    }
  }, [timePercentage, isManualMode])

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0]
    setSliderValue(newValue)
    setManualTime(newValue)
  }

  const resetToRealTime = () => {
    setManualTime(null)
  }

  const getTimeIcon = (time: TimeOfDay) => {
    const iconClass = isDarkMode ? "text-white" : "text-gray-800"

    switch (time) {
      case "dawn":
        return <Sunrise className={`h-4 w-4 ${iconClass}`} />
      case "day":
        return <Sun className={`h-4 w-4 ${iconClass}`} />
      case "dusk":
        return <Sunset className={`h-4 w-4 ${iconClass}`} />
      case "night":
        return <Moon className={`h-4 w-4 ${iconClass}`} />
    }
  }

  // Determine which time period the slider is in
  const getSliderTimeOfDay = (value: number): TimeOfDay => {
    if (value >= 5 && value < 25) {
      return "dawn"
    } else if (value >= 25 && value < 70) {
      return "day"
    } else if (value >= 70 && value < 85) {
      return "dusk"
    } else {
      return "night"
    }
  }

  const sliderTimeOfDay = getSliderTimeOfDay(sliderValue)

  // Get background gradient based on slider position
  const getBackgroundStyle = () => {
    const colors = {
      dawn: "from-[#5EEAD4] to-[#0E7490]",
      day: "from-[#17A2B8] to-[#0E7490]",
      dusk: "from-[#0E7490] to-[#134E4A]",
      night: "from-[#0F766E] to-[#134E4A]",
    }

    return colors[sliderTimeOfDay]
  }

  // Get text color for the slider time
  const sliderTimeTextClass = isDarkMode ? "text-white" : "text-gray-800"

  // Get container background based on time of day
  const controllerBg = isDarkMode
    ? "bg-gray-800/80 backdrop-blur-md border-white/10"
    : "bg-white/80 backdrop-blur-md border-gray-200"

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={cn(
          "border rounded-lg p-4 shadow-lg transition-all duration-300 time-transition",
          isOpen ? "w-64" : "w-12",
          controllerBg,
        )}
      >
        {isOpen ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${sliderTimeTextClass}`}>Time Control</h3>
              <Button
                variant="ghost"
                size="icon"
                className={`h-6 w-6 text-adaptive hover:text-adaptive bg-adaptive-hover`}
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close</span>×
              </Button>
            </div>

            <div className="relative pt-6">
              <div
                className={`absolute top-0 left-0 right-0 flex justify-between px-1 text-xs text-adaptive-secondary`}
              >
                <span>Dawn</span>
                <span>Day</span>
                <span>Dusk</span>
                <span>Night</span>
              </div>

              <div
                className={cn("h-12 rounded-md mb-2 bg-gradient-to-r p-1 flex items-center", getBackgroundStyle())}
                style={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div className="w-full">
                  <Slider
                    value={[sliderValue]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleSliderChange}
                    className="pt-3"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className={`flex items-center space-x-2 bg-white/10 p-1 px-2 rounded-md ${sliderTimeTextClass}`}>
                  {getTimeIcon(sliderTimeOfDay)}
                  <span className="text-sm capitalize">{sliderTimeOfDay}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className={`h-7 text-xs border-adaptive text-adaptive-secondary bg-adaptive-hover hover:text-adaptive`}
                  onClick={resetToRealTime}
                  disabled={!isManualMode}
                >
                  <RotateCcw className={`h-3 w-3 mr-1 icon-adaptive`} />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 text-adaptive-secondary hover:text-adaptive`}
            onClick={() => setIsOpen(true)}
          >
            {isManualMode ? (
              <div className="relative">
                {getTimeIcon(timeOfDay)}
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-[rgb(var(--time-primary))] rounded-full"></span>
              </div>
            ) : (
              <Clock className={`h-4 w-4 icon-adaptive`} />
            )}
            <span className="sr-only">Open time control</span>
          </Button>
        )}
      </div>
    </div>
  )
}
