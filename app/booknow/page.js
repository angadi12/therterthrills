"use client";
import React, { Suspense, useEffect } from "react";
import Theaterbook from "@/public/asset/Theaterbook.png";
import Image from "next/image";
import BookingHeader from "@/components/Bookingcomponents/Dateselection";
import TheatreCard from "@/components/Bookingcomponents/Theatercard";
import Theaterimage from "@/public/asset/Theaterimage.png";
import Theaterimage2 from "@/public/asset/Theaterimage2.png";

import {
  fetchAllTheaters,
  fetchTheaterLocations,
} from "@/lib/Redux/theaterSlice";
import { useDispatch, useSelector } from "react-redux";
import TheatreCardSkeleton from "@/components/Bookingcomponents/TheatreCardSkeleton";
import { Spinner } from "@nextui-org/react";

const Page = () => {
  const dispatch = useDispatch();
  const {
    locationsWithSlots,
    allTheaters,
    loading,
    error,
    locationsWithSlotsloading,
    locationsWithSlotserror,
  } = useSelector((state) => state.theater);

  useEffect(() => {
    dispatch(fetchAllTheaters());
  }, [dispatch]);

  // if (loading || locationsWithSlotsloading) {
  //   return <div className="flex justify-center items-center h-screen"><Spinner color="danger"/></div>
  // }

  // Show a combined error state
  if (error || locationsWithSlotserror) {
    return <p>Error: {error || locationsWithSlotserror}</p>;
  }

  console.log(locationsWithSlots);
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner color="danger" />
        </div>
      }
    >
      <main>
        <div className="relative justify-center items-center w-full ">
          <Image
            src={Theaterbook}
            alt="Theatre Booking"
            className="relative brightness-50"
          />
          <p className="absolute text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2">
            Theatre Booking
          </p>
        </div>
        <BookingHeader />
        <div className="w-11/12 h-full mx-auto pb-20 grid grid-cols-3 gap-8 justify-center place-content-center items-stretch">
          {loading || locationsWithSlotsloading
            ? Array.from({ length: 6 }).map((_, index) => (
                <TheatreCardSkeleton key={index} />
              ))
            : locationsWithSlots?.length === 0
            ? allTheaters?.theaters?.map((theatre, index) => (
                <TheatreCard key={index} theatre={theatre} />
              ))
            : locationsWithSlots?.map((theatre, index) => (
                <TheatreCard key={index} theatre={theatre} />
              ))}
        </div>
      </main>
    </Suspense>
  );
};

export default Page;
