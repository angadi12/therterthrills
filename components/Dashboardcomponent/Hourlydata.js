"use client";

import {
  Bar,
  Line,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MapPin } from "lucide-react";
import { format, isBefore, startOfToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import { Spinner } from "@nextui-org/react";
import {
  fetchtheaterbybranchid,
  setHourlytheaterid,
} from "@/lib/Redux/theaterSlice";
import { useEffect, useState } from "react";
import {
  fetchAllHourlyTheaterAnalytics,
  fetchHourlyTheaterAnalytics,
  setHourlydate,
} from "@/lib/Redux/dashboardSlice";

export default function HourlyAnalyticsChart() {
  const dispatch = useDispatch();
  const { selectedBranchId } = useSelector((state) => state.branches);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { Hourlytheaterid } = useSelector((state) => state.theater);
  const { Hourlydata, Hourlyloading, Hourlyerror, Hourlydate } = useSelector(
    (state) => state.theaterAnalytics
  );
  const { AllHourlydata, AllHourlyloading, AllHourlyerror } = useSelector(
    (state) => state.theaterAnalytics
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  const formattedDate =
    Hourlydate && !isNaN(new Date(Hourlydate))
      ? format(new Date(Hourlydate), "yyyy-MM-dd")
      : null;

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(setHourlytheaterid("all"));
    }
  }, [dispatch, branchtheatre, selectedBranchId]);

  useEffect(() => {
    if (Hourlytheaterid) {
      if (Hourlytheaterid === "all") {
        dispatch(
          fetchAllHourlyTheaterAnalytics({
            id: selectedBranchId,
            date: formattedDate,
          })
        );
      } else {
        dispatch(
          fetchHourlyTheaterAnalytics({
            id: Hourlytheaterid,
            date: formattedDate,
          })
        );
      }
    }
  }, [Hourlytheaterid, dispatch, selectedBranchId, Hourlydate]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(setHourlytheaterid("all"));
    }
  }, [dispatch, branchtheatre, selectedBranchId]);

  const handleDateSelect = (selectedDate) => {
    dispatch(setHourlydate(selectedDate?.toISOString()));
    setPopoverOpen(false);
  };

  const nameMapping = {
    totalRevenue: "Total Revenue ₹",
    totalBookings: "Total Bookings",
  };
  return (
    <Card className="w-full rounded-none shadow-none ">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle>
              {" "}
              {Hourlytheaterid === "all"
                ? "All Theaters"
                : branchtheatre?.find(
                    (theater) => theater?._id === Hourlytheaterid
                  )?.name}{" "}
              - 24-Hour Analytics
            </CardTitle>
            <CardDescription>
              Bookings and Revenue for {formattedDate}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div>
              {/* <label
            htmlFor="date-picker"
            className="block text-sm font-medium  text-[#F30278] mb-1"
          >
            Choose Date
          </label> */}
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => setPopoverOpen(!popoverOpen)}
                    variant={"outline"}
                    className={`md:w-auto h-10 justify-start text-left font-normal ${
                      !Hourlydate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#F30278]" />
                    {Hourlydate ? (
                      format(Hourlydate, "PPP")
                    ) : (
                      <span>Choose Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="md:w-[400px] w-full mx-auto p-0 ">
                  <Calendar
                    className={""}
                    mode="single"
                    selected={Hourlydate ? new Date(Hourlydate) : null} // Ensure `date` is passed as a Date object
                    onSelect={handleDateSelect}
                    // disabled={isPastDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                onValueChange={(value) => dispatch(setHourlytheaterid(value))}
                value={Hourlytheaterid}
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
                        (theater) => theater?._id === Hourlytheaterid
                      )?.name || "Select Theater"} */}

                        {Hourlytheaterid === "all"
                          ? "All Theaters"
                          : branchtheatre?.find(
                              (theater) => theater?._id === Hourlytheaterid
                            )?.name || "Select Theater"}
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
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {Hourlyerror || AllHourlyerror ? (
          <div className="flex justify-center items-center w-full h-60">
            <p>No theaters </p>
          </div>
        ) : (
          <>
            {Hourlyloading || AllHourlyloading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner color="danger" />
              </div>
            ) : (
              <ChartContainer
                config={{
                  totalBookings: {
                    label: "TotalBookings",
                    color: "hsl(var(--chart-1))",
                  },
                  totalRevenue: {
                    label: "TotalRevenue",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[60vh] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={
                      Hourlytheaterid === "all"
                        ? AllHourlydata?.analytics
                        : Hourlydata?.analytics
                    }
                    margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="hour"
                      tick={{ fontSize: 10, angle: -45, textAnchor: "end" }}
                      interval={0}
                      height={60}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tick={{ fontSize: 12 }}
                      label={{
                        value: "Total Bookings",
                        angle: -90,
                        position: "insideLeft",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      label={{
                        value: "Total Revenue (₹)",
                        angle: 90,
                        position: "insideRight",
                        offset: 5,
                      }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        const displayName = nameMapping[name] || name;
                        return [`${value}`, displayName]; // Format correctly based on your logic
                      }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar
                      dataKey="totalBookings"
                      fill="#004AAD"
                      yAxisId="left"
                      name="Total Bookings"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalRevenue"
                      stroke="#F30278"
                      yAxisId="right"
                      name="Total Revenue"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
