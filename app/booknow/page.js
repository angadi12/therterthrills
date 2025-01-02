"use client";
import React, { Suspense, useEffect } from "react";
import Theaterbook from "@/public/asset/Theaterbook.png";
import Image from "next/image";
import BookingHeader from "@/components/Bookingcomponents/Dateselection";
import TheatreCard from "@/components/Bookingcomponents/Theatercard";
import TheatreCardSkeleton from "@/components/Bookingcomponents/TheatreCardSkeleton";
import { Button, Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTheaters,
  fetchTheaterLocations,
} from "@/lib/Redux/theaterSlice";
import { setBookingField } from "@/lib/Redux/checkoutSlice";
import Branchselection from "@/components/Bookingcomponents/Branchselection";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    locationsWithSlots,
    allTheaters,
    loading,
    error,
    locationsWithSlotsloading,
    locationsWithSlotserror,
    date,
  } = useSelector((state) => state.theater);
  const { proccedwithbranchid } = useSelector((state) => state.booking);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
  const noData = !locationsWithSlots?.length && !isLoading;

  useEffect(() => {
    dispatch(setBookingField({ field: "numberOfPeople", value: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (!proccedwithbranchid) {
      onOpen();
    }
  }, []);

  return (
    <>
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
          <div className="w-11/12 h-full mx-auto pb-20 grid md:grid-cols-2 grid-cols-1 gap-8 justify-center place-content-center items-stretch">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <TheatreCardSkeleton key={index} />
              ))
            ) : noData ? (
              <p className="col-span-3 text-center text-lg font-medium">
                No theaters available for the selected date and locations.
              </p>
            ) : (
              locationsWithSlots?.map((theatre, index) => (
                <TheatreCard key={index} theatre={theatre} />
              ))
            )}
          </div>
        </main>
      </Suspense>

      <Modal
        hideCloseButton={true}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Branch not selected
          </ModalHeader>
          <ModalBody className="flex flex-col gap-1 text-center">
            <p className="text-sm ">Please select Branch before proceeding</p>
          </ModalBody>
          <ModalFooter className="flex justify-center items-center">
            <Button
              onPress={() => router.push("/choosebranch")}
              className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Choose Branch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Page;
