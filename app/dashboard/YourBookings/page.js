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
  fetchBookingById,
  fetchBookingByTheaterId,
  fetchUnsavedBookingByTheaterId,
  Setselectedtheaterid,
} from "@/lib/Redux/bookingSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
import { Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Cake,
  Camera,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";

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

export default function ActiveEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [bookId, Setbookid] = useState("");
  const dispatch = useDispatch();
  const {
    Theaterbooking,
    Selectedtheaterbyid,
    Theaterloading,
    Theatererror,
    UnsavedTheaterbooking,
    UnsavedTheaterloading,
    UnsavedTheatererror,

    singlebooking,
    bookingloading,
    bookingerror,
  } = useSelector((state) => state.booking);
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);

  console.log(UnsavedTheaterbooking);

  useEffect(() => {
    if (Selectedtheaterbyid) {
      dispatch(fetchBookingByTheaterId(Selectedtheaterbyid));
      dispatch(fetchUnsavedBookingByTheaterId(Selectedtheaterbyid));
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
    const active =
      Theaterbooking?.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === today.toDateString(); // Check if it's the same day
      }) || [];

    // Filter upcoming events (future bookings)
    const upcoming =
      Theaterbooking?.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate > today; // Check if the date is in the future
      }) || [];

    // Filter completed events (past bookings with completed payment)
    const completed =
      Theaterbooking?.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return booking.paymentStatus === "completed" && bookingDate < today; // Check if date is in the past and payment is completed
      }) || [];

    // Update state
    setActiveEvents(active);
    setUpcomingEvents(upcoming);
    setCompletedEvents(completed);
  }, [Theaterbooking, Selectedtheaterbyid, Theatererror]); // Re-run the filter logic whenever Theaterbooking changes

  useEffect(() => {
    if (branchtheatre?.length > 0 && !Selectedtheaterbyid) {
      dispatch(Setselectedtheaterid(branchtheatre[0]._id));
    }
  }, [branchtheatre, Selectedtheaterbyid, dispatch]);

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

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookingById(bookId));
    }
  }, [dispatch, bookId]);

  const formattedDate =
  singlebooking?.date && !isNaN(new Date(singlebooking?.date))
      ? format(new Date(singlebooking?.date), "yyyy-MM-dd")
      : null;

  const BookingDetailsDialog = () => (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[900px] md:h-auto h-96 flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[#004AAD]">Booking Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 p-6">
            <div className="space-y-6 md:border-r md:pr-4 md:border-[#F30278]">
              <div>
                <h2 className="text-2xl font-bold text-[#004AAD]">
                  {singlebooking?.Occasionobject}
                </h2>
                <p className="text-lg font-semibold text-[#F30278]">
                  Booking ID: {singlebooking?.bookingId}
                </p>
                <p className="text-lg font-semibold text-[#F30278]">
                  Total: ₹{singlebooking?.TotalAmount}/-
                </p>
              </div>
              <Separator className="bg-[#F30278]" />
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">
                    {singlebooking?.numberOfPeople} Members
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{singlebooking?.whatsappNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{singlebooking?.email}</span>
                </div>
              </div>
              <Separator className="bg-[#F30278]" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#004AAD]">
                  Cake Details
                </h3>
                <p>
                  Eggless:{" "}
                  <span className="text-[#F30278]">
                    {singlebooking?.isEggless ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  Cake Text:{" "}
                  <span className="text-[#F30278]">{singlebooking?.cakeText}</span>
                </p>
                <p>
                  Nick Name:{" "}
                  <span className="text-[#F30278]">{singlebooking?.nickname}</span>
                </p>
                <p>
                  Partner Nickname:{" "}
                  <span className="text-[#F30278]">
                    {singlebooking?.partnerNickname}
                  </span>
                </p>
                {singlebooking?.Cakes &&
                  Object?.values(singlebooking?.Cakes).map((cake, index) => (
                    <p key={index} className="text-sm">
                      {cake?.name} x {cake?.quantity} -{" "}
                      <span className="text-[#F30278]">
                        ₹{cake?.price * cake?.quantity}
                      </span>
                    </p>
                  ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#004AAD]">
                  Add-Ons
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {singlebooking?.Addons?.decorations &&
                    Object.entries(singlebooking.Addons.decorations).map(
                      ([key, value]) => (
                        <div key={key}>
                          {/* Render your content using key and value */}
                          {key}: {value}
                        </div>
                      )
                    )}
                  {singlebooking?.Addons?.roses &&
                    Object?.entries(singlebooking?.Addons?.roses).map(
                      ([name, count]) => (
                        <p key={name} className="text-sm">
                          {name} x{" "}
                          <span className="text-[#F30278]">{count}</span>
                        </p>
                      )
                    )}
                  {singlebooking?.Addons?.photography.map((item, index) => (
                    <p key={index} className="text-sm text-[#F30278]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <Separator className="bg-[#F30278]" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#004AAD]">
                  Payment Details
                </h3>
                <div className="flex items-center mb-2">
                  <CreditCard className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span>
                    Status:{" "}
                    <span className="text-[#F30278]">
                      {singlebooking?.paymentStatus}
                    </span>
                  </span>
                </div>
                <p>
                  Amount Paid:{" "}
                  <span className="text-[#F30278]">
                    ₹{singlebooking?.paymentAmount}/-
                  </span>
                </p>
                <p>
                  Order ID:{" "}
                  <span className="text-[#F30278]">{singlebooking?.orderId}</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="w-full mx-auto bg-white">
    <BookingDetailsDialog/>
      <div className="flex justify-between  items-center py-4  sticky top-0 bg-white z-50 p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            Active Events{" "}
            <span className="text-pink-500">({activeEvents.length})</span>
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
          {Theaterloading ? (
            <div className="flex justify-center items-center w-full h-[60vh]">
              <Spinner color="danger" />
            </div>
          ) : (
            <>
              {upcomingEvents?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[60vh]">
                  <p>No Bookings available</p>
                </div>
              ) : (
                <>
                  {Theatererror === "Nobookings" ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {upcomingEvents?.map((event) => (
                        <div
                          key={event._id}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
                        >
                          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                            <Image
                              src={iconMapping[event?.Occasionobject] || ""}
                              alt={event?.Occasionobject}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-xl font-semibold">
                              {event?.Occasionobject}
                            </h2>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.name}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.location}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.Occasionobject}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.numberOfPeople} Members
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {format(new Date(event?.date), "yyyy-MM-dd")}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.slotDetails?.startTime}-
                                  {event?.slotDetails?.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
                            {event?.selectedCakes &&
                              Object.values(event?.selectedCakes)
                                ?.slice(0, 1)
                                .map((cake, index) => (
                                  <p key={index} className="text-sm">
                                    •{cake?.name} x{" "}
                                    <span className="text-[#F30278]">
                                      {cake?.quantity}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.decorations &&
                              Object.entries(event?.addOns?.decorations)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.roses &&
                              Object.entries(event?.addOns?.roses)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}
                            {event?.addOns?.photography
                              ?.slice(0, 1)
                              .map((item, index) => (
                                <p
                                  key={index}
                                  className="text-sm text-[#F30278]"
                                >
                                  • {item}
                                </p>
                              ))}
                          </div>
                          <Button
                            onPress={() => {
                              setIsModalOpen(!isModalOpen),
                                Setbookid(event?._id);
                            }}
                            className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="Active">
          {Theaterloading ? (
            <div className="flex justify-center items-center w-full h-[60vh]">
              <Spinner color="danger" />
            </div>
          ) : (
            <>
              {activeEvents?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[60vh]">
                  <p>No Bookings available</p>
                </div>
              ) : (
                <>
                  {Theatererror === "Nobookings" ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {activeEvents?.map((event) => (
                        <div
                          key={event._id}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
                        >
                          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                            <Image
                              src={iconMapping[event?.Occasionobject] || ""}
                              alt={event?.Occasionobject}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-xl font-semibold">
                              {event?.Occasionobject}
                            </h2>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.name}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.location}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.Occasionobject}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.numberOfPeople} Members
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {format(new Date(event?.date), "yyyy-MM-dd")}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.slotDetails?.startTime}-
                                  {event?.slotDetails?.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
                            {event?.selectedCakes &&
                              Object.values(event?.selectedCakes)
                                ?.slice(0, 1)
                                .map((cake, index) => (
                                  <p key={index} className="text-sm">
                                    •{cake?.name} x{" "}
                                    <span className="text-[#F30278]">
                                      {cake?.quantity}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.decorations &&
                              Object.entries(event?.addOns?.decorations)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.roses &&
                              Object.entries(event?.addOns?.roses)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}
                            {event?.addOns?.photography
                              ?.slice(0, 1)
                              .map((item, index) => (
                                <p
                                  key={index}
                                  className="text-sm text-[#F30278]"
                                >
                                  • {item}
                                </p>
                              ))}
                          </div>
                          <Button
                            onPress={() => {
                              setIsModalOpen(!isModalOpen),
                                Setbookid(event?._id);
                            }}
                            className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {Theaterloading ? (
            <div className="flex justify-center items-center w-full h-[60vh]">
              <Spinner color="danger" />
            </div>
          ) : (
            <>
              {completedEvents?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[60vh]">
                  <p>No Bookings available</p>
                </div>
              ) : (
                <>
                  {Theatererror === "Nobookings" ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {completedEvents?.map((event) => (
                        <div
                          key={event._id}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
                        >
                          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                            <Image
                              src={iconMapping[event?.Occasionobject] || ""}
                              alt={event?.Occasionobject}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-xl font-semibold">
                              {event?.Occasionobject}
                            </h2>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.name}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.location}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.Occasionobject}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.numberOfPeople} Members
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {format(new Date(event?.date), "yyyy-MM-dd")}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.slotDetails?.startTime}-
                                  {event?.slotDetails?.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
                            {event?.selectedCakes &&
                              Object.values(event?.selectedCakes)
                                ?.slice(0, 1)
                                .map((cake, index) => (
                                  <p key={index} className="text-sm">
                                    •{cake?.name} x{" "}
                                    <span className="text-[#F30278]">
                                      {cake?.quantity}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.decorations &&
                              Object.entries(event?.addOns?.decorations)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.roses &&
                              Object.entries(event?.addOns?.roses)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}
                            {event?.addOns?.photography
                              ?.slice(0, 1)
                              .map((item, index) => (
                                <p
                                  key={index}
                                  className="text-sm text-[#F30278]"
                                >
                                  • {item}
                                </p>
                              ))}
                          </div>
                          <Button
                            onPress={() => {
                              setIsModalOpen(!isModalOpen),
                                Setbookid(event?._id);
                            }}
                            className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="cancelled">
          {UnsavedTheaterloading ? (
            <div className="flex justify-center items-center w-full h-[60vh]">
              <Spinner color="danger" />
            </div>
          ) : (
            <>
              {UnsavedTheaterbooking?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[60vh]">
                  <p>No Bookings available</p>
                </div>
              ) : (
                <>
                  {UnsavedTheatererror === "Nobookings" ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {UnsavedTheaterbooking?.map((event) => (
                        <div
                          key={event._id}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
                        >
                          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                            <Image
                              src={iconMapping[event?.Occasionobject] || ""}
                              alt={event?.Occasionobject}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-xl font-semibold">
                              {event?.Occasionobject}
                            </h2>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.name}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.location}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.Occasionobject}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.numberOfPeople} Members
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {format(new Date(event?.date), "yyyy-MM-dd")}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.slotDetails?.startTime}-
                                  {event?.slotDetails?.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
                            {event?.selectedCakes &&
                              Object.values(event?.selectedCakes)
                                ?.slice(0, 1)
                                .map((cake, index) => (
                                  <p key={index} className="text-sm">
                                    •{cake?.name} x{" "}
                                    <span className="text-[#F30278]">
                                      {cake?.quantity}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.decorations &&
                              Object.entries(event?.addOns?.decorations)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.roses &&
                              Object.entries(event?.addOns?.roses)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}
                            {event?.addOns?.photography
                              ?.slice(0, 1)
                              .map((item, index) => (
                                <p
                                  key={index}
                                  className="text-sm text-[#F30278]"
                                >
                                  • {item}
                                </p>
                              ))}
                          </div>
                          <Button className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                            Send Reminder
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="AllBooking">
          {Theaterloading ? (
            <div className="flex justify-center items-center w-full h-[60vh]">
              <Spinner color="danger" />
            </div>
          ) : (
            <>
              {Theaterbooking?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[60vh]">
                  <p>No Bookings available</p>
                </div>
              ) : (
                <>
                  {Theatererror === "Nobookings" ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {Theaterbooking?.map((event) => (
                        <div
                          key={event._id}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
                        >
                          <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center text-3xl">
                            <Image
                              src={iconMapping[event?.Occasionobject] || ""}
                              alt={event?.Occasionobject}
                              className="w-8 h-8 object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h2 className="text-xl font-semibold">
                              {event?.Occasionobject}
                            </h2>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.name}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.theater?.location}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.Occasionobject}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.numberOfPeople} Members
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {format(new Date(event?.date), "yyyy-MM-dd")}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="text-sm">
                                  {event?.slotDetails?.startTime}-
                                  {event?.slotDetails?.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
                            {event?.selectedCakes &&
                              Object.values(event?.selectedCakes)
                                ?.slice(0, 1)
                                .map((cake, index) => (
                                  <p key={index} className="text-sm">
                                    •{cake?.name} x{" "}
                                    <span className="text-[#F30278]">
                                      {cake?.quantity}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.decorations &&
                              Object.entries(event?.addOns?.decorations)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}

                            {event?.addOns?.roses &&
                              Object.entries(event?.addOns?.roses)
                                ?.slice(0, 1)
                                .map(([name, count]) => (
                                  <p key={name} className="text-sm">
                                    • {name} x{" "}
                                    <span className="text-[#F30278]">
                                      {count}
                                    </span>
                                  </p>
                                ))}
                            {event?.addOns?.photography
                              ?.slice(0, 1)
                              .map((item, index) => (
                                <p
                                  key={index}
                                  className="text-sm text-[#F30278]"
                                >
                                  • {item}
                                </p>
                              ))}
                          </div>
                          <Button
                            onPress={() => {
                              setIsModalOpen(!isModalOpen),
                                Setbookid(event?._id);
                            }}
                            className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
