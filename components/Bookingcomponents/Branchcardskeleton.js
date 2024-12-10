import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Branchcardskeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardContent className="space-y-4 pt-6">
        <Skeleton className="aspect-[16/10] w-full rounded-lg" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

