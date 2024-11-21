import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSummarySkeleton() {
  return (
    <div className="bg-white p-4 rounded-md shadow ring-1 ring-gray-300 flex flex-col w-full items-start">
      <h2 className="text-xl font-semibold mb-4">
        <Skeleton className="h-6 w-1/2" />
      </h2>

      <CardContent className="py-2 h-auto flex flex-col items-center w-full justify-between ">
        <div className="space-y-8 w-full flex flex-col">
          <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>

        <div className="w-full flex flex-col mt-12 gap-4 ">
          <div className="bg-pink-500 p-2 rounded-md w-full">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </CardContent>
    </div>
  );
}
