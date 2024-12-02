"use client";

import { Card, CardContent } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import Totalbookicon from "@/public/asset/Totalbookicon.png";
import Pendingbookicon from "@/public/asset/Pendingbookicon.png";
import Completedicon from "@/public/asset/Completedicon.png";
import Image from "next/image";
import Performancecard from "@/components/Dashboardcomponent/Performancecard";
import Branchanalytics from "@/components/Dashboardcomponent/Branchanalytics";
import Upcomingevents from "@/components/Dashboardcomponent/Upcomingevents";
import Newbooking from "@/components/Dashboardcomponent/Newbooking";

export default function BookingDashboard() {
  return (
    <ScrollArea className="p-4 bg-gray-100 ">
      <div className="w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Overall Status</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#004AAD] text-white rounded-sm flex justify-start items-center ">
            <CardContent className="flex  items-center p-6 ">
              <div className="rounded-full bg-white p-3 mr-4 flex justify-center items-center">
                <Image
                  src={Totalbookicon}
                  alt="totalbook"
                  className="object-contain h-6 w-6"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#004AAD] text-white rounded-sm flex justify-start items-center ">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-white p-3 mr-4 flex justify-center items-center">
                <Image
                  src={Pendingbookicon}
                  alt="Pendingbookicon"
                  className="object-contain h-6 w-6"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Pending Bookings</p>
                <p className="text-3xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#004AAD] text-white rounded-sm flex justify-start items-center ">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-white p-3 mr-4 flex justify-center items-center">
                <Image
                  src={Completedicon}
                  alt="Completedicon"
                  className="object-contain h-6 w-6"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Completed Bookings</p>
                <p className="text-3xl font-bold">44</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Branchanalytics />

          <Performancecard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Upcomingevents />
          <Newbooking />
        </div>
      </div>
    </ScrollArea>
  );
}
