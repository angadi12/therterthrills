import React, { useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import { Input } from "@/components/ui/input";

const Cart = () => {
    const [couponCode, setCouponCode] = useState("");


    const handleApplyCoupon = () => {
        // Logic to apply coupon code
        console.log("Applying coupon:", couponCode);
      };
    


  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow ring-1 ring-gray-300">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-4 text-[#636363]">
          <div className="flex justify-between">
            <span>Theatre Price (Standard)</span>
            <span>1472/-</span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span>Add-Ons (6)</span>
            <span>1971/-</span>
          </div>
          <Divider />

          <div className="flex justify-between">
            <span>Food (12)</span>
            <span>2311/-</span>
          </div>
          <Divider />

          <div className="flex justify-between text-green-600">
            <span>Coupon Applied (1)</span>
            <span>-250/-</span>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <Button className="flex justify-between rounded-md h-12 bg-[#F30278] font-semibold w-full">
          <span className="text-white">Total Amount</span>
          <span className="text-white">4468/-</span>
        </Button>
      </div>
      {
        <div className="mt-6 flex items-center">
          <Input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="rounded-r-none h-12"
          />
          <Button
            onClick={handleApplyCoupon}
            className="rounded-l-none bg-[#F30278] text-white h-12"
          >
            Apply
          </Button>
        </div>
      }
    </div>
  );
};

export default Cart;
