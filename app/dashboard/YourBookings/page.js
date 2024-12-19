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
import {
  Filter,
  Plus,
  MapPin,
  Users,
  Calendar,
  Clock,
  Trash2,
} from "lucide-react";
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
import { addMinutes } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Cake, Camera, Phone, Mail, CreditCard } from "lucide-react";

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
import {
  Deleteunsavedapi,
  Sendunsavedbookingmailbyid,
} from "@/lib/API/Booking";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Badge, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ActiveEvents() {
  const router = useRouter();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [bookId, Setbookid] = useState("");
  const [Unsavedid, SetUnsavedid] = useState("");
  const [loadingEvents, setLoadingEvents] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [delteloading, setDeleteloading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Active");
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

  useEffect(() => {
    if (Selectedtheaterbyid) {
      dispatch(
        fetchBookingByTheaterId({
          TheaterId: Selectedtheaterbyid,
          status: selectedTab,
        })
      );
    }
  }, [Selectedtheaterbyid, dispatch, selectedTab]);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  // useEffect(()=>{
  // if(Theatererror==="No bookings found"){

  // }
  // },[Theatererror,Theaterbooking])

  // useEffect(() => {
  //   const today = new Date();
  //   const indianTimeOffset = 330; // IST is UTC+5:30

  //   // Convert a date to IST and format it as 'yyyy-mm-dd'
  //   const convertToISTDateString = (utcDate) => {
  //     const date = new Date(utcDate);
  //     date.setMinutes(date.getMinutes() + indianTimeOffset);
  //     return date.toISOString().split("T")[0]; // Returns the date in 'yyyy-mm-dd' format
  //   };

  //   // Get today's IST date in 'yyyy-mm-dd' format
  //   const todayIST = convertToISTDateString(today);

  //   if (Theaterbooking?.length ) {
  //     // Filter active events (today's bookings)
  //     const active =
  //       Theaterbooking?.filter((booking) => {
  //         const bookingDateIST = convertToISTDateString(booking.date);
  //         return bookingDateIST === todayIST;
  //       }) || [];

  //     // Filter upcoming events (future bookings)
  //     const upcoming =
  //       Theaterbooking?.filter((booking) => {
  //         const bookingDateIST = convertToISTDateString(booking.date);
  //         return bookingDateIST > todayIST;
  //       }) || [];

  //     // Filter completed events (past bookings with completed payment)
  //     const completed =
  //       Theaterbooking?.filter((booking) => {
  //         const bookingDateIST = convertToISTDateString(booking.date);
  //         return (
  //           booking.paymentStatus === "completed" && bookingDateIST < todayIST
  //         );
  //       }) || [];

  //     // Update state

  //     setActiveEvents(active);
  //     setUpcomingEvents(upcoming);
  //     setCompletedEvents(completed);
  //   } else {
  //     setActiveEvents([]);
  //     setUpcomingEvents([]);
  //     setCompletedEvents([]);
  //   }
  // }, [Theaterbooking, Selectedtheaterbyid,selectedTab]); // Ensure dependencies include theater-related changes

  // useEffect(() => {
  //   switch (selectedTab) {
  //     case "Active":
  //       setActiveEvents((prev) => [...prev]);
  //       break;
  //     case "upcoming":
  //       setUpcomingEvents((prev) => [...prev]);
  //       break;
  //     case "completed":
  //       setCompletedEvents((prev) => [...prev]);
  //       break;
  //     default:
  //       setActiveEvents([]);
  //       setUpcomingEvents([]);
  //       setCompletedEvents([]);
  //       break;
  //   }
  // }, [selectedTab]);

  useEffect(() => {
    if (UnsavedTheaterbooking?.length) {
      SetUnsavedid("");
    }
  }, [UnsavedTheaterbooking, Selectedtheaterbyid]);

  useEffect(() => {
    dispatch(fetchUnsavedBookingByTheaterId(Selectedtheaterbyid));
  }, [Selectedtheaterbyid, dispatch]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(Setselectedtheaterid(branchtheatre[0]._id));
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
      {bookingloading ? (
        <div className="w-full   flex justify-center items-center"></div>
      ) : (
        <DialogContent className="sm:max-w-[900px] md:h-auto h-96 flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-[#004AAD]">
              Booking Details
            </DialogTitle>
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
                  <Chip className={"bg-green-500 text-white"}>
                    {/* ₹{singlebooking?.paymentAmount} Paid */}₹
                    {singlebooking?.paymentType === "full"
                      ? singlebooking?.TotalAmount
                      : singlebooking?.paymentAmount}
                    /- paid
                  </Chip>
                  <Chip className={"bg-red-500 text-white"}>
                    ₹
                    {singlebooking?.paymentType === "advance"
                      ? singlebooking?.TotalAmount -
                        singlebooking?.paymentAmount
                      : 0}
                    &nbsp;to pay
                  </Chip>
                  {singlebooking?.coupon && (
                    <Chip className={"bg-yellow-500 text-white"}>
                      ₹{singlebooking?.discountAmount} Coupon discount
                    </Chip>
                  )}{" "}
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
                    <span className="text-sm">
                      {singlebooking?.whatsappNumber}
                    </span>
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
                    <span className="text-[#F30278]">
                      {singlebooking?.cakeText}
                    </span>
                  </p>
                  <p>
                    Nick Name:{" "}
                    <span className="text-[#F30278]">
                      {singlebooking?.nickname}
                    </span>
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
                      ₹
                      {singlebooking?.paymentType === "full"
                        ? singlebooking?.TotalAmount
                        : singlebooking?.paymentAmount}
                      /-
                    </span>
                  </p>
                  <p>
                    Order ID:{" "}
                    <span className="text-[#F30278]">
                      {singlebooking?.orderId}
                    </span>
                  </p>
                  <div className="flex flex-col justify-start items-start gap-2">
                    Coupon applied :-
                    {singlebooking?.coupon && (
                      <Badge>{singlebooking?.coupon}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );

  const handleSendReminder = async (eventId) => {
    setLoadingEvents((prev) => ({ ...prev, [eventId]: true }));
    try {
      const result = await Sendunsavedbookingmailbyid(eventId);
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

  const Deletehandle = async (Unsavedid) => {
    setDeleteloading(true);
    try {
      const response = await Deleteunsavedapi(Unsavedid);
      if (response.status === "success") {
        toast({
          title: "Deleted!",
          description: "bookings has been deleted",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setDeleteloading(false);
        setIsDelete(!isDelete);
        dispatch(fetchUnsavedBookingByTheaterId(Selectedtheaterbyid));
      }
    } catch (error) {
      toast({
        title: "Failed to delete message",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setDeleteloading(false);
    }
  };

  return (
    <>
      <section className="w-full mx-auto bg-white">
        <BookingDetailsDialog />
        <div className="flex justify-between  items-center py-4  sticky top-0 bg-white z-50 p-4">
          <div className="flex items-center space-x-4 w-full">
            <h1 className="text-2xl font-bold flex items-center gap-4">
              {selectedTab === "Active" && "Active Events"}
              {selectedTab === "upcoming" && "Upcoming Events"}
              {selectedTab === "completed" && "Completed Events"}
              {selectedTab === "cancelled" && "Cancelled Events"}
              {selectedTab === "AllBooking" && "All  Booking"}
              {branchtheatreerror ? (
                ""
              ) : (
                <>
                  {selectedTab === "Active" && (
                    <Badge
                      color="danger"
                      content={Theaterbooking?.counts?.active}
                      isInvisible={!Theaterbooking?.counts?.active}
                      size="md"
                    ></Badge>
                  )}
                  {selectedTab === "upcoming" && (
                    <Badge
                      color="danger"
                      content={Theaterbooking?.counts?.upcoming}
                      isInvisible={!Theaterbooking?.counts?.upcoming}
                      size="md"
                    ></Badge>
                  )}
                  {selectedTab === "completed" && (
                    <Badge
                      color="danger"
                      content={Theaterbooking?.counts?.completed}
                      isInvisible={!Theaterbooking?.counts?.completed}
                      size="md"
                    ></Badge>
                  )}
                  {selectedTab === "AllBooking" && (
                    <Badge
                      color="danger"
                      content={Theaterbooking?.counts?.all}
                      isInvisible={!Theaterbooking?.counts?.all}
                      size="md"
                    ></Badge>
                  )}
                  {selectedTab === "cancelled" && (
                    <Badge
                      color="danger"
                      content={UnsavedTheaterbooking?.length}
                      isInvisible={
                        UnsavedTheatererror === "Nobookings" ||
                        UnsavedTheaterbooking?.length === 0
                      }
                      size="md"
                    ></Badge>
                  )}
                </>
              )}
            </h1>
          </div>
          <div className="flex items-center justify-end space-x-2 w-full ">
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
        </div>

        {branchtheatreerror ? (
          <div className="flex flex-col justify-center items-center w-full h-60">
            <p>No theatres </p>
            <Button
              onClick={() => router.push("/dashboard/ManageTheatres")}
              className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Add theatre
            </Button>
          </div>
        ) : (
          <Tabs
            onValueChange={(value) => setSelectedTab(value)}
            defaultValue="Active"
            className="w-full pb-5 bg-white  "
          >
            <TabsList className="grid h-14 border-b-1.5 w-full grid-cols-5 sticky top-16 bg-white z-50 px-2">
              <Badge
                color="danger"
                content={Theaterbooking.counts?.active}
                isInvisible={!Theaterbooking.counts?.active}
                size="md"
              >
                <TabsTrigger className="w-full" value="Active">
                  Active
                </TabsTrigger>
              </Badge>
              <Badge
                color="danger"
                content={Theaterbooking?.counts?.upcoming}
                isInvisible={!Theaterbooking?.counts?.upcoming}
                size="md"
              >
                <TabsTrigger className="w-full" value="upcoming">
                  Upcoming
                </TabsTrigger>
              </Badge>
              <Badge
                color="danger"
                content={Theaterbooking?.counts?.completed}
                isInvisible={!Theaterbooking?.counts?.completed}
                size="md"
              >
                <TabsTrigger className="w-full" value="completed">
                  Completed
                </TabsTrigger>
              </Badge>
              <Badge
                color="danger"
                content={UnsavedTheaterbooking?.length}
                isInvisible={
                  UnsavedTheatererror === "Nobookings" ||
                  UnsavedTheaterbooking?.length === 0
                }
                size="md"
              >
                <TabsTrigger className="w-full" value="cancelled">
                  Cancelled
                </TabsTrigger>
              </Badge>
              <Badge
                color="danger"
                content={Theaterbooking?.counts?.all}
                isInvisible={!Theaterbooking?.counts?.all}
                size="md"
              >
                <TabsTrigger className="w-full" value="AllBooking">
                  All Booking
                </TabsTrigger>
              </Badge>
            </TabsList>
            <TabsContent value="upcoming">
              {Theaterloading ? (
                <div className="flex justify-center items-center w-full h-[60vh]">
                  <Spinner color="danger" />
                </div>
              ) : (
                <>
                  {Theaterbooking?.data?.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <>
                      {Theatererror === "No bookings found" ? (
                        <div className="flex justify-center items-center w-full h-[60vh]">
                          <p>No Bookings available</p>
                        </div>
                      ) : (
                        <div className="space-y-4 mt-4">
                          {Theaterbooking?.data?.map((event) => (
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
                                      {format(
                                        new Date(event?.date),
                                        "yyyy-MM-dd"
                                      )}
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
                              {/* <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
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
                              </div> */}
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
                  {Theaterbooking.data?.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <>
                      {Theatererror === "No bookings found" ? (
                        <div className="flex justify-center items-center w-full h-[60vh]">
                          <p>No Bookings available</p>
                        </div>
                      ) : (
                        <div className="space-y-4 mt-4">
                          {Theaterbooking.data?.map((event) => (
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
                                      {format(
                                        new Date(event?.date),
                                        "yyyy-MM-dd"
                                      )}
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
                              {/* <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
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
                              </div> */}
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
                  {Theaterbooking.data?.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <>
                      {Theatererror === "No bookings found" ? (
                        <div className="flex justify-center items-center w-full h-[60vh]">
                          <p>No Bookings available</p>
                        </div>
                      ) : (
                        <div className="space-y-4 mt-4">
                          {Theaterbooking.data?.map((event) => (
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
                                      {format(
                                        new Date(event?.date),
                                        "yyyy-MM-dd"
                                      )}
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
                              {/* <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
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
                              </div> */}
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
                              className="flex relative items-center space-x-4 bg-white p-4 rounded-lg shadow ring-1 ring-gray-300"
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
                                      {format(
                                        new Date(event?.date),
                                        "yyyy-MM-dd"
                                      )}
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
                              {/* <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
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
                              </div> */}
                              <Button
                                size="sm"
                                isLoading={loadingEvents[event._id] || false}
                                onPress={() => handleSendReminder(event._id)}
                                className=" rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                              >
                                Send Reminder
                              </Button>
                              <Button
                                onClick={() => {
                                  setIsDelete(!isDelete),
                                    SetUnsavedid(event?._id);
                                }}
                                isIconOnly
                                className="absolute top-0 right-0 rounded-sm text-[#F30278] bg-[#004AAD]/10"
                              >
                                <Trash2 />
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
                  {Theaterbooking.data?.length === 0 ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                      <p>No Bookings available</p>
                    </div>
                  ) : (
                    <>
                      {Theatererror === "No bookings found" ? (
                        <div className="flex justify-center items-center w-full h-[60vh]">
                          <p>No Bookings available</p>
                        </div>
                      ) : (
                        <div className="space-y-4 mt-4">
                          {Theaterbooking.data?.map((event) => (
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
                                      {format(
                                        new Date(event?.date),
                                        "yyyy-MM-dd"
                                      )}
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
                              {/* <div className="flex-shrink-0 space-y-2 text-blue-600 text-sm">
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
                              </div> */}
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
        )}
      </section>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isDelete}
        onOpenChange={setIsDelete}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to Delete?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  isLoading={delteloading}
                  onPress={() => {
                    Deletehandle(Unsavedid);
                  }}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#F30278] text-white"
                >
                  Yes
                </Button>
                <Button
                  size="md"
                  onPress={() => setIsDelete(false)}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#004AAD] text-white"
                >
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
