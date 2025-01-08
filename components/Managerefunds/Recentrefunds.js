import { selectDateRange } from "@/lib/Redux/BookingdateSlice";
import {
  fetchBookingByBranchId,
  fetchBookingById,
  fetchBookingByTheaterId,
} from "@/lib/Redux/bookingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge, Chip } from "@nextui-org/react";
import { Cake, Camera, Phone, Mail, CreditCard } from "lucide-react";
import {
  Filter,
  Plus,
  MapPin,
  Users,
  Calendar,
  Clock,
  Info,
} from "lucide-react";
import { format } from "date-fns";
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
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchRefundBookingByBranchId,
  fetchRefundBookingByTheaterId,
  initiateRefund,
} from "@/lib/Redux/RefundSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CreatRefund } from "@/lib/API/Refund";

const Recentrefunds = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isrefundOpen, setIsrefundModalOpen] = useState(false);
  const [bookId, Setbookid] = useState("");
  const [paymentid, Setpaymentid] = useState("");
  const [amount, setAmount] = useState("");
  const [instantRefund, setInstantRefund] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const refundData = {
      paymentId: paymentid,
      amount: amount,
      reason: comment,
    };

    try {
      const response = await CreatRefund(refundData);
      if (response.success === true) {
        toast({
          title: "Refund issued successfully!",
          description: "Refund has been issued",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setIsrefundModalOpen(false)
        dispatch(
          fetchBookingByBranchId({
            BranchId: selectedBranchId,
            status: "cancelled",
            startDate: reduxStartDate,
            endDate: reduxEndDate,
          })
        );
        dispatch(
          fetchRefundBookingByTheaterId({
            TheaterId: Selectedtheaterbyid,
            status: "cancelled",
            startDate: reduxStartDate,
            endDate: reduxEndDate,
          })
        );

      } else {
        toast({
          title: "Failed!",
          description: "Failed to issue refund. Please try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred while issuing the refund.",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = (amount, id, reason) => {
    setAmount(amount);
    Setpaymentid(id);
    setComment(reason);
  };

  useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const { Selectedtheaterbyid, singlebooking, bookingloading, bookingerror } =
    useSelector((state) => state.booking);
  const {
    RefundTheaterbooking,
    RefundTheaterloading,
    RefundTheatererror,

    RefundAllTheaterbooking,
    RefundAllTheaterloading,
    RefundAllTheatererror,
  } = useSelector((state) => state.refunds);
  const { startDate: reduxStartDate, endDate: reduxEndDate } =
    useSelector(selectDateRange);

  useEffect(() => {
    if (Selectedtheaterbyid === "all") {
      dispatch(
        fetchRefundBookingByBranchId({
          BranchId: selectedBranchId,
          status: "cancelled",
          startDate: reduxStartDate,
          endDate: reduxEndDate,
        })
      );
    } else {
      dispatch(
        fetchRefundBookingByTheaterId({
          TheaterId: Selectedtheaterbyid,
          status: "cancelled",
          startDate: reduxStartDate,
          endDate: reduxEndDate,
        })
      );
    }
  }, [
    Selectedtheaterbyid,
    selectedBranchId,
    reduxStartDate,
    reduxEndDate,
    dispatch,
  ]);

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
  const formattedcancelDate =
    singlebooking?.cancellationRequestDate &&
    !isNaN(new Date(singlebooking?.cancellationRequestDate))
      ? format(new Date(singlebooking?.cancellationRequestDate), "yyyy-MM-dd")
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
                    Coupon applied :-{" "}
                    {singlebooking?.coupon && (
                      <p className="text-[#F30278] bg-[#F30278]/20 text-sm ring-1 ring-[#F30278] rounded-full px-2">
                        {singlebooking?.coupon}
                      </p>
                    )}
                  </div>
                </div>
                <Separator className="bg-[#F30278]" />
                {singlebooking?.status === "cancelled" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#004AAD]">
                      Cancellation Details
                    </h3>
                    <div className="flex items-center mb-1">
                      <span>
                        Status:{" "}
                        <span className="text-[#F30278]">
                          {singlebooking?.refundStatus}
                        </span>
                      </span>
                    </div>
                    <p>
                      Refund Amount :{" "}
                      <span className="text-[#F30278]">
                        ₹{singlebooking?.refundAmount}/-
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        (will get refunds in 5-7 days.)
                      </span>
                    </p>
                    <p>
                      Reason:{" "}
                      <span className="text-[#F30278] text-xs">
                        {singlebooking?.cancellationReason}
                      </span>
                    </p>
                    <p>
                      Date:{" "}
                      <span className="text-[#F30278] text-xs">
                        {formattedcancelDate}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );

  return (
    <>
      <BookingDetailsDialog />

      <div className="w-full flex flex-col justify-center items-center h-auto py-4 px-4  mx-auto">
        {(
          Selectedtheaterbyid === "all"
            ? RefundAllTheaterloading
            : RefundTheaterloading
        ) ? (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <Spinner color="danger" />
          </div>
        ) : (
          <>
            {(Selectedtheaterbyid === "all" &&
              RefundAllTheaterbooking?.data?.length === 0) ||
            (Selectedtheaterbyid !== "all" &&
              RefundTheaterbooking?.data?.length === 0) ? (
              <div className="flex justify-center items-center w-full h-[60vh]">
                <p>No Bookings available</p>
              </div>
            ) : (
              <>
                {(Selectedtheaterbyid === "all"
                  ? RefundAllTheatererror
                  : RefundTheatererror) === "No bookings found" ? (
                  <div className="flex justify-center items-center w-full h-[60vh]">
                    <p>No Bookings available</p>
                  </div>
                ) : (
                  <div className="space-y-4 w-full">
                    {(Selectedtheaterbyid === "all"
                      ? RefundAllTheaterbooking?.data
                      : RefundTheaterbooking?.data
                    )?.map((event) => (
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

                        <Button
                          onPress={() => {
                            setIsModalOpen(!isModalOpen), Setbookid(event?._id);
                          }}
                          className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                        >
                          View Details
                        </Button>
                        {event?.refundStatus === "requested" &&
                          event?.status === "cancelled" && (
                            <Dialog open={isrefundOpen} onOpenChange={setIsrefundModalOpen}>
                              <DialogTrigger>
                                <button
                                  onClick={() =>
                                    handleClick(
                                      event?.refundAmount,
                                      event?.paymentId,
                                      event?.cancellationReason
                                    )
                                  }
                                  className="px-8 py-0.5 rounded-sm h-10  border-none bg-red-500 text-white  "
                                >
                                  Issue Refund
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <div className="flex items-center justify-between">
                                    <DialogTitle className="text-xl font-semibold text-gray-700">
                                      Refund Payment
                                    </DialogTitle>
                                  </div>
                                </DialogHeader>
                                <form
                                  onSubmit={handleSubmit}
                                  className="space-y-6"
                                >
                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="amount"
                                      className="text-gray-600"
                                    >
                                      Refund Amount{" "}
                                      <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative items-center flex">
                                      <span className="absolute left-3 top-2 text-gray-500">
                                        ₹
                                      </span>
                                      <Input
                                        id="amount"
                                        type="text"
                                        value={amount}
                                        onChange={(e) =>
                                          setAmount(e.target.value)
                                        }
                                        className="pl-7"
                                        placeholder="Enter amount"
                                      />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      This will be a{" "}
                                      <span className="font-medium">
                                        full refund
                                      </span>
                                      . Change amount for a partial refund.
                                    </p>
                                  </div>

                                  {/* <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg">
                                    <Checkbox
                                      id="instant"
                                      checked={instantRefund}
                                      onCheckedChange={(checked) =>
                                        setInstantRefund(checked)
                                      }
                                    />
                                    <div className="flex items-center space-x-2">
                                      <Label
                                        htmlFor="instant"
                                        className="text-sm font-medium"
                                      >
                                        Refund Instantly
                                      </Label>
                                      <Info className="h-4 w-4 text-gray-400" />
                                    </div>
                                  </div> */}

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="comment"
                                      className="text-gray-600"
                                    >
                                      Comment Description
                                    </Label>
                                    <Textarea
                                      id="comment"
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      placeholder="Enter comment"
                                      className="min-h-[100px]"
                                    />
                                  </div>

                                  <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    onPress={handleSubmit}
                                    className="px-8 py-0.5 rounded-sm w-full  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                                  >
                                    Issue refund
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Recentrefunds;
