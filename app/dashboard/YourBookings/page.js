"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus, MapPin, Users, Calendar, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookingByTheaterId,
  Setselectedtheaterid,
} from "@/lib/Redux/bookingSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
import { Spinner } from "@nextui-org/react";

const events = [
  {
    id: 1,
    icon: "🎂",
    name: "Birthday",
    venue: "Bronze Theatre",
    location: "Lingampally",
    eventType: "Birthday Party",
    members: 4,
    date: "17-10-2024",
    time: "9:00 AM - 12:30 PM",
    features: ["Fog Effects", "Cheese Cake", "20 Photos"],
  },
  {
    id: 2,
    icon: "👥",
    name: "Reunion",
    venue: "Bronze Theatre",
    location: "Lingampally",
    eventType: "Reunion Party",
    members: 4,
    date: "17-10-2024",
    time: "9:00 AM - 12:30 PM",
    features: ["Fog Effects", "20 Photos"],
  },
  {
    id: 3,
    icon: "💍",
    name: "Proposal",
    venue: "Bronze Theatre",
    location: "Lingampally",
    eventType: "Proposal",
    members: 4,
    date: "17-10-2024",
    time: "9:00 AM - 12:30 PM",
    features: ["LED Lights", "Red Velvet", "50 Photos"],
  },
  {
    id: 4,
    icon: "👋",
    name: "Farewell",
    venue: "Bronze Theatre",
    location: "Lingampally",
    eventType: "Proposal",
    members: 4,
    date: "17-10-2024",
    time: "9:00 AM - 12:30 PM",
    features: ["LED Lights", "Red Velvet", "50 Photos"],
  },
];

export default function ActiveEvents() {
  const dispatch = useDispatch();
  const { Theaterbooking, Selectedtheaterbyid,Theaterloading,Theatererror } = useSelector(
    (state) => state.booking
  );
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);

  console.log(Theaterbooking);

  useEffect(() => {
    if (Selectedtheaterbyid) {
      dispatch(fetchBookingByTheaterId(Selectedtheaterbyid));
    }
  }, [Selectedtheaterbyid, dispatch]);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, []);

  return (
    <section className="w-full mx-auto bg-white">
      <div className="flex justify-between  items-center py-4  sticky top-0 bg-white z-50 p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            Active Events <span className="text-pink-500">(3)</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2 w-80 ">
          <Select
            onValueChange={(value) => dispatch(Setselectedtheaterid(value))}
            value={Selectedtheaterbyid}
          >
            <SelectTrigger
              id="location-select"
              className="w-full  h-10 flex items-center gap-2"
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

          {/* <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button> */}
        </div>
      </div>

      <Tabs defaultValue="Active" className="w-full p-5">
        <TabsList>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="AllBooking">All Booking</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="space-y-4 mt-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                  {event.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.eventType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.members} Members</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-2">
                  {event.features.map((feature, index) => (
                    <div key={index} className="text-blue-600 text-sm">
                      • {feature}
                    </div>
                  ))}
                </div>
                <Button className="bg-[#EF0000] text-white">Cancel</Button>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Active">
          <div className="p-4 text-center text-gray-500">
            No Active events
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="p-4 text-center text-gray-500">
            No completed events
          </div>
        </TabsContent>
        <TabsContent value="cancelled">
          <div className="p-4 text-center text-gray-500">
            No cancelled events
          </div>
        </TabsContent>
        <TabsContent value="AllBooking">
          <div className="p-4 text-center text-gray-500">All Booking </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
