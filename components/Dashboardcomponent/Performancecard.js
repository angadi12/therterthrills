import React, { useState } from "react";
import { Card, CardContent,  CardHeader,
CardFooter,CardDescription,CardTitle} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"

const Performancecard = () => {
    const [selectedTheatre, setSelectedTheatre] = useState('Silver Theatre')
    const [selectedYear, setSelectedYear] = useState('2024')

    const chartData = [
      { "month": "January", "Total Bookings": 186, "Total Revenue": 4000 },
      { month: "February", "Total Bookings": 305, "Total Revenue": 4200 },
      { month: "March", "Total Bookings": 237, "Total Revenue": 2120 },
      { month: "April", "Total Bookings": 73, "Total Revenue": 4190 },
      { month: "May", "Total Bookings": 209, "Total Revenue": 3130 },
      { month: "June", "Total Bookings": 214, "Total Revenue": 5140 },
    ]

    const chartConfig = {
      desktop: {
        label: "Total Bookings",
        color: "#F30278",
      },
      mobile: {
        label: "Total Revenue",
        color: "#004AAD",
      },
    } 

  return (
    <Card className="rounded-none shadow-none">
    <CardHeader>
    <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold">Performance</h2>
           <div className="flex items-center space-x-4">
             <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
               <SelectTrigger className="w-[180px]">
                 <SelectValue placeholder="Select Theatre" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="Silver Theatre">Silver Theatre</SelectItem>
                 <SelectItem value="Gold Theatre">Gold Theatre</SelectItem>
                 <SelectItem value="Platinum Theatre">
                   Platinum Theatre
                 </SelectItem>
               </SelectContent>
             </Select>
             <Select value={selectedYear} onValueChange={setSelectedYear}>
               <SelectTrigger className="w-[100px]">
                 <SelectValue placeholder="Select Year" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="2024">2024</SelectItem>
                 <SelectItem value="2023">2023</SelectItem>
                 <SelectItem value="2022">2022</SelectItem>
               </SelectContent>
             </Select>
    </div>
    </div>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
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
          <Bar dataKey="Total Bookings" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="Total Revenue" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
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
