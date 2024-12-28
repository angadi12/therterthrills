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
import { Spinner } from "@nextui-org/react";
import {
  fetchtheaterbybranchid,
  setHourlytheaterid,
} from "@/lib/Redux/theaterSlice";
import { useEffect } from "react";
// Sample data for all 24 hours
const sampleData = {
  theater: "Jasmine Theatre",
  date: "2024-12-01",
  analytics: [
    { hour: "00:00 - 01:00", totalBookings: 2, totalRevenue: 0 },
    { hour: "01:00 - 02:00", totalBookings: 2, totalRevenue: 4598 },
    { hour: "02:00 - 03:00", totalBookings: 1, totalRevenue: 2299 },
    { hour: "03:00 - 04:00", totalBookings: 0, totalRevenue: 0 },
    { hour: "04:00 - 05:00", totalBookings: 0, totalRevenue: 0 },
    { hour: "05:00 - 06:00", totalBookings: 1, totalRevenue: 2299 },
    { hour: "06:00 - 07:00", totalBookings: 3, totalRevenue: 6897 },
    { hour: "07:00 - 08:00", totalBookings: 5, totalRevenue: 11495 },
    { hour: "08:00 - 09:00", totalBookings: 8, totalRevenue: 18392 },
    { hour: "09:00 - 10:00", totalBookings: 12, totalRevenue: 27588 },
    { hour: "10:00 - 11:00", totalBookings: 15, totalRevenue: 34485 },
    { hour: "11:00 - 12:00", totalBookings: 20, totalRevenue: 45980 },
    { hour: "12:00 - 13:00", totalBookings: 25, totalRevenue: 57475 },
    { hour: "13:00 - 14:00", totalBookings: 30, totalRevenue: 68970 },
    { hour: "14:00 - 15:00", totalBookings: 28, totalRevenue: 64372 },
    { hour: "15:00 - 16:00", totalBookings: 22, totalRevenue: 50578 },
    { hour: "16:00 - 17:00", totalBookings: 18, totalRevenue: 41382 },
    { hour: "17:00 - 18:00", totalBookings: 15, totalRevenue: 34485 },
    { hour: "18:00 - 19:00", totalBookings: 20, totalRevenue: 45980 },
    { hour: "19:00 - 20:00", totalBookings: 25, totalRevenue: 57475 },
    { hour: "20:00 - 21:00", totalBookings: 30, totalRevenue: 68970 },
    { hour: "21:00 - 22:00", totalBookings: 20, totalRevenue: 45980 },
    { hour: "22:00 - 23:00", totalBookings: 10, totalRevenue: 22990 },
    { hour: "23:00 - 00:00", totalBookings: 5, totalRevenue: 11495 },
  ],
};

export default function HourlyAnalyticsChart() {
  const dispatch = useDispatch();
  const { selectedBranchId } = useSelector((state) => state.branches);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { Hourlytheaterid } = useSelector((state) => state.theater);

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

  console.log(Hourlytheaterid)

  return (
    <Card className="w-full rounded-none shadow-none ">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle>{sampleData.theater} - 24-Hour Analytics</CardTitle>
            <CardDescription>
              Bookings and Revenue for {sampleData.date}
            </CardDescription>
          </div>
          <div>
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
        <ChartContainer
          config={{
            totalBookings: {
              label: "Total Bookings",
              color: "hsl(var(--chart-1))",
            },
            totalRevenue: {
              label: "Total Revenue",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[60vh] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={sampleData.analytics}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
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
                formatter={(value, name) => [
                  name === "totalRevenue" ? `₹${value}` : value,
                  name === "totalRevenue" ? "Total Revenue" : "Total Bookings",
                ]}
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
      </CardContent>
    </Card>
  );
}
