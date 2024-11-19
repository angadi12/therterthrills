"use client"
import React from "react";
import { setBookingField, setValidationError } from "@/lib/Redux/checkoutSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
const BookingDetails = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { bookingDetails, validationErrors } = useSelector(
      (state) => state.checkout
    );

    
      const handleInputChange = (field, value) => {
        dispatch(setBookingField({ field, value }));
      };
    
      
    


  return (
    <div className="md:col-span-2">
      <div className="bg-white p-6 rounded-md shadow ring-1 ring-gray-300">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <div className="space-y-7">
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4">
            <Input
              placeholder="Full Name"
              className="h-12"
              value={bookingDetails.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />

            <Select
              value={bookingDetails.numberOfPeople}
              onValueChange={(value) =>
                handleInputChange("numberOfPeople", value)
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="No. of people" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4">
            <Input
              placeholder="Phone Number"
              className="h-12"
              value={bookingDetails.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />

            <Input
              placeholder="Whatsapp Number"
              className="h-12"
              value={bookingDetails.whatsappNumber}
              onChange={(e) =>
                handleInputChange("whatsappNumber", e.target.value)
              }
            />
          </div>
          <Input
            placeholder="Email Id"
            type="email"
            className="h-12"
            value={bookingDetails.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <div>
            <p className="text-sm text-gray-600 mb-2">{`Do you want to add decorations to your event? (Extra Charge)`}</p>
            <Select
              value={bookingDetails.addDecorations}
              onValueChange={(value) =>
                handleInputChange("addDecorations", value)
              }
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
