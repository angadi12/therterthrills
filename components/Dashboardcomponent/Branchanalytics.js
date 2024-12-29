import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchesanalytics } from "@/lib/Redux/BranchSlice";
import { Spinner } from "@nextui-org/react";
import { Skeleton } from "@/components/ui/skeleton";

const Branchanalytics = () => {
  const dispatch = useDispatch();
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { branchData, branchDataloading, branchDataerror } = useSelector(
    (state) => state.branches
  );

  useEffect(() => {
    dispatch(fetchBranchesanalytics());
  }, [dispatch]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);


  return (
    <>
      {branchDataloading ? (
        <div className="space-y-4 ring-1 ring-gray-200 p-4 bg-white">
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
      ) : (
        <>
          {branchDataerror ? (
            <p>Error while fetching data</p>
          ) : (
            <Card className="rounded-none shadow-none relative">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Our Branches</h2>
                  <span className="text-green-500 font-medium">Live</span>
                </div>
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "start",
                  }}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {branchData?.length > 0 &&
                      (branchData ?? [])?.map((branch, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3"
                        >
                          <div className="p-4 border rounded-lg">
                            <div className="w-12 h-12 bg-[#004AAD] rounded-full flex items-center justify-center mb-4">
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-medium mb-2">
                              {branch?.branchDetails?.Branchname}
                            </h3>
                            <div className="flex justify-between text-tiny">
                              <span>Theater</span>
                              <span>Bookings</span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <span>{branch?.totalTheaters}</span>
                              <span>{branch?.totalBookings}</span>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <div className="absolute transform -translate-x-1/2 -bottom-20 -translate-y-1/2 left-1/2 flex justify-between items-center ">
                    <CarouselPrevious className="" />
                    <CarouselNext className="" />
                  </div>
                </Carousel>
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: count }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === current ? "bg-[#004AAD]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default Branchanalytics;
