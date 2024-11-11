"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

export default function Slidingoffer() {
  return (
    <div className="bg-[#D60000] overflow-hidden whitespace-nowrap  z-50 w-full sticky top-0">
      <Marquee pauseOnHover className="[--duration:10s]">
        <span className="text-white py-2 inline-block w-full">
          Hurry Up: Use Coupon &apos;THRILLS100&apos; to get 250 off from Nov
          1st to Nov 15th
        </span>
      </Marquee>
      {/* <div className="animate-marquee inline-block">
        <span className="text-white py-2 inline-block">
          Hurry Up: Use Coupon &apos;THRILLS100&apos; to get 250 off from Nov 1st to Nov 15th
        </span>
      </div> */}
    </div>
  );
}
