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
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches, fetchBranchsummary } from "@/lib/Redux/BranchSlice";
import { useEffect, useState } from "react";
import DashboardSkeleton from "@/components/Dashboardcomponent/Dashboardskeleton";
import HourlyAnalyticsChart from "@/components/Dashboardcomponent/Hourlydata";

export default function BookingDashboard() {
  const dispatch = useDispatch();
  const { selectedBranchId } = useSelector((state) => state.branches);
  const { branchSummaryData, branchSummaryloading, branchSummaryerror } =
    useSelector((state) => state.branches);
  const { status } = useSelector((state) => state.branches);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBranches()).then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchBranchsummary(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  if (status === "loading") {
    return <DashboardSkeleton />;
  }


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
                <p className="text-sm font-medium">Active Bookings</p>
                {branchSummaryerror ? (
                  <p className="text-sm">failed to fetch</p>
                ) : (
                  <p className="text-3xl font-bold">
                    {Array.isArray(branchSummaryData) &&
                    branchSummaryData.length > 0
                      ? branchSummaryData[0]?.activeBookings || 0
                      : 0}
                  </p>
                )}
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
                <p className="text-sm font-medium">Upcoming Bookings</p>
                {branchSummaryerror ? (
                  <p className="text-sm">failed to fetch</p>
                ) : (
                  <p className="text-3xl font-bold">
                    {branchSummaryData[0]?.upcomingBookings || 0}
                  </p>
                )}
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
                {branchSummaryerror ? (
                  <p className="text-sm">failed to fetch</p>
                ) : (
                  <p className="text-3xl font-bold">
                    {branchSummaryData[0]?.completedBookings || 0}
                  </p>
                )}{" "}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
          <HourlyAnalyticsChart />
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
