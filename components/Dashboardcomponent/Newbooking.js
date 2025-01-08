import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Clock, ChevronRightIcon } from "lucide-react";
import { Button, Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingByTheaterId,
} from "@/lib/Redux/bookingSlice";
import {
  fetchtheaterbybranchid,
  setActivetheatreid,
} from "@/lib/Redux/theaterSlice";
import { useRouter } from "next/navigation";

import Birthdayicon from "@/public/asset/Birthdayicon.png";
import GlassWater from "@/public/asset/GlassWater.png";
import Users1 from "@/public/asset/Users.png";
import PartyPopper from "@/public/asset/PartyPopper.png";
import BabyIcon from "@/public/asset/BabyIcon.png";
import HeartHandshake from "@/public/asset/HeartHandshake.png";
import Heart from "@/public/asset/Heart.png";
import Briefcase from "@/public/asset/Briefcase.png";
import Bridetobe from "@/public/asset/Bridetobe.png";
import Gromtobe from "@/public/asset/Gromtobe.png";
import Momtobe from "@/public/asset/Momtobe.png";
import Loveproposal from "@/public/asset/Loveproposal.png";
import Congratulations from "@/public/asset/Congratulations.png";
import Image from "next/image";
import { Getbookingbytheaterid,GetbookingbyBranchid } from "@/lib/API/Booking";
import { ScrollArea } from "@/components/ui/scroll-area";

const Newbooking = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Theaterbooking, Selectedtheaterbyid, Theaterloading, Theatererror } =
    useSelector((state) => state.booking);
  const {
    branchtheatre,
    branchtheatreloading,
    branchtheatreerror,
    Activetheatreid,
  } = useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Activetheatreid !=="all") {
      dispatch(
        fetchBookingByTheaterId({
          TheaterId: Activetheatreid,
          status: "Active",
        })
      );
    }
  }, [Activetheatreid, dispatch]);

  useEffect(() => {
    if (Activetheatreid !=="all") {
      dispatch(
        fetchBookingByTheaterId({
          TheaterId: Activetheatreid,
          status: "Active",
        })
      );
    }
  }, [Activetheatreid]);


  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        let response;
          response = await GetbookingbyBranchid(selectedBranchId, "Active");            
        if (response?.data) {
          setActiveEvents(response.data);
        } else {
          setActiveEvents([]);
          setLoading(false);

        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
  
    if (Activetheatreid ==="all") {
      fetchBookings();
    }
  }, [Activetheatreid, selectedBranchId]);
  

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  // useEffect(() => {
  //   const today = new Date();

  //   // Filter active events (today's bookings)
  //   const active =
  //     Theaterbooking?.filter((booking) => {
  //       const bookingDate = new Date(booking.date);
  //       return bookingDate.toDateString() === today.toDateString(); // Check if it's the same day
  //     }) || [];

  //   // Update state
  //   setActiveEvents(active);
  // }, [Theaterbooking, Selectedtheaterbyid, Theatererror]); //

  // useEffect(() => {
  //   const today = new Date();
  //   const indianTimeOffset = 330;

  //   const convertToISTDateString = (utcDate) => {
  //     const date = new Date(utcDate);
  //     date.setMinutes(date.getMinutes() + indianTimeOffset);
  //     return date.toISOString().split("T")[0];
  //   };

  //   const todayIST = convertToISTDateString(today);

  //   const active =
  //     Theaterbooking?.filter((booking) => {
  //       const bookingDateIST = convertToISTDateString(booking.date);
  //       return bookingDateIST === todayIST;
  //     }) || [];

  //   setActiveEvents(active);
  // }, [Theaterbooking, Selectedtheaterbyid, Theatererror]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(setActivetheatreid("all"));
    }
  }, [branchtheatre, dispatch, selectedBranchId]);

  const iconMapping = {
    Birthday: Birthdayicon,
    Anniversary: GlassWater,
    Reunion: Users1,
    Farewell: PartyPopper,
    "Baby Shower": BabyIcon,
    Proposal: HeartHandshake,
    "Romantic Date": Heart,
    "Business Meet": Briefcase,
    "Bride to be": Bridetobe,
    "Groom to be": Gromtobe,
    "Mom to be": Momtobe,
    "Love Proposal": Loveproposal,
    Congratulations: Congratulations,
  };

  return (
    <Card className="rounded-none shadow-none overflow-hidden">
      <ScrollArea className="h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              New Bookings{" "}
              {/* {<span className="text-pink-500">{Theaterbooking?.counts?.active}</span>} */}
            </h2>
            <Select
              onValueChange={(value) => dispatch(setActivetheatreid(value))}
              value={Activetheatreid}
            >
              <SelectTrigger
                id="location-select"
                className="w-60 h-10 flex items-center gap-2"
              >
                <SelectValue placeholder="Select Theatre">
                  {branchtheatreloading ? (
                    <Spinner color="danger" size="sm" />
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* {branchtheatre?.find(
                        (theater) => theater?._id === Activetheatreid
                      )?.name || "Select Theater"} */}
                      {Activetheatreid === "all"
                        ? "All Theatres"
                        : branchtheatre?.find(
                            (theater) => theater?._id === Activetheatreid
                          )?.name || "Select Theatre"}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {branchtheatreloading ? (
                  <div className="p-2 text-center">Loading theaters...</div>
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
                    No theatres available
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
          {branchtheatreerror ? (
            <div className="flex justify-center items-center w-full h-60">
              <p>No theatres </p>
            </div>
          ) : (
            <div className="space-y-4">
              {(Activetheatreid === "all" ?loading:Theaterloading) ? (
                <div className="flex justify-center items-center w-full h-60">
                  <Spinner color="danger" />
                </div>
              ) : (
                <>
                  {(Activetheatreid === "all" ? activeEvents : Theaterbooking?.data)?.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-60">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <>
                      {Theatererror === "No bookings found" ? (
                        <div className="flex justify-center items-center w-full h-60">
                          <p>No Bookings available</p>
                        </div>
                      ) : (
                        (Activetheatreid === "all" ? activeEvents : Theaterbooking?.data)?.map((booking, index) => (
                          <div
                            onClick={() =>
                              router.push("/dashboard/YourBookings")
                            }
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                              index === 1
                                ? "bg-[#F30278] text-white"
                                : "bg-[#004AAD] text-white"
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                                <Image
                                  src={
                                    iconMapping[booking?.Occasionobject] || ""
                                  }
                                  alt={booking?.Occasionobject}
                                  className="w-8 h-8 object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {booking?.Occasionobject}
                                </h3>
                                <div className="text-sm opacity-80 flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {booking?.slotDetails?.startTime} -&nbsp;
                                  {booking?.slotDetails?.endTime}
                                </div>
                              </div>
                            </div>
                            <ChevronRightIcon className="w-6 h-6" />
                          </div>
                        ))
                      )}
                    </>
                  )}
                </>
              )}
              <Button
                onPress={() => router.push("/dashboard/YourBookings")}
                variant="light"
                className="w-full underline text-[#004AAD] hover:text-blue-700"
              >
                View All
              </Button>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default Newbooking;
