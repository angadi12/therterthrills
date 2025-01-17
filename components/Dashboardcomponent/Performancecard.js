import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTheaterAnalytics,
  fetchAllTheaterAnalytics,
} from "@/lib/Redux/dashboardSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
import { Setselectedtheaterid } from "@/lib/Redux/bookingSlice";
import { Spinner } from "@nextui-org/react";
import { color } from "framer-motion";
import DynamicYearSelect from "./Selectyear";

const Performancecard = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.theaterAnalytics
  );
  const { Alldata, Allloading, Allerror } = useSelector(
    (state) => state.theaterAnalytics
  );
  const { Theaterbooking, Selectedtheaterbyid, Theaterloading, Theatererror } =
    useSelector((state) => state.booking);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  // useEffect(() => {
  //   if (branchtheatre?.length > 0) {
  //     dispatch(Setselectedtheaterid(branchtheatre[0]._id));
  //   }
  // }, [branchtheatre, Selectedtheaterbyid, dispatch]);
  useEffect(() => {
    if (Selectedtheaterbyid) {
      if (Selectedtheaterbyid === "all") {
        dispatch(
          fetchAllTheaterAnalytics({
            id: selectedBranchId,
            year: new Date().getFullYear(),
          })
        );
      } else {
        dispatch(fetchTheaterAnalytics({ id: Selectedtheaterbyid }));
      }
    }
  }, [Selectedtheaterbyid, dispatch, selectedBranchId]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(Setselectedtheaterid("all"));
    }
  }, [dispatch, branchtheatre, selectedBranchId]);

  // useEffect(() => {
  //   if (branchtheatreerror === "Something went wrong") {
  //   dispatch(Setselectedtheaterid(" "));

  //   }
  // }, [branchtheatreerror, dispatch]);

  const chartConfig = {
    desktop: {
      label: "totalBookings",
      color: "#F30278",
    },
    mobile: {
      label: "totalRevenue",
      color: "#004AAD",
    },
  };

  return (
    <Card className="rounded-none shadow-none">
      <CardHeader>
        <div className="flex justify-between gap-4 items-center mb-4">
          <h2 className="text-xl font-bold">Performance</h2>
          <div className="flex items-center space-x-4">
            <Select
              onValueChange={(value) => dispatch(Setselectedtheaterid(value))}
              value={Selectedtheaterbyid}
            >
              <SelectTrigger
                id="location-select"
                className="w-60 h-10 flex items-center gap-2"
              >
                <SelectValue placeholder="Select Theater">
                  {branchtheatreloading ? (
                    <Spinner color="danger" size="sm" />
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* {branchtheatre?.find(
                        (theater) => theater?._id === Selectedtheaterbyid
                      )?.name || "Select Theater"} */}

                      {Selectedtheaterbyid === "all"
                        ? "All Theatres"
                        : branchtheatre?.find(
                            (theater) => theater?._id === Selectedtheaterbyid
                          )?.name || "Select Theatre"}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {branchtheatreloading ? (
                  <Spinner color="danger" size="sm" />
                ) : branchtheatre?.length > 0 ? (
                  <>
                    <SelectItem value="all">All Theaters</SelectItem>
                    {branchtheatre.map((theater) => (
                      <SelectItem key={theater?._id} value={theater?._id}>
                        {theater?.name}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <div className="p-1 text-center text-sm ">
                    No theaters available
                  </div>
                )}
              </SelectContent>
            </Select>
            <DynamicYearSelect 
        label="Select Year (Current or Previous)" 
        // onChange={(year) => console.log(`Selected year: ${year}`)}
      />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {branchtheatreerror ? (
          <div className="flex justify-center items-center w-full h-60">
            <p>No theaters </p>
          </div>
        ) : (
          <>
            {loading || Allloading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner color="danger" />
              </div>
            ) : (
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={
                    Selectedtheaterbyid === "all"
                      ? Alldata?.analytics
                      : data?.analytics
                  }
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="totalBookings"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar
                    dataKey="totalRevenue"
                    fill="var(--color-mobile)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
    </Card>
    // <Card className="rounded-none shadow-none">
    //   <CardContent className="p-6">
    //     <div className="flex justify-between items-center mb-4">
    //       <h2 className="text-xl font-bold">Performance</h2>
    //       <div className="flex items-center space-x-4">
    //         <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
    //           <SelectTrigger className="w-[180px]">
    //             <SelectValue placeholder="Select Theatre" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="Silver Theatre">Silver Theatre</SelectItem>
    //             <SelectItem value="Gold Theatre">Gold Theatre</SelectItem>
    //             <SelectItem value="Platinum Theatre">
    //               Platinum Theatre
    //             </SelectItem>
    //           </SelectContent>
    //         </Select>
    //         <Select value={selectedYear} onValueChange={setSelectedYear}>
    //           <SelectTrigger className="w-[100px]">
    //             <SelectValue placeholder="Select Year" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="2024">2024</SelectItem>
    //             <SelectItem value="2023">2023</SelectItem>
    //             <SelectItem value="2022">2022</SelectItem>
    //           </SelectContent>
    //         </Select>

    //         <Card>
    //   <CardHeader>
    //     <CardTitle>Bar Chart - Multiple</CardTitle>
    //     <CardDescription>January - June 2024</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <ChartContainer config={chartConfig}>
    //       <BarChart accessibilityLayer data={chartData}>
    //         <CartesianGrid vertical={false} />
    //         <XAxis
    //           dataKey="month"
    //           tickLine={false}
    //           tickMargin={10}
    //           axisLine={false}
    //           tickFormatter={(value) => value.slice(0, 3)}
    //         />
    //         <ChartTooltip
    //           cursor={false}
    //           content={<ChartTooltipContent indicator="dashed" />}
    //         />
    //         <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    //         <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
    //       </BarChart>
    //     </ChartContainer>
    //   </CardContent>
    //   <CardFooter className="flex-col items-start gap-2 text-sm">
    //     <div className="flex gap-2 font-medium leading-none">
    //       Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    //     </div>
    //     <div className="leading-none text-muted-foreground">
    //       Showing total visitors for the last 6 months
    //     </div>
    //   </CardFooter>
    // </Card>
    //       </div>
    //     </div>
    //     <div className="h-64">
    //       <div className="flex h-full items-end space-x-2">
    //         {chartData.map((data, index) => (
    //           <div key={index} className="flex-1 flex flex-col items-center">
    //             <div
    //               className={`w-full ${
    //                 data.month === "Jun" ? "bg-pink-500" : "bg-[#004AAD]"
    //               }`}
    //               style={{ height: `${data.value}%` }}
    //             ></div>
    //             <span className="text-xs mt-2">{data.month}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default Performancecard;
