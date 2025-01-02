"use client";
import React, { useEffect, useState } from "react";
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
import TheatreCardSkeleton from "@/components/Bookingcomponents/TheatreCardSkeleton";
import { Tabs, Tab, Chip, Spinner } from "@nextui-org/react";
import { MonitorPlay, CalendarOff, ShoppingBag } from "lucide-react";
import ActiveBookingcard from "@/components/Bookingcomponents/Activebookingcard";

const Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  const [activeBookings, setActiveEvents] = useState([]);
  const [recentBookings, setRecentEvents] = useState([]);



  useEffect(() => {
    dispatch(fetchBookingByUserId(user?._id));
  }, [dispatch, user]);

  useEffect(() => {
    const today = new Date();
    const indianTimeOffset = 330; // IST is UTC+5:30
  
    // Convert a UTC date to IST and format it as 'yyyy-mm-dd'
    const convertToISTDateString = (utcDate) => {
      const date = new Date(utcDate);
      date?.setMinutes(date?.getMinutes() + indianTimeOffset); // Adjust for IST offset
      return date?.toISOString().split("T")[0]; // Extract 'yyyy-mm-dd' format
    };
  
    // Get today's IST date in 'yyyy-mm-dd' format
    const todayIST = convertToISTDateString(today);
  
    // Filter active events (today's bookings)
    const active =
    bookings?.filter((booking) => {
        const bookingDateIST = convertToISTDateString(booking?.date); // Convert booking date to IST
        return bookingDateIST >= todayIST; // Check if it's the same day
      }) || [];

    const recent =
    bookings?.filter((booking) => {
        const bookingDateIST = convertToISTDateString(booking?.date); // Convert booking date to IST
        return bookingDateIST < todayIST; // Check if it's the same day
      }) || [];
  
    // Update state
    setActiveEvents(active);
    setRecentEvents(recent)
  }, [bookings,dispatch,user]); // Dependencies for re-running effect


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

      <section className="md:w-11/12 w-full px-2 md:px-0 mx-auto flex flex-col gap-4 justify-center items-center md:py-20 py-4">
        <p className="md:text-3xl text-xl font-medium md:mb-8">My Bookings</p>
        <Tabs
          className="w-full"
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative   rounded-none p-2 border-b  border-divider",
            cursor: "w-full bg-[#F30278] ",
            tab: "w-full px-0 h-12 flex flex-col justify-center items-center",
            tabContent: "group-data-[selected=true]:text-[#004AAD] ",
          }}
        >
          <Tab
            key="Active"
            title={
              <div className="flex items-center space-x-2">
                <MonitorPlay className="text-tiny md:text-sm hidden md:block " />
                <span>Active Booking</span>
                <Chip
                  size="sm"
                  className=" hidden md:flex justify-center items-center"
                  color="danger"
                  variant={`${
                    activeBookings?.length === 0 ? "faded" : "solid"
                  }`}
                >
                  {activeBookings?.length}
                </Chip>
              </div>
            }
          >
            <div className="w-full mx-auto   md:py-6 grid md:grid-cols-3 grid-cols-1 justify-center items-stretch place-content-center gap-4 md:gap-8">
              {loading ? (
                <div className="flex justify-center items-center w-full h-60">
                  <Spinner color="danger" />
                </div>
              ) : (
                <>
                  {activeBookings?.length === 0 ? (
                    <p className="col-span-3  mx-auto text-center h-60 flex justify-center items-center w-full text-lg font-medium">
                      No Booking available.
                    </p>
                  ) : (
                    activeBookings?.map((booking, index) => (
                      <ActiveBookingcard key={index} booking={booking} />
                    ))
                  )}
                </>
              )}
            </div>
          </Tab>
          <Tab
            key="Recent"
            title={
              <div className="flex items-center space-x-2">
                <CalendarOff className=" hidden md:block" />
                <span>Recent Booking</span>
                <Chip
                  size="sm"
                  className=" hidden md:flex justify-center items-center"
                  color="danger"
                  variant={`${
                    recentBookings?.length === 0 ? "faded" : "solid"
                  }`}
                >
                  {recentBookings?.length}
                </Chip>
              </div>
            }
          >
            <div className="w-full md:py-6 mx-auto grid md:grid-cols-3 grid-cols-1 justify-center items-stretch place-content-center gap-4 md:gap-8">
              {loading ? (
                <div className="flex justify-center items-center w-full h-60">
                  <Spinner color="danger" />
                </div>
              ) : (
                <>
                  {recentBookings?.length === 0 ? (
                    <p className="col-span-3 mx-auto text-center h-60 flex justify-center items-center w-full text-lg font-medium">
                      No Booking available.
                    </p>
                  ) : (
                    recentBookings?.map((booking, index) => (
                      <Bookingcard key={index} booking={booking} />
                    ))
                  )}
                </>
              )}
            </div>
          </Tab>
          {/* <Tab
          key="Cart"
          title={
            <div className="flex items-center space-x-2">
             <ShoppingBag className=" hidden md:block" />
              <span>Cart</span>
              <Chip size="sm" className=" hidden md:flex justify-center items-center"  color="danger" variant="solid">0</Chip>
            </div>
          }
        >

        </Tab> */}
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
