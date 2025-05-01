import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CalendarIcon } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { TimeProvider } from "@/components/time-provider"

export const metadata: Metadata = {
  title: "Luna Attendance | Discrepancies",
  description: "View and resolve attendance discrepancies",
}

// Mock data for discrepancies
const discrepancies = [
  {
    id: "disc-001",
    date: "May 6, 2025",
    type: "missing-checkout",
    description: "Check-out record missing",
    checkIn: "09:05",
    checkOut: null,
  },
  {
    id: "disc-002",
    date: "May 8, 2025",
    type: "missing-checkin",
    description: "Check-in record missing",
    checkIn: null,
    checkOut: "17:45",
  },
  {
    id: "disc-003",
    date: "April 29, 2025",
    type: "missing-checkout",
    description: "Check-out record missing",
    checkIn: "08:55",
    checkOut: null,
  },
]

export default function DiscrepanciesPage() {
  return (
    <ThemeProvider>
      <TimeProvider>
        <main className="min-h-screen bg-gradient-to-b from-mountain-snow to-mountain-snow/80 dark:from-luna-navy dark:to-luna-navy/90">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="font-fraunces text-3xl font-bold text-luna-navy dark:text-mountain-snow md:text-4xl">
                Attendance Discrepancies
              </h1>
              <p className="mt-2 font-nunito text-slate-600 dark:text-slate-300">
                Review and resolve issues with your attendance records
              </p>
            </div>

            <div className="grid gap-6">
              {discrepancies.length === 0 ? (
                <Card className="bg-white/80 p-8 text-center dark:bg-luna-navy/50">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                    <CalendarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mt-4 font-fraunces text-lg font-medium text-luna-navy dark:text-mountain-snow">
                    No Discrepancies Found
                  </h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Your attendance records are complete and up to date.
                  </p>
                </Card>
              ) : (
                discrepancies.map((discrepancy) => (
                  <Card
                    key={discrepancy.id}
                    className="bg-white/80 transition-colors duration-500 dark:bg-luna-navy/50"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5 text-blood-sunset" />
                          <CardTitle className="font-fraunces text-xl text-luna-navy dark:text-mountain-snow">
                            {discrepancy.date}
                          </CardTitle>
                        </div>
                        <span className="rounded-full bg-blood-sunset/10 px-3 py-1 text-xs font-medium text-blood-sunset">
                          {discrepancy.type === "missing-checkin" ? "Missing Check-in" : "Missing Check-out"}
                        </span>
                      </div>
                      <CardDescription>{discrepancy.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">Check-in</span>
                          </div>
                          <p className="mt-1 text-lg font-medium">
                            {discrepancy.checkIn || <span className="text-blood-sunset">Missing</span>}
                          </p>
                        </div>

                        <div className="rounded-lg border border-slate-100 p-4 dark:border-slate-800">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">Check-out</span>
                          </div>
                          <p className="mt-1 text-lg font-medium">
                            {discrepancy.checkOut || <span className="text-blood-sunset">Missing</span>}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline">Explain Absence</Button>
                        <Button>Fix Record</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </TimeProvider>
    </ThemeProvider>
  )
}
