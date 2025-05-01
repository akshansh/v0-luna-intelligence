import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { TimeProvider } from "@/components/time-provider"
import Sidebar from "@/components/sidebar"
import AttendanceCalendar from "@/components/attendance-calendar"
import TasksList from "@/components/tasks-list"

export const metadata: Metadata = {
  title: "Luna Attendance",
  description: "Employee attendance management system",
}

export default function Dashboard() {
  return (
    <ThemeProvider>
      <TimeProvider>
        <div className="flex h-screen bg-mountain-snow dark:bg-luna-navy">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-14 items-center border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-luna-navy/50">
              <div className="flex items-center space-x-4">
                <h1 className="font-fraunces text-xl font-semibold text-luna-navy dark:text-mountain-snow">
                  Attendance Calendar
                </h1>
                <div className="flex items-center space-x-1 rounded-md bg-slate-100 p-1 dark:bg-slate-800">
                  <button className="rounded-sm bg-white px-3 py-1.5 text-sm font-medium shadow-sm dark:bg-glacier-teal dark:text-white">
                    Calendar
                  </button>
                  <button className="rounded-sm px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                    Board
                  </button>
                  <button className="rounded-sm px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                    Timeline
                  </button>
                </div>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <button className="rounded-md bg-glacier-teal px-3 py-1.5 text-sm font-medium text-white hover:bg-glacier-teal/90">
                  + Add Record
                </button>
              </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
              <AttendanceCalendar />
              <TasksList />
            </div>
          </div>
        </div>
      </TimeProvider>
    </ThemeProvider>
  )
}
