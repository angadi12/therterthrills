"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchcouponsByoffer } from "@/lib/Redux/couponSlice";

export default function Slidingoffer() {
  const dispatch = useDispatch();
  const { couponsoffer, couponloading, couponerror } = useSelector(
    (state) => state.coupon
  );

  useEffect(() => {
    dispatch(fetchcouponsByoffer());
  }, []);


  return (
    <>
   {couponsoffer?.length > 0 && <div className="bg-[#D60000] overflow-hidden whitespace-nowrap  lg:block z-50 w-full sticky top-0">
      <Marquee pauseOnHover className="[--duration:10s]">
        {couponsoffer?.length > 0 &&
          couponsoffer?.map((coupon, index) => (
            <span key={index} className="text-white md:py-2 inline-block w-full">
              {coupon}
            </span>
          ))}
      </Marquee>
    </div>}

    </>
  );
}
