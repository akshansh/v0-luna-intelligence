import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MastermindEditSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden border-glacier-teal/20 shadow-sm bg-white/90 dark:bg-luna-navy/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Name Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Files Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Input Methods Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <div className="flex space-x-2">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </div>
              </div>

              {/* Personality Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-32 w-full" />
              </div>

              {/* User Group Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex justify-between pt-4">
                <Skeleton className="h-10 w-40" />
                <div className="space-x-2 flex">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel Skeleton */}
      <div className="hidden lg:block lg:col-span-1">
        <Card className="border-glacier-teal/20 shadow-sm overflow-hidden bg-white/90 dark:bg-luna-navy/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center space-y-3 py-6">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
