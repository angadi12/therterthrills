import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 r">
      {/* Stats Section Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-24 mt-2" />
            <Skeleton className="h-6 w-12 mt-1" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-4 ring-1 ring-gray-200 p-4">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-4 min-w-[200px]">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-24 mt-4" />
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-8 mt-1" />
                    </div>
                    <div>
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-8 mt-1" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" />
            <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" />
          </div>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-2 w-2 rounded-full" />
            ))}
          </div>
        </div>
        <Card className="p-4 ring-1 ring-gray-200 rounded-none shadow-none">
          <div className="flex justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <div className="h-[300px] flex items-end justify-between gap-2">
            {[...Array(12)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-full rounded-t"
                style={{ height: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="p-4 ring-1 ring-gray-200 rounded-none shadow-none">
          <div className="flex justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </Card>

        <Card className="p-4 ring-1 ring-gray-200 rounded-none shadow-none">
          <div className="flex justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          ))}
          <div className="mt-4 flex justify-center">
            <Skeleton className="h-8 w-24" />
          </div>
        </Card>
      </div>
    </div>
  );
}
