"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useTimeOfDay } from "./time-provider"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for attendance records
const mockAttendanceData = {
  "2025-05-01": { checkIn: "09:05", checkOut: "17:30", status: "complete", color: "bg-green-500" },
  "2025-05-02": { checkIn: "08:55", checkOut: "17:15", status: "complete", color: "bg-green-500" },
  "2025-05-03": { checkIn: "09:10", checkOut: "18:00", status: "complete", color: "bg-green-500" },
  "2025-05-06": { checkIn: "09:00", checkOut: null, status: "incomplete", color: "bg-red-500" },
  "2025-05-08": { checkIn: null, checkOut: "17:45", status: "incomplete", color: "bg-red-500" },
  "2025-05-11": { checkIn: "09:15", checkOut: "17:30", status: "complete", color: "bg-green-500" },
  "2025-05-12": { checkIn: "09:00", checkOut: "17:00", status: "complete", color: "bg-green-500" },
  "2025-05-13": { checkIn: "08:45", checkOut: "16:30", status: "complete", color: "bg-green-500" },
  "2025-05-15": { checkIn: "09:30", checkOut: null, status: "incomplete", color: "bg-red-500" },
  "2025-05-18": { checkIn: "09:00", checkOut: "17:15", status: "complete", color: "bg-green-500" },
  "2025-05-20": { checkIn: "08:50", checkOut: "17:45", status: "complete", color: "bg-green-500" },
  "2025-05-22": { checkIn: "09:10", checkOut: "18:00", status: "complete", color: "bg-green-500" },
  "2025-05-25": { checkIn: "09:05", checkOut: "17:30", status: "complete", color: "bg-green-500" },
  "2025-05-27": { checkIn: "09:20", checkOut: null, status: "incomplete", color: "bg-red-500" },
  "2025-05-29": { checkIn: null, checkOut: "16:45", status: "incomplete", color: "bg-red-500" },
}

// Mock data for tasks
const mockTasks = [
  {
    id: "task-1",
    title: "Update contractor agreement",
    date: "2025-05-01",
    color: "bg-green-500",
  },
  {
    id: "task-2",
    title: "How to manage event planning",
    date: "2025-05-03",
    color: "bg-indigo-500",
  },
  {
    id: "task-3",
    title: "Plan for next year",
    date: "2025-05-03",
    color: "bg-blue-500",
  },
  {
    id: "task-4",
    title: "Finalize project scope",
    date: "2025-05-10",
    color: "bg-red-500",
  },
  {
    id: "task-5",
    title: "Resource allocation",
    date: "2025-05-15",
    color: "bg-red-500",
  },
  {
    id: "task-6",
    title: "Refresh company website",
    date: "2025-05-12",
    color: "bg-green-500",
  },
  {
    id: "task-7",
    title: "Update key objectives",
    date: "2025-05-20",
    color: "bg-yellow-500",
  },
]

export default function AttendanceCalendar() {
  const { timeOfDay } = useTimeOfDay()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false)
  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false)

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Generate calendar days
  const days = []
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Format date for lookup in mock data
  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  // Get tasks for a specific day
  const getTasksForDay = (day: number) => {
    const date = formatDate(day)
    return mockTasks.filter((task) => task.date === date)
  }

  // Get attendance record for a specific day
  const getAttendanceForDay = (day: number) => {
    const date = formatDate(day)
    return mockAttendanceData[date]
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  // Get formatted date string for lookup in mock data
  const getFormattedDate = (date?: Date) => {
    if (!date) return ""
    return date.toISOString().split("T")[0]
  }

  const selectedDateFormatted = getFormattedDate(selectedDate)
  const selectedDayData = selectedDateFormatted
    ? (mockAttendanceData as any)[selectedDateFormatted] || { status: "no-record" }
    : { status: "no-record" }

  // Determine if today
  const isToday = selectedDate?.toDateString() === new Date().toDateString()

  // Function to render day contents with status indicators
  const renderDay = (day: Date) => {
    const dateStr = getFormattedDate(day)
    const dayData = (mockAttendanceData as any)[dateStr]

    if (!dayData) return null

    return (
      <div className="relative h-full w-full">
        {dayData.status === "incomplete" && (
          <AlertCircle
            className="absolute right-0 top-0 h-3 w-3 text-blood-sunset"
            aria-label="Incomplete attendance record"
          />
        )}
        {dayData.status === "complete" && (
          <CheckCircle2
            className="absolute right-0 top-0 h-3 w-3 text-glacier-teal"
            aria-label="Complete attendance record"
          />
        )}
      </div>
    )
  }

  // Get background color based on time of day
  const getBackgroundColor = () => {
    switch (timeOfDay) {
      case "dawn":
        return "bg-amber-50 dark:bg-luna-navy/90"
      case "day":
        return "bg-white dark:bg-luna-navy/80"
      case "dusk":
        return "bg-rose-50 dark:bg-luna-navy/90"
      case "night":
        return "bg-slate-100 dark:bg-luna-navy"
    }
  }

  // Day names
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="rounded-md p-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="font-fraunces text-xl font-semibold text-luna-navy dark:text-mountain-snow">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <button
            onClick={nextMonth}
            className="rounded-md p-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            Today
          </button>
          <button className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            Month
          </button>
        </div>
      </div>

      <div className={cn("rounded-lg border border-slate-200 dark:border-slate-800", getBackgroundColor())}>
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="border-r border-slate-200 p-2 text-center text-sm font-medium text-slate-600 last:border-r-0 dark:border-slate-800 dark:text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="border-r border-b border-slate-200 dark:border-slate-800" />
            }

            const dateStr = formatDate(day)
            const isToday = new Date().toDateString() === new Date(dateStr).toDateString()
            const attendance = getAttendanceForDay(day)
            const tasks = getTasksForDay(day)

            return (
              <div
                key={`day-${day}`}
                className={cn(
                  "min-h-[100px] border-r border-b border-slate-200 p-1 last:border-r-0 dark:border-slate-800",
                  isToday && "bg-blue-50 dark:bg-blue-900/20",
                )}
              >
                <div className="flex justify-between p-1">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                      isToday ? "bg-glacier-teal text-white" : "text-slate-600 dark:text-slate-400",
                    )}
                  >
                    {day}
                  </span>
                  {attendance && (
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        attendance.status === "complete" ? "bg-green-500" : "bg-red-500",
                      )}
                    />
                  )}
                </div>

                <div className="mt-1 space-y-1">
                  {attendance && (
                    <div
                      className={cn(
                        "rounded px-2 py-1 text-xs font-medium text-white",
                        attendance.status === "complete" ? "bg-green-500" : "bg-red-500",
                      )}
                    >
                      {attendance.checkIn && !attendance.checkOut && "Missing Check-out"}
                      {!attendance.checkIn && attendance.checkOut && "Missing Check-in"}
                      {attendance.checkIn && attendance.checkOut && `${attendance.checkIn} - ${attendance.checkOut}`}
                    </div>
                  )}

                  {tasks.map((task) => (
                    <div key={task.id} className={cn("rounded px-2 py-1 text-xs font-medium text-white", task.color)}>
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
