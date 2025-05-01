import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react"

export default function AttendanceSummary() {
  // Mock data for attendance summary
  const summary = {
    currentMonth: "May 2025",
    totalWorkDays: 22,
    presentDays: 18,
    absentDays: 1,
    incompleteRecords: 3,
    attendancePercentage: 82,
    averageCheckIn: "09:05",
    averageCheckOut: "17:45",
  }

  return (
    <Card className="bg-white/80 transition-colors duration-500 dark:bg-luna-navy/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-fraunces text-xl text-luna-navy dark:text-mountain-snow">Monthly Summary</CardTitle>
        <CardDescription>{summary.currentMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">Attendance Rate</span>
              <span className="text-sm font-medium">{summary.attendancePercentage}%</span>
            </div>
            <Progress value={summary.attendancePercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-glacier-teal" />
                <span className="text-sm text-slate-500 dark:text-slate-400">Present</span>
              </div>
              <p className="mt-1 text-2xl font-medium">{summary.presentDays}</p>
            </div>

            <div className="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-blood-sunset" />
                <span className="text-sm text-slate-500 dark:text-slate-400">Issues</span>
              </div>
              <p className="mt-1 text-2xl font-medium">{summary.incompleteRecords}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-500 dark:text-slate-400">Avg. Check-in</span>
              </div>
              <span className="text-sm font-medium">{summary.averageCheckIn}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-500 dark:text-slate-400">Avg. Check-out</span>
              </div>
              <span className="text-sm font-medium">{summary.averageCheckOut}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
