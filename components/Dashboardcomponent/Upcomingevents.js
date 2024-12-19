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
import { useSelector, useDispatch } from "react-redux";
import {
  setupcomingtheatreid,
  fetchtheaterbybranchid,
} from "@/lib/Redux/theaterSlice";
import { Getbookingbytheaterid, Sendbookingremainder } from "@/lib/API/Booking";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Image from "next/image";
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
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const Upcomingevents = () => {
  const router = useRouter();

  const { toast } = useToast();
  const dispatch = useDispatch();
  const {
    branchtheatre,
    branchtheatreloading,
    branchtheatreerror,
    upcomingtheatreid,
  } = useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState({});

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (upcomingtheatreid) {
        setLoading(true);
        try {
          const response = await Getbookingbytheaterid(
            upcomingtheatreid,
            "upcoming"
          );
          if (response?.data) {
            setUpcomingEvents(response.data);
          } else {
            setUpcomingEvents([]);
          }
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookings();
  }, [upcomingtheatreid]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(setupcomingtheatreid(branchtheatre[0]._id));
    }
  }, [branchtheatre, dispatch]);

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
      if (result.success) {
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
    <Card className="rounded-none shadow-none overflow-hidden">
      <ScrollArea className="h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <Select
              onValueChange={(value) => dispatch(setupcomingtheatreid(value))}
              value={upcomingtheatreid}
            >
              <SelectTrigger
                id="location-select"
                className="w-60 h-10 flex items-center gap-2"
              >
                <SelectValue placeholder="Select Theater">
                  {branchtheatreloading ? (
                    <Spinner color="danger" size="sm" />
                  ) : (
                    branchtheatre?.find(
                      (theater) => theater?._id === upcomingtheatreid
                    )?.name || "Select Theater"
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
              <p>No theaters</p>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center w-full h-60">
              <Spinner color="danger" />
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="flex justify-center items-center w-full h-60">
              <p>No Bookings available</p>
            </div>
          ) : (
            
            upcomingEvents.map((event) => (
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
                    <h3 className="font-semibold">{event?.Occasionobject}</h3>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event?.theater?.location}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event?.slotDetails?.startTime} -{" "}
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
          <Button
            onPress={() => router.push("/dashboard/YourBookings")}
            variant="light"
            className="w-full bg-white mt-4 underline text-[#004AAD] hover:text-blue-700"
          >
            View All
          </Button>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default Upcomingevents;
