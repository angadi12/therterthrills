"use client";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Cake,
  Camera,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import Bookingimage from "@/public/asset/Bookingimage.png";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import RefundRequestModal from "./Requestrefund";

export default function ActiveBookingcard({ booking }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const formattedDate =
    booking?.date && !isNaN(new Date(booking?.date))
      ? format(new Date(booking?.date), "yyyy-MM-dd")
      : null;
  const formattedcancelDate =
    booking?.cancellationRequestDate &&
    !isNaN(new Date(booking?.cancellationRequestDate))
      ? format(new Date(booking?.cancellationRequestDate), "yyyy-MM-dd")
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
                  {booking?.Occasionobject}
                </h2>
                <p className="text-lg font-semibold text-[#F30278]">
                  Booking ID: {booking?.bookingId}
                </p>
                <p className="text-lg font-semibold text-[#F30278]">
                  Total: ₹{booking?.TotalAmount}/-
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
                    {booking?.numberOfPeople} Members
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{booking?.whatsappNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{booking?.email}</span>
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
                    {booking?.isEggless ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  Cake Text:{" "}
                  <span className="text-[#F30278]">{booking?.cakeText}</span>
                </p>
                <p>
                  Nick Name:{" "}
                  <span className="text-[#F30278]">{booking?.nickname}</span>
                </p>
                <p>
                  Partner Nickname:{" "}
                  <span className="text-[#F30278]">
                    {booking?.partnerNickname}
                  </span>
                </p>
                {booking?.Cakes &&
                  Object?.values(booking?.Cakes).map((cake, index) => (
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
                  {booking?.Addons?.decorations &&
                    Object.entries(booking.Addons.decorations).map(
                      ([key, value]) => (
                        <div key={key}>
                          {/* Render your content using key and value */}
                          {key}: {value}
                        </div>
                      )
                    )}
                  {booking?.Addons?.roses &&
                    Object?.entries(booking?.Addons?.roses).map(
                      ([name, count]) => (
                        <p key={name} className="text-sm">
                          {name} x{" "}
                          <span className="text-[#F30278]">{count}</span>
                        </p>
                      )
                    )}
                  {booking?.Addons?.photography.map((item, index) => (
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
                      {booking?.paymentStatus}
                    </span>
                  </span>
                </div>
                <p>
                  Amount Paid:{" "}
                  <span className="text-[#F30278]">
                    ₹
                    {booking?.paymentType === "full"
                      ? booking?.TotalAmount
                      : booking?.paymentAmount}
                    /-
                  </span>
                </p>
                <p>
                  Order ID:{" "}
                  <span className="text-[#F30278]">{booking?.orderId}</span>
                </p>
              </div>
              <Separator className="bg-[#F30278]" />
              {booking?.status === "cancelled" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#004AAD]">
                    Cancellation Details
                  </h3>
                  <div className="flex items-center mb-1">
                    <span>
                      Status:{" "}
                      <span className="text-[#F30278]">
                        {booking?.refundStatus}
                      </span>
                    </span>
                  </div>
                  <p>
                    Refund Amount :{" "}
                    <span className="text-[#F30278]">
                      ₹{booking?.refundAmount}/-
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      (will get refunds in 5-7 days.)
                    </span>
                  </p>
                  <p>
                    Reason:{" "}
                    <span className="text-[#F30278] text-xs">
                      {booking?.cancellationReason}
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
    </Dialog>
  );

  const BookingDetailsDrawer = () => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-[#004AAD]">Booking Details</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[80vh]">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 p-6">
            <div className="space-y-6 md:border-r md:pr-4 md:border-[#F30278]">
              <div>
                <h2 className="text-2xl font-bold text-[#004AAD]">
                  {booking?.Occasionobject}
                </h2>
                <p className="text-lg font-semibold text-[#F30278]">
                  Booking ID: {booking?.bookingId}
                </p>
                <p className="text-lg font-semibold text-[#F30278]">
                  Total: ₹{booking?.TotalAmount}/-
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
                    {booking?.numberOfPeople} Members
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{booking?.whatsappNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#004AAD]" />
                  <span className="text-sm">{booking?.email}</span>
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
                    {booking?.isEggless ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  Cake Text:{" "}
                  <span className="text-[#F30278]">{booking?.cakeText}</span>
                </p>
                <p>
                  Nick Name:{" "}
                  <span className="text-[#F30278]">{booking?.nickname}</span>
                </p>
                <p>
                  Partner Nickname:{" "}
                  <span className="text-[#F30278]">
                    {booking?.partnerNickname}
                  </span>
                </p>
                {booking?.Cakes &&
                  Object.values(booking?.Cakes).map((cake, index) => (
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
                  {booking?.Addons?.decorations &&
                    Object.entries(booking?.Addons?.decorations).map(
                      ([name, count]) => (
                        <p key={name} className="text-sm">
                          {name} x{" "}
                          <span className="text-[#F30278]">{count}</span>
                        </p>
                      )
                    )}
                  {booking?.Addons?.roses &&
                    Object.entries(booking?.Addons?.roses).map(
                      ([name, count]) => (
                        <p key={name} className="text-sm">
                          {name} x{" "}
                          <span className="text-[#F30278]">{count}</span>
                        </p>
                      )
                    )}
                  {booking?.Addons?.photography.map((item, index) => (
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
                      {booking?.paymentStatus}
                    </span>
                  </span>
                </div>
                <p>
                  Amount Paid:{" "}
                  <span className="text-[#F30278]">
                    ₹
                    {booking?.paymentType === "full"
                      ? booking?.TotalAmount
                      : booking?.paymentAmount}
                    /-
                  </span>
                </p>
                <p>
                  Order ID:{" "}
                  <span className="text-[#F30278]">{booking?.orderId}</span>
                </p>
              </div>
              <Separator className="bg-[#F30278]" />
              {booking?.status === "cancelled" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#004AAD]">
                    Cancellation Details
                  </h3>
                  <div className="flex items-center mb-1">
                    <span>
                      Status:{" "}
                      <span className="text-[#F30278]">
                        {booking?.refundStatus}
                      </span>
                    </span>
                  </div>
                  <p>
                    Refund Amount :{" "}
                    <span className="text-[#F30278]">
                      ₹{booking?.refundAmount}/-
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      (will get refunds in 5-7 days.)
                    </span>
                  </p>
                  <p>
                    Reason:{" "}
                    <span className="text-[#F30278] text-xs">
                      {booking?.cancellationReason}
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
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      <Card
        className={
          "w-full flex flex-col mx-auto justify-around items-center p-0 shadow-md relative"
        }
      >
        <CardHeader className="p-0 w-full">
          <div className="w-full relative p-0 h-48 overflow-hidden top-0">
            <Image
              src={booking?.theater?.images[0]}
              alt={`${booking.Occasionobject} booking`}
              width={200}
              height={200}
              className={`w-full h-48 object-fill rounded-t-lg transition-opacity duration-1000`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-2 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{booking.Occasionobject}</h2>
            <span className="text-xl font-bold text-[#F30278]">
              ₹{booking.TotalAmount}/-
            </span>
          </div>
          <Separator className="my-2" />
          <div className="bg-[#004AAD]/10 text-[#004AAD] rounded-md mb-4 p-2 w-full border-1 border-[#004AAD]">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="md:text-sm text-xs">{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="md:text-sm text-xs">
                  {booking?.numberOfPeople} Members
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="md:text-sm text-xs capitalize">
                  {booking?.theater?.location}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="md:text-sm text-xs">
                  {booking?.slot?.startTime}-{booking?.slot?.endTime}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Add - Ons</h3>
            <div className="grid grid-cols-2 gap-2">
              {booking?.Addons && (
                <>
                  {booking?.Addons?.photography.map((addon, index) => (
                    <div
                      key={index}
                      className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
                    >
                      {addon}
                    </div>
                  ))}

                  {Object.entries(booking?.Addons?.decorations).map(
                    ([name, count]) => (
                      <p
                        key={name}
                        className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
                      >
                        {name} x {count}
                      </p>
                    )
                  )}
                  {Object.entries(booking?.Addons?.roses).map(
                    ([name, count]) => (
                      <p
                        className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
                        key={name}
                      >
                        {name} x {count}
                      </p>
                    )
                  )}

                  {Object.values(booking?.Cakes).length > 0
                    ? Object.values(booking?.Cakes).map(
                        ({ id, name, quantity }) => (
                          <div key={id}>
                            <p className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]">
                              {name} x {quantity}
                            </p>
                          </div>
                        )
                      )
                    : ""}
                </>
              )}
            </div>
          </div>
        </CardContent>
        <Separator className="my-2 mx-auto" />
        <CardFooter className="grid grid-cols-2 justify-center items-center gap-2 w-full mt-auto">
          <Button
            className="px-8 py-0.5 rounded-sm w-full md:hidden block  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            onClick={() => setIsDrawerOpen(true)}
          >
            View Details
          </Button>
          <Button
            className="px-8 py-0.5 rounded-sm w-full hidden md:block  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            onClick={() => setIsModalOpen(true)}
          >
            View Details
          </Button>
          <RefundRequestModal booking={booking} />
          {booking.status === "cancelled" && (
            <Button
              size="sm"
              radius="full"
              variant="solid"
              color="danger"
              className="absolute top-4 right-4"
            >
              Cancelled
            </Button>
          )}
        </CardFooter>
        <BookingDetailsDialog />
        <BookingDetailsDrawer />
      </Card>

     
    </>
  );
}
