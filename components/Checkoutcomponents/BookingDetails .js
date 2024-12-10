"use client";
import React, { useEffect } from "react";
import { setaddDecorations, setBookingField, setextraperson, setgroupSize, setMaxcapacity, setValidationError } from "@/lib/Redux/checkoutSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingDetails = ({ theater }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { bookingDetails, validationErrors ,addDecorations} = useSelector(
    (state) => state.checkout
  );

  useEffect(() => {
    if (theater) {
      dispatch(setextraperson(theater?.extraPerPerson));
      dispatch(setMaxcapacity(theater?.maxCapacity));
      dispatch(setgroupSize(theater?.groupSize));
    }
  }, [theater]);

  const handleInputChange = (field, value) => {
    dispatch(setBookingField({ field, value }));
  };

  const handleadddecoration = (value) => {
    dispatch(setaddDecorations(value));
  };
  


  return (
    <div className="md:col-span-2">
      <div className="bg-white p-6 rounded-md shadow ring-1 ring-gray-300">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <div className="space-y-7">
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4">
            <div className="w-full flex flex-col gap-1 items-start">
              <Label className="mb-2">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Full Name"
                className="h-12"
                value={bookingDetails?.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-1 items-start">
            <Label className="mb-2">
            {theater?.groupSize} Capacity - Max {theater?.maxCapacity}
                <span className="text-red-500">*</span>
              </Label>
              {/* <Input
              placeholder={theater?.groupSize}
              className="h-12"
              disabled 
              value={theater?.groupSize}
            /> */}
              <Select
                value={bookingDetails?.numberOfPeople}
                onValueChange={(value) =>
                  handleInputChange("numberOfPeople", value)
                }
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="No. of people" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: theater?.maxCapacity - theater?.groupSize + 1 },
                    (_, index) => theater?.groupSize + index
                  ).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4">
            {/* <div className="w-full flex flex-col gap-1 items-start">
              <Label>
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Phone Number"
                className="h-12"
                value={bookingDetails.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div> */}

            <div className="w-full flex flex-col gap-1 items-start">
            <Label className="mb-2">
            Whatsapp Number <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Whatsapp Number"
                className="h-12"
                value={bookingDetails?.whatsappNumber}
                onChange={(e) =>
                  handleInputChange("whatsappNumber", e.target.value)
                }
              />
            </div>
          <div className="w-full flex flex-col gap-1 items-start">
              <Label className="mb-2">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Email Id"
              type="email"
              className="h-12"
              value={bookingDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">{`Do you want to add decorations to your event? (Extra Charge)`}</p>
            <Select
              value={addDecorations}
              onValueChange={handleadddecoration}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
