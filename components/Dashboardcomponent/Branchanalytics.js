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

 console.log(branchDataerror)

  return (
    <>
      {branchDataloading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner color="danger" />
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
                    {branchData?.length>0 && branchData?.map((branch, index) => (
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
