"use client";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapPin, Calendar, Clock, Users, Cake, Camera, Phone, Mail, CreditCard } from "lucide-react"
import Bookingimage from "@/public/asset/Bookingimage.png";
import { format } from "date-fns";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Bookingcard({ booking }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate =
    booking?.date && !isNaN(new Date(booking?.date))
      ? format(new Date(booking?.date), "yyyy-MM-dd")
      : null;

      const BookingDetailsDialog = () => (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[900px] h-auto flex flex-col">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow">
              <div className="grid grid-cols-2 gap-8 p-6">
                <div className="space-y-6 border-r pr-4 border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold">{booking?.Occasionobject}</h2>
                    <p className="text-lg font-semibold text-primary">Booking ID: {booking?.bookingId}</p>
                    <p className="text-lg font-semibold text-primary">Total: ₹{booking?.TotalAmount}/-</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{booking?.numberOfPeople} Members</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">{booking?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">{booking?.email}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cake Details</h3>
                    <p>Eggless: {booking?.isEggless ? "Yes" : "No"}</p>
                    <p>Cake Text: {booking?.cakeText}</p>
                    <p>Nick Name: {booking?.nickname}</p>
                    <p>Partner Nickname: {booking?.partnerNickname}</p>
                    {Object.values(booking?.selectedCakes).map((cake, index) => (
                      <p key={index} className="text-sm">
                        {cake?.name} x {cake?.quantity} - ₹{cake?.price * cake?.quantity}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Add-Ons</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(booking?.addOns?.decorations).map(([name, count]) => (
                        <p key={name} className="text-sm">
                          {name} x {count}
                        </p>
                      ))}
                      {Object.entries(booking?.addOns?.roses).map(([name, count]) => (
                        <p key={name} className="text-sm">
                          {name} x {count}
                        </p>
                      ))}
                      {booking?.addOns?.photography.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                    <div className="flex items-center mb-2">
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span>Status: {booking?.paymentStatus}</span>
                    </div>
                    <p>Amount Paid: ₹{booking?.paymentAmount}/-</p>
                    <p>Order ID: {booking?.orderId}</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )

  return (
    // <Card className="w-full flex flex-col mx-auto justify-around items-center p-0 relative">
    //   <div className="p-0 w-full relative top-0">
    //   <div className="w-full relative p-0 h-48 overflow-hidden top-0">
    //   <Image
    //         src={booking?.theater?.images[0]}
    //         alt={`theater image`}
    //         width={200}
    //         height={200}
    //         className={`w-full h-48 object-fill rounded-t-l transition-opacity duration-1000`}
    //         />
    //     </div>
    //   </div>
    //   <CardContent className="p-4 w-full">
    //     <div className="flex justify-between items-center mb-4">
    //       <h2 className="text-xl font-bold">{booking?.Occasionobject}</h2>
    //       <span className="text-xl font-bold text-[#F30278]">
    //         {booking?.TotalAmount}/-
    //       </span>
    //     </div>
    //     <Divider className="my-2 w-full mx-auto" />
    //     <div className="bg-[#F30278] text-white p-3 rounded-md mb-4">
    //       <div className="grid grid-cols-2 gap-4">
    //         <div className="flex items-center">
    //           <MapPin className="w-4 h-4 mr-2" />
    //           <span className="text-sm">{booking?.theater?.location}</span>
    //         </div>
    //         <div className="flex items-center">
    //           <Calendar className="w-4 h-4 mr-2" />
    //           <span className="text-sm">{formattedDate}</span>
    //         </div>
    //         <div className="flex items-center">
    //           <Clock className="w-4 h-4 mr-2" />
    //           <span className="text-sm">
    //             {booking?.slot?.startTime}-{booking?.slot?.endTime} time
    //           </span>
    //         </div>
    //         <div className="flex items-center">
    //           <Users className="w-4 h-4 mr-2" />
    //           <span className="text-sm">{booking?.numberOfPeople} Members</span>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <h3 className="text-lg font-semibold mb-2">Add - Ons</h3>
    //       <div className="grid grid-cols-2 gap-2">
    //         {booking?.addOns && (
    //           <>
    //             {booking?.addOns?.photography.map((addon, index) => (
    //               <div
    //                 key={index}
    //                 className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
    //               >
    //                 {addon}
    //               </div>
    //             ))}

    //             {Object.entries(booking?.addOns?.decorations).map(
    //               ([name, count]) => (
    //                 <p
    //                   key={name}
    //                   className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
    //                 >
    //                   {name} x {count}
    //                 </p>
    //               )
    //             )}
    //             {Object.entries(booking?.addOns?.roses).map(([name, count]) => (
    //               <p
    //                 className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
    //                 key={name}
    //               >
    //                 {name} x {count}
    //               </p>
    //             ))}

    //             {Object.values(booking?.selectedCakes).length > 0
    //               ? Object.values(booking?.selectedCakes).map(
    //                   ({ id, name, quantity }) => (
    //                     <div key={id}>
    //                       <p className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]">
    //                         {name} x {quantity}
    //                       </p>
    //                     </div>
    //                   )
    //                 )
    //               : ""}
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </CardContent>
    //   <Divider className="my-2 w-11/12 mx-auto" />
    //   <CardFooter>
    //     <Button
    //       onPress={() => setIsModalOpen(true)}
    //       className="w-full bg-blue-600 hover:bg-blue-700 rounded-none text-white"
    //     >
    //       View Details
    //     </Button>
    //   </CardFooter>
    //   <BookingDetailsDialog/>
    // </Card>
    <Card className="w-full flex flex-col mx-auto justify-around items-center p-0 relative">
    <CardHeader className="p-0 w-full">
    <div className="w-full relative p-0 h-48 overflow-hidden top-0"> 
           <Image
           src={booking?.theater?.images[0]}
          alt={`${booking.Occasionobject} booking`}
          width={200}
         height={200}
          className={`w-full h-48 object-fill rounded-t-l transition-opacity duration-1000`}        />
      </div>
    </CardHeader>
    <CardContent className="p-2 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{booking.Occasionobject}</h2>
        <span className="text-xl font-bold text-[#F30278]">₹{booking.TotalAmount}/-</span>
      </div>
      <Separator className="my-2" />
      <div className="bg-[#F30278] text-primary-foreground p-3 rounded-md mb-4 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{booking.numberOfPeople} Members</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{booking?.theater?.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{booking?.slot?.startTime}-{booking?.slot?.endTime}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Add - Ons</h3>
        <div className="grid grid-cols-2 gap-2">
        {booking?.addOns && (
              <>
                {booking?.addOns?.photography.map((addon, index) => (
                  <div
                    key={index}
                    className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
                  >
                    {addon}
                  </div>
                ))}

                {Object.entries(booking?.addOns?.decorations).map(
                  ([name, count]) => (
                    <p
                      key={name}
                      className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
                    >
                      {name} x {count}
                    </p>
                  )
                )}
                {Object.entries(booking?.addOns?.roses).map(([name, count]) => (
                  <p
                    className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]"
                    key={name}
                  >
                    {name} x {count}
                  </p>
                ))}

                {Object.values(booking?.selectedCakes).length > 0
                  ? Object.values(booking?.selectedCakes).map(
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
    <CardFooter className="flex justify-center items-center w-full mt-auto">
      <Button
            className="px-8 py-0.5 rounded-sm w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            onClick={() => setIsModalOpen(true)}
      >
        View Details
      </Button>
    </CardFooter>
    <BookingDetailsDialog />
  </Card>
  );
}
