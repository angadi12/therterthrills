"use client";
import React, { useEffect } from "react";
import Mybookings from "@/public/asset/Mybookings.png";
import Image from "next/image";
import Bookingcard from "@/components/Bookingcomponents/Bookingcard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingByUserId,
  selectBookingError,
  selectBookingLoading,
  selectBookings,
} from "@/lib/Redux/bookingSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);

  useEffect(() => {
    dispatch(fetchBookingByUserId(user?._id));
  }, [dispatch, user]);

  return (
    <main className="pb-20 md:pb-0">
      <div className="relative justify-center items-center w-full ">
        <Image
          src={Mybookings}
          alt="about us"
          className="relative brightness-50"
        />
        <p className="absolute md:text-3xl text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2">
          My Bookings
        </p>
      </div>

      <section className="w-11/12 mx-auto flex flex-col gap-4 justify-center items-start md:py-20 py-8">
        <p className="md:text-3xl text-xl font-medium md:mb-8">My Bookings</p>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 justify-center items-stretch place-content-center gap-4">
          {bookings &&
            bookings.map((booking, index) => (
              <Bookingcard key={index} booking={booking} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
