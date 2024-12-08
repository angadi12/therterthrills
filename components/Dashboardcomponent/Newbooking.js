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
  fetchUnsavedBookingByTheaterId,
  Setselectedtheaterid,
} from "@/lib/Redux/bookingSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
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

const Newbooking = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Theaterbooking, Selectedtheaterbyid, Theaterloading, Theatererror } =
    useSelector((state) => state.booking);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const [activeEvents, setActiveEvents] = useState([]);

  useEffect(() => {
    if (Selectedtheaterbyid) {
      dispatch(fetchBookingByTheaterId(Selectedtheaterbyid));
    }
  }, [Selectedtheaterbyid, dispatch]);

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

  useEffect(() => {
    const today = new Date();
    const indianTimeOffset = 330; // IST is UTC+5:30
  
    // Convert a UTC date to IST and format it as 'yyyy-mm-dd'
    const convertToISTDateString = (utcDate) => {
      const date = new Date(utcDate);
      date.setMinutes(date.getMinutes() + indianTimeOffset); // Adjust for IST offset
      return date.toISOString().split("T")[0]; // Extract 'yyyy-mm-dd' format
    };
  
    // Get today's IST date in 'yyyy-mm-dd' format
    const todayIST = convertToISTDateString(today);
  
    // Filter active events (today's bookings)
    const active =
      Theaterbooking?.filter((booking) => {
        const bookingDateIST = convertToISTDateString(booking.date); // Convert booking date to IST
        return bookingDateIST === todayIST; // Check if it's the same day
      }) || [];
  
    // Update state
    setActiveEvents(active);
  }, [Theaterbooking, Selectedtheaterbyid, Theatererror]); // Dependencies for re-running effect
  


  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(Setselectedtheaterid(branchtheatre[0]._id));
    }
  }, [branchtheatre, Selectedtheaterbyid, dispatch,selectedBranchId]);


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
    <Card className="rounded-none shadow-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            New Bookings{" "}
            <span className="text-pink-500">({activeEvents?.length})</span>
          </h2>
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
                      {branchtheatre?.find(
                        (theater) => theater?._id === Selectedtheaterbyid
                      )?.name || "Select Theater"}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {branchtheatreloading ? (
                  <div className="p-2 text-center">Loading theaters...</div>
                ) : branchtheatre?.length > 0 ? (
                  branchtheatre.map((theater) => (
                    <SelectItem key={theater?._id} value={theater?._id}>
                      {theater?.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-1 text-center text-sm ">
                    No theaters available
                  </div>
                )}
              </SelectContent>
            </Select>
        </div>
      {branchtheatreerror ? (
          <div className="flex justify-center items-center w-full h-60">
            <p>No theaters </p>
          </div>
        ) : (<div className="space-y-4">
        {Theaterloading ? (
          <div className="flex justify-center items-center w-full h-60">
            <Spinner color="danger" />
          </div>
        ) : (
          <>
            {activeEvents?.length === 0 ? (
              <div className="flex justify-center items-center w-full h-60">
                <p>No Bookings available</p>
              </div>
            ) : (
              <>
                {Theatererror === "Nobookings" ? (
                  <div className="flex justify-center items-center w-full h-60">
                    <p>No Bookings available</p>
                  </div>
                ) : (
                  activeEvents?.map((booking, index) => (
                    <div
                      onClick={() => router.push("/dashboard/YourBookings")}
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
                                src={iconMapping[booking?.Occasionobject] || ""}
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
      </div>)}
      </CardContent>
    </Card>
  );
};

export default Newbooking;
