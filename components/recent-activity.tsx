import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for recent activity
const recentActivities = [
  {
    date: "Today",
    time: "09:02",
    action: "Check-in",
    status: "success",
  },
  {
    date: "Yesterday",
    time: "17:45",
    action: "Check-out",
    status: "success",
  },
  {
    date: "Yesterday",
    time: "09:10",
    action: "Check-in",
    status: "success",
  },
  {
    date: "May 6, 2025",
    time: "--:--",
    action: "Missing check-out",
    status: "error",
  },
  {
    date: "May 5, 2025",
    time: "18:05",
    action: "Check-out",
    status: "success",
  },
]

export default function RecentActivity() {
  return (
    <Card className="bg-white/80 transition-colors duration-500 dark:bg-luna-navy/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-fraunces text-xl text-luna-navy dark:text-mountain-snow">Recent Activity</CardTitle>
        <CardDescription>Your latest attendance records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800"
            >
              <div className="flex items-start">
                <div
                  className={cn(
                    "mr-3 mt-0.5 rounded-full p-1.5",
                    activity.status === "success"
                      ? "bg-glacier-teal/10 text-glacier-teal"
                      : "bg-blood-sunset/10 text-blood-sunset",
                  )}
                >
                  {activity.status === "success" ? (
                    <Clock className="h-3.5 w-3.5" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "text-sm font-medium",
                    activity.status === "success" ? "text-slate-700 dark:text-slate-300" : "text-blood-sunset",
                  )}
                >
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
