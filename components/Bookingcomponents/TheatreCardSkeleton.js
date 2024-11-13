"use client";
import { Skeleton } from "@nextui-org/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function TheatreCardSkeleton() {
  return (
    <Card className="w-full flex flex-col mx-auto justify-around items-center p-0 relative">
      {/* Image Skeleton */}
      <div className="w-full relative p-0 h-48 overflow-hidden">
        <Skeleton className="w-full h-48 object-fill rounded-t-l" />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-400"
            ></div>
          ))}
        </div>
      </div>

      <CardContent className="p-4 w-full">
        {/* Star Rating Skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
            <Skeleton className="ml-2 w-12 h-4" />
          </div>
          <Skeleton className="w-10 h-6" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="w-2/3 h-6 mb-2" />

        {/* Capacity and Decoration Skeleton */}
        <div className="flex gap-2 mb-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-24 h-8 rounded"
            />
          ))}
        </div>

        {/* Theatre Overview Skeleton */}
        <Skeleton className="w-1/3 h-5 mb-2" />
        <div className="flex flex-col gap-2 mb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          ))}
        </div>

        {/* Slot Skeleton */}
        <Skeleton className="w-1/4 h-5 mb-2" />
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full h-8 rounded" />
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col justify-center items-center gap-3 w-full px-4">
        <Skeleton className="w-full h-10 rounded" />
        <Skeleton className="w-1/3 h-4" />
      </CardFooter>
    </Card>
  );
}
