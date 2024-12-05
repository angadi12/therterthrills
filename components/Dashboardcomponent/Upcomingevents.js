import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingByTheaterId,
  Setselectedtheaterid,
} from "@/lib/Redux/bookingSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
import { useRouter } from "next/navigation";
import { Sendbookingremainder } from "@/lib/API/Booking";
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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Upcomingevents = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { Theaterbooking, Selectedtheaterbyid, Theaterloading, Theatererror } =
    useSelector((state) => state.booking);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState({});

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

  useEffect(() => {
    const today = new Date();

    // Filter active events (today's bookings)
    const upcoming =
      Theaterbooking?.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate > today; // Check if the date is in the future
      }) || [];

    // Update state
    setUpcomingEvents(upcoming);
  }, [Theaterbooking, Selectedtheaterbyid, Theatererror]); //

  useEffect(() => {
    if (branchtheatre?.length > 0 && !Selectedtheaterbyid) {
      dispatch(Setselectedtheaterid(branchtheatre[0]._id));
    }
  }, [branchtheatre, Selectedtheaterbyid, dispatch]);

  console.log(upcomingEvents);

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

  const handleSendReminder = async (eventId) => {
    setLoadingEvents((prev) => ({ ...prev, [eventId]: true }));
    try {
      const result = await Sendbookingremainder(eventId);
      if (result.success === true) {
        toast({
          title: "Reminder sent successfully!",
          description: "Reminder has been sent successfully!",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send reminder.",
        description: "Error sending reminder",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setLoadingEvents((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  return (
    <Card className="rounded-none shadow-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
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
        ) : (
          <div className="space-y-4">
            {Theaterloading ? (
              <div className="flex justify-center items-center w-full h-60">
                <Spinner color="danger" />
              </div>
            ) : (
              <>
                {upcomingEvents?.length === 0 ? (
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
                      upcomingEvents.map((event, index) => (
                        <div
                          key={event._id}
                          className="flex items-center justify-between bg-white ring-1 ring-gray-200 p-4 rounded-lg shadow"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl">
                              <Image
                                src={iconMapping[event?.Occasionobject] || ""}
                                alt={event?.Occasionobject}
                                className="w-8 h-8 object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {event?.Occasionobject}
                              </h3>
                              <div className="text-sm text-gray-500 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event?.theater?.location}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event?.slotDetails?.startTime} -&nbsp;
                                {event?.slotDetails?.endTime}
                              </div>
                            </div>
                          </div>
                          <Button
                            isLoading={loadingEvents[event._id] || false}
                            onPress={() => handleSendReminder(event?._id)}
                            variant="outline"
                            size="sm"
                            className=" rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                            Send Reminder
                          </Button>
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
    </Card>
  );
};

export default Upcomingevents;
