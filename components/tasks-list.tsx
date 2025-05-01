import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

// Mock data for tasks
const tasks = [
  {
    id: "task-1",
    title: "Plan for upcoming event",
    color: "bg-blue-500",
    category: "Planning",
  },
  {
    id: "task-2",
    title: "Revise new agreement",
    color: "bg-red-500",
    category: "Legal",
  },
  {
    id: "task-3",
    title: "Finish onboarding new staff",
    color: "bg-yellow-500",
    category: "HR",
  },
  {
    id: "task-4",
    title: "Review attendance discrepancies",
    color: "bg-red-500",
    category: "Attendance",
  },
  {
    id: "task-5",
    title: "Update employee profiles",
    color: "bg-green-500",
    category: "HR",
  },
]

export default function TasksList() {
  return (
    <div className="w-80 border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-luna-navy/50">
      <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
        <h2 className="font-fraunces text-lg font-semibold text-luna-navy dark:text-mountain-snow">Tasks</h2>
        <button className="rounded-md p-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <Search className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Unscheduled</h3>
          <button className="text-xs text-glacier-teal hover:underline">Hide</button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start rounded-md border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
            >
              <div className={cn("mr-2 mt-1 h-3 w-3 rounded-full", task.color)} />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900 dark:text-white">{task.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{task.category}</div>
              </div>
              <button className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Planning</span>
          </div>
          <div className="mb-2 flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Legal & Attendance</span>
          </div>
          <div className="mb-2 flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">HR</span>
          </div>
          <div className="mb-2 flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Complete</span>
          </div>
        </div>
      </div>
    </div>
  )
}
