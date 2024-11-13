"use client";
import { Star, Users, Wine } from "lucide-react";
import { Button} from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Groupicon2 from "@/public/asset/Groupicon2.png";
import Decorations from "@/public/asset/Decorations.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Cakeicon from "@/public/asset/Cakeicon.png";
import refundicon from "@/public/asset/refundicon.png";
import TVicon from "@/public/asset/TVicon.png";
import Speakericon from "@/public/asset/Speakericon.png";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function TheatreCard({ theatre }) {
  const router = useRouter();
  const { toast } = useToast();

  const [currentImage, setCurrentImage] = useState(0);
  const icon = [Groupicon2, Cakeicon, refundicon, TVicon, Speakericon];
  const [upcomingSlots, setUpcomingSlots] = useState([]);
  const {selectedLocation } = useSelector(
    (state) => state.theater
  );
  useEffect(() => {
    if (theatre?.slots?.length > 0) {
      const now = new Date();

      const filteredSlots = theatre.slots.filter((slot) => {
        // Convert slot start time to a comparable Date object
        const [startHours, startMinutes] = slot.startTime.match(/\d+/g);
        const startPeriod = slot.startTime.includes("PM") && +startHours < 12 ? 12 : 0;
        const slotDate = new Date();
        slotDate.setHours(+startHours + startPeriod, +startMinutes, 0, 0);

        return slotDate > now; // Only include future slots
      });

      setUpcomingSlots(filteredSlots);
    }
  }, [theatre?.slots]);



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % theatre?.images?.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleProceed = () => {
    if (!selectedLocation) {
      toast({
        title: "Please Select a Location",
        description:'Please select your location to continue booking.',
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });    } 
  };



  return (
    <>
    <Card className="w-full flex flex-col mx-auto justify-around items-center p-0 relative">
      {/* {isBestSeller && (
            <span className="absolute rounded-full top-2 right-2 bg-[#FFA800] text-white text-xs font-bold px-2 py-1 ">
              Best Seller
            </span>
          )} */}
      <div className="p-0 w-full">
        <div className="w-full relative p-0 h-48 overflow-hidden">
          {theatre?.images?.map((src, index) => (
            <>
              {currentImage === index && (
                <Image
                  key={index}
                  src={src}
                  width={200}
                  height={200}
                  alt={`Theater image ${index + 1}`}
                  className={`w-full h-48 object-fill rounded-t-l transition-opacity duration-1000`}
                />
              )}
            </>
          ))}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {theatre?.images?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImage ? "bg-[#F30278]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-[#FFA128] fill-[#FFA128]" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-[#6B6B6B]">
              {4} Reviews
            </span>
          </div>
          <span className="font-bold text-lg">{theatre?.price}/-</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{theatre?.name}</h3>
        <div className="flex gap-2 mb-4">
          <span className="bg-pink-100 ring-1 ring-[#F30278] text-xs text-[#F30278] px-2 py-2 font-semibold rounded flex items-center">
            <Image src={Groupicon2} alt="grp" className="w-3 h-3 mr-1" />{" "}
            {theatre?.capacity} People Capacity
          </span>
          <span className="bg-pink-100 text-[#F30278] ring-1 ring-[#F30278] text-xs font-semibold px-2 py-1 rounded flex items-center">
            <Image src={Decorations} alt="Alcohol" className="w-3 h-3 mr-1" />{" "}
            Decorations-{theatre?.minimumDecorationAmount}/-
          </span>
        </div>
        {theatre?.amenities && theatre?.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-bold mb-2">Theatre Overview</h4>
            <div className="flex justify-start items-start gap-2 w-full flex-col text-xs">
              {(theatre?.amenities ?? []).map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 justify-start items-center"
                >
                  <Image
                    src={icon[index]}
                    alt={item}
                    className="object-contain "
                  />
                  <p className="text-[#7A7A7A] font-medium " key={index}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {theatre?.slots && theatre?.slots.length > 0 && (
          <div className="mt-auto">
            <h4 className="font-bold mb-2">Choose Slot</h4>
            <div className="grid grid-cols-2 gap-2 ">
              {(upcomingSlots ?? []).map((slot, index) => (
                <Button
                  key={index}
                  variant={
                    index === (upcomingSlots?.length ?? 0) - 1
                      ? "default"
                      : "outline"
                  }
                  className="w-full ring-1 ring-[#F30278] text-[#F30278] rounded-sm"
                >
                  {slot?.startTime}-{slot?.endTime}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex flex-col justify-center items-center gap-3 w-full px-4">
        <Button
          onPress={handleProceed}
          className="px-8 py-0.5 rounded-sm w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Procced{" "}
        </Button>
        <p className="text-[#7A7A7A]">(Book at just 750/- now)</p>
      </CardFooter>
    </Card>
    </>
  );
}
