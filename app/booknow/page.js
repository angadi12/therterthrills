"use client";
import React, { Suspense, useEffect } from "react";
import Theaterbook from "@/public/asset/Theaterbook.png";
import Image from "next/image";
import BookingHeader from "@/components/Bookingcomponents/Dateselection";
import TheatreCard from "@/components/Bookingcomponents/Theatercard";
import TheatreCardSkeleton from "@/components/Bookingcomponents/TheatreCardSkeleton";
import { Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTheaters, fetchTheaterLocations } from "@/lib/Redux/theaterSlice";
import { setBookingField } from "@/lib/Redux/checkoutSlice";

const Page = () => {
  const dispatch = useDispatch();
  const {
    locationsWithSlots,
    allTheaters,
    loading,
    error,
    locationsWithSlotsloading,
    locationsWithSlotserror,
    date,
  } = useSelector((state) => state.theater);
 
  const formattedDate =
    date && !isNaN(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

  useEffect(() => {
    dispatch(fetchAllTheaters(formattedDate));
  }, [dispatch, formattedDate]);

  // if (error || locationsWithSlotserror) {
  //   return <p>Error: {error || locationsWithSlotserror}</p>;
  // }

  const isLoading = loading || locationsWithSlotsloading;
  const noData = !locationsWithSlots?.length && !allTheaters?.length && !isLoading;

useEffect(() => {
  dispatch(setBookingField({ field:"numberOfPeople", value:0 }));
}, [dispatch])



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
          <p className="absolute md:text-3xl text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2">
            Theatre Booking
          </p>
        </div>
        <BookingHeader />
        <div className="w-11/12 h-full mx-auto pb-20 grid md:grid-cols-3 grid-cols-1 gap-8 justify-center place-content-center items-stretch">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <TheatreCardSkeleton key={index} />
            ))
          ) : noData ? (
            <p className="col-span-3 text-center text-lg font-medium">
              No theaters available for the selected date.
            </p>
          ) : (
            (locationsWithSlots?.length === 0
              ? allTheaters
              : locationsWithSlots
            )?.map((theatre, index) => (
              <TheatreCard key={index} theatre={theatre} />
            ))
          )}
        </div>
      </main>
    </Suspense>
  );
};

export default Page;
