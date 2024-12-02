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

const Upcomingevents = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Theaterbooking, Selectedtheaterbyid, Theaterloading, Theatererror } =
    useSelector((state) => state.booking);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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
              className="w-60  h-10 flex items-center gap-2"
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
              {branchtheatre?.map((theater) => (
                <SelectItem key={theater?._id} value={theater?._id}>
                  {theater?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                        key={index}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl">
                            {event.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{event.name}</h3>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
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
      </CardContent>
    </Card>
  );
};

export default Upcomingevents;
