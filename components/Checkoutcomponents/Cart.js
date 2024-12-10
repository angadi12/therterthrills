"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalAmount } from "@/lib/Redux/addOnsSlice";
import { setTotalAmount } from "@/lib/Redux/totalAmountSlice";
import { setExtraCharge } from "@/lib/Redux/checkoutSlice";
import { ApplyCouponapi } from "@/lib/API/Coupon";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Cookies from "js-cookie";

import {
  setCoupon,
  setCouponError,
  clearCoupon,
} from "@/lib/Redux/couponSlice";

const validCoupons = {
  WELCOME250: 250,
  FESTIVE100: 100,
  DISCOUNT50: 50,
};

const Cart = ({ theater }) => {
  const dispatch = useDispatch();
  const [couponInput, setCouponInput] = useState("");
  const { toast } = useToast();

  // const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { couponCode, discount, isCouponApplied, error,deviceId } = useSelector(
    (state) => state.coupon
  );
  const { selectedTheater} =
  useSelector((state) => state.theater);

  const selectedCakes = useSelector((state) => state.cakes.selectedCakes);
  const addonsTotal = useSelector(selectTotalAmount);
  const { addDecorations } = useSelector((state) => state.checkout);
  const totalAmount = useSelector((state) => state.totalAmount.value);

  const decorationPrice =
    addDecorations === "yes" ? theater.minimumDecorationAmount : 0;

  const {
    bookingDetails,
    maxCapacity,
    extraPerPerson,
    groupSize,
    ExtraCharge,
  } = useSelector((state) => state.checkout);

  // Calculate total price of selected cakes
  const calculateTotalCakesPrice = () => {
    return Object.values(selectedCakes).reduce(
      (total, cake) => total + cake.price * cake.quantity,
      0
    );
  };

  const calculateTotalAddonsPrice = () => {
    return Object.values(selectedAddons).reduce(
      (total, addon) => total + addon.price * addon.quantity,
      0
    );
  };

  useEffect(() => {
    // Calculate extra charge when numberOfPeople or maxCapacity changes
    if (bookingDetails?.numberOfPeople > groupSize) {
      // Calculate the number of people exceeding the group size
      const extraPeople = bookingDetails?.numberOfPeople - groupSize;
      // Calculate the extra charge
      const extraAmount = extraPeople * extraPerPerson;
      dispatch(setExtraCharge(extraAmount)); // Dispatch the extra charge to Redux
    } else {
      dispatch(setExtraCharge(0)); // No extra charge if within group size
    }
  }, [bookingDetails?.numberOfPeople, groupSize, extraPerPerson, dispatch]);

  // Calculate the total amount (cakes + addons + theatre - coupon)
  const calculateTotalAmount = () => {
    const cakesTotal = calculateTotalCakesPrice();
    const theatrePrice = theater.price;

    return (
      theatrePrice +
      addonsTotal +
      cakesTotal +
      decorationPrice +
      ExtraCharge -
      (isCouponApplied ? discount : 0)
    );
  };

  useEffect(() => {
    const totalAmount = calculateTotalAmount();
    dispatch(setTotalAmount(totalAmount)); // Dispatch the calculated total amount
  }, [
    selectedCakes,
    addonsTotal,
    decorationPrice,
    isCouponApplied,
    discount,
    bookingDetails?.numberOfPeople,
    ExtraCharge,
  ]);

  const handleApplyCoupon = async () => {
    setLoading(true);
    dispatch(setCouponError(""));


    const encodedUserData = Cookies.get("User");

    if (!encodedUserData) {
      return null;
    }
    const decodedUserData = decodeURIComponent(encodedUserData);
    const userData = JSON.parse(decodedUserData);

    try {
      const response = await ApplyCouponapi({
        couponCode: couponInput,
        orderValue: calculateTotalAmount(),
        theaterId:selectedTheater,
        userId:userData?._id,
        deviceId:deviceId
      });

      if (response.status === "success") {
        dispatch(
          setCoupon({
            couponCode: couponInput,
            discount: response.data.discountAmount,
          })
        );
        toast({
          title: "Coupon applied",
          description: "Coupon applied",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        dispatch(setCouponError(""));
      } else {
        dispatch(setCouponError(response.message));
        toast({
          title: "failed",
          description: response.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        dispatch(clearCoupon());
      }
    } catch (err) {
      dispatch(setCouponError("Failed to apply coupon. Please try again."));
      toast({
        title: "failed",
        description:"Failed to apply coupon. Please try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      dispatch(clearCoupon());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow ring-1 ring-gray-300">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-4 text-[#636363]">
          <div className="flex justify-between">
            <span>Theatre Price (Standard)</span>
            <span>{theater?.price}/-</span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span>Decoration</span>
            <span>{decorationPrice}/-</span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span>Add-Ons </span>
            <span>{addonsTotal}/-</span>
          </div>
          <Divider />

          {/* Total Cakes Quantity and Price */}
          <div className="flex justify-between">
            <span>Cakes ({Object.keys(selectedCakes).length})</span>
            <span>{calculateTotalCakesPrice()}/-</span>
          </div>
          <Divider />

          <div className="flex justify-between text-green-600">
            <span>
              Coupon Applied {isCouponApplied ? `(${couponCode})` : "(None)"}
            </span>
            <span>-{isCouponApplied ? discount : 0}/-</span>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {isCouponApplied && <p onClick={()=>dispatch(clearCoupon())} className="text-red-500 cursor-pointer text-sm mt-2">Remove coupon</p>}
        </div>
      </div>
      <div className="mt-6 flex items-center">
        <Input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponInput(e.target.value)}
          className="rounded-r-none h-12"
        />
        <Button
          onClick={handleApplyCoupon}
          className="rounded-l-none bg-[#F30278] text-white h-12"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </Button>
      </div>
      <div className="w-full mt-4">
        <Button className="flex justify-between rounded-md h-12 bg-[#F30278] font-semibold w-full">
          <span className="text-white">Total Amount</span>
          <span className="text-white">{totalAmount}/-</span>{" "}
          {/* Adjust total calculation */}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
