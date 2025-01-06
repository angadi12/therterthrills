"use client";
import { Star, Users, Wine, CircleChevronRight } from "lucide-react";
import { Button, Divider } from "@nextui-org/react";
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
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  setSelectedTheater,
  setSelectedSlotid,
} from "@/lib/Redux/theaterSlice";

export default function TheatreCard({ theatre }) {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState(0);
  const icon = [Groupicon2, Cakeicon, refundicon, TVicon, Speakericon];
  const { selectedLocation, selectedslotsid, selectedTheater, date } =
    useSelector((state) => state.theater);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % theatre?.images?.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  console.log(theatre);

  const handleProceedWithValidation = () => {
    // Dispatch the selected theater
    dispatch(setSelectedTheater(theatre?.theaterId));

    // Validate and proceed
    setTimeout(() => {
      let error = null;

      if (!selectedLocation) {
        error = {
          title: "Please Select a Location",
          description: "Please select your location to continue booking.",
        };
      } else if (!theatre?.theaterId) {
        error = {
          title: "Theater Not Selected",
          description: "Please select a theater to continue.",
        };
      } else if (!selectedslotsid) {
        error = {
          title: "Theater Slot Not Selected",
          description: "Please select a theater slot to continue.",
        };
      } else if (!date) {
        error = {
          title: "Date Not Selected",
          description: "Please select a date to continue.",
        };
      }

      if (error) {
        toast({
          title: error.title,
          description: error.description,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else {
        router.push("/checkout");
      }
    }, 0); // Small timeout ensures Redux state is updated
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
          <div className="w-full relative md:py-4 p-0 h-80 rounded-t-lg  overflow-hidden">
            {theatre?.images?.map((src, index) => (
              <>
                {currentImage === index && (
                  <Image
                    key={index}
                    src={src}
                    width={190}
                    height={400}
                    alt={`Theater image ${index + 1}`}
                    className={`md:w-11/12 w-full h-80 object-fill mx-auto   rounded-t-lg transition-opacity duration-1000`}
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
        <CardContent className="py-4 w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <p className="text-[#F30278] rounded-full p-2 text-sm font-medium ring-1 ring-[#F30278] bg-[#F30278]/20">For {theatre?.capacity} people @{theatre?.price} </p>
              {/* <p>{theatre?.name} {theatre?.capacity} {theatre?.price}</p> */}
              {/* {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "text-[#FFA128] fill-[#FFA128]" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-[#6B6B6B]">
                {4} Reviews
              </span> */}
            </div>
            <span className="font-bold text-lg">{theatre?.price}/-</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold mb-2">{theatre?.name}</h3>
            {theatre?.availableSlots.length > 0 && (
              <p className="text-white md:text-sm text-xs px-2 bg-[#F30278] rounded-full p-1">{`${theatre?.availableSlots.length} slots available`}</p>
            )}
          </div>
          <div className="flex gap-2 mb-2">
            <span className="bg-pink-100 ring-1 ring-[#F30278] text-xs text-[#F30278] px-2 py-2 font-semibold rounded flex items-center">
              <Image src={Groupicon2} alt="grp" className="w-3 h-3 mr-1" />{" "}
              {theatre?.groupSize} Max Capacity
            </span>
            <span className="bg-pink-100 text-[#F30278] ring-1 ring-[#F30278] text-xs font-semibold px-2 py-1 rounded flex items-center">
              <Image src={Decorations} alt="Alcohol" className="w-3 h-3 mr-1" />{" "}
              Decorations-{theatre?.minimumDecorationAmount}/-
            </span>
          </div>
          <Divider />
          {theatre?.amenities && theatre?.amenities.length > 0 && (
            <div className="mb-4">
              <h4 className="font-bold mb-2">Theatre Overview</h4>
              <div className="flex justify-start items-start gap-2 w-full flex-col text-xs">
                {(theatre?.amenities ?? []).map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 justify-start items-start"
                  >
                    <CircleChevronRight size={15} className="text-[#F30278] " />
                    <p className="text-[#7A7A7A] font-medium " key={index}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Divider />
          {theatre?.slots && theatre?.slots?.length > 0 ? (
            <div className="mt-auto">
              <h4 className="font-bold mb-2">Choose Slot</h4>
              <div className="grid grid-cols-2 gap-2 ">
                {theatre?.slots.map((slot, index) => {
                  // Check if the slot is available
                  const isAvailable = theatre?.availableSlots.some(
                    (availableSlot) =>
                      availableSlot?.startTime === slot?.startTime &&
                      availableSlot?.endTime === slot?.endTime
                  );

                  return (
                    <Button
                      key={index}
                      onPress={() =>
                        isAvailable && dispatch(setSelectedSlotid(slot?._id))
                      }
                      disabled={!isAvailable} // Disable if the slot is not available
                      variant={isAvailable ? "outline" : "default"}
                      className={`w-full text-xs md:text-sm ${
                        selectedslotsid === slot?._id && isAvailable
                          ? "bg-[#F30278] text-white"
                          : isAvailable
                          ? "ring-1 ring-[#F30278] text-[#F30278]"
                          : "line-through text-gray-400 ring-1 ring-gray-400 cursor-not-allowed"
                      } rounded-sm`}
                    >
                      {slot?.startTime} - {slot?.endTime}
                    </Button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex justify-center w-full items-center py-2">
              <p className="text-[#F30278] font-medium text-sm">
                No Slots available
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="mt-auto flex flex-col justify-center items-center gap-3 w-full px-4">
          <Button
            isDisabled={
              !selectedslotsid || // No slot selected
              !theatre?.slots.some((slot) => slot._id === selectedslotsid) // Selected slot doesn't belong to this theater
            }
            onPress={handleProceedWithValidation}
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
