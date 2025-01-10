"use client";

import { setDate, setSelectedSlotid } from "@/lib/Redux/theaterSlice";
import { format, isBefore, startOfToday } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@nextui-org/react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@nextui-org/react";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  fetchBookingByBranchId,
  fetchTheaterslotbyid,
  setSelectedtheatreSlotid,
} from "@/lib/Redux/bookingSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { fetchChangeslot } from "@/lib/Redux/bookingSlice";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import { selectDateRange } from "@/lib/Redux/BookingdateSlice";

const ChangeSlotDialog = ({ booking }) => {
  const { toast } = useToast();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.theater);
    const { startDate: reduxStartDate, endDate: reduxEndDate } =
    useSelector(selectDateRange);
const { selectedBranchId } = useSelector((state) => state.branches);

  const {
    Availableslots,
    loadingslots,
    slotsserror,
    SelectedtheatreSlotid,
    Changeslots,
    Changeloadingslots,
    Changeslotsserror,
  } = useSelector((state) => state.booking);

  const handleDateSelect = (selectedDate) => {
    dispatch(setDate(selectedDate?.toISOString()));
    setPopoverOpen(false);
  };

  const isPastDate = (date) => isBefore(date, startOfToday());

  const formattedDate =
    date && !isNaN(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

  const payload = { theaterId: booking?.theater?._id, date: formattedDate };

  useEffect(() => {
    if (booking && date) {
      dispatch(fetchTheaterslotbyid(payload));
    }
  }, [booking, date, dispatch]);

  const bookedSlot = booking?.slot;

  // Filter available slots excluding the booked slot
  const filteredSlots = Availableslots?.slots?.find(
    (slot) => slot?._id === bookedSlot
  );

  const data = {
    bookingId: booking?._id,
    theaterId: booking?.theater?._id,
    slotId: SelectedtheatreSlotid,
    date: formattedDate,
  };

  // const handlechangeslot = async () => {
  //   if (!SelectedtheatreSlotid) {
  //     toast({
  //       title: "Slot not selected",
  //       description: "Please select a slot before proceeding.",
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //     return;
  //   }

  //   try {
  //     await dispatch(fetchChangeslot(data)).unwrap();
  //     toast({
  //       title: "Slot Changed Successfully",
  //       description: "The slot has been updated.",
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //     dispatch(
  //       fetchBookingByBranchId({
  //         BranchId: selectedBranchId,
  //         status: "Upcoming",
  //         startDate: reduxStartDate,
  //         endDate: reduxEndDate,
  //       })
  //     );
  //     setDialogOpen(false);
  //   } catch (error) {
  //     toast({
  //       title: "Error Changing Slot",
  //       description: Changeslotsserror || "Failed to update the slot.",
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //   }
  // };
  const handlechangeslot = async () => {
    if (!SelectedtheatreSlotid) {
      toast({
        title: "Slot not selected",
        description: "Please select a slot before proceeding.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }
  
    try {
      // Attempt to change the slot
      await dispatch(fetchChangeslot(data)).unwrap();
  
      // Success toast
      toast({
        title: "Slot Changed Successfully",
        description: "The slot has been updated.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
  
      setDialogOpen(false);
  
      // Fetch updated bookings
      dispatch(
        fetchBookingByBranchId({
          BranchId: selectedBranchId,
          status: "upcoming",
          startDate: reduxStartDate,
          endDate: reduxEndDate,
        })
      );
    } catch (error) {
      console.error("Error during slot change:", error);
  
      // Extract error message as string
      const errorMessage = error?.message || error?.toString() || "Failed to update the slot.";
  
      // Error toast
      toast({
        title: "Error Changing Slot",
        description: errorMessage,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  };
  
  

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="solid"
          color="warning"
          className="text-white rounded-sm w-full"
        >
          Change Slot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Change Slot</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col justify-center items-start w-full gap-4">
          <div className="flex items-center gap-4">
            <p className="ring-1 ring-[#F30278] text-[#F30278] p-1 px-2 rounded-full">
              Booking Date :- {format(booking?.date, "PPP")}
            </p>
            <p className="ring-1 ring-[#F30278] text-[#F30278] p-1 px-2 rounded-full">
              Booking Slot Time :- {filteredSlots?.startTime}-
              {filteredSlots?.endTime}
            </p>
          </div>
          <h4 className="font-bold text-left">Choose Slot</h4>

          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="h-auto w-full">
              <Popover
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
                className="z-50 overflow-visible"
              >
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => setPopoverOpen((prev) => !prev)}
                    variant={"bordered"}
                    className={`w-full justify-start rounded-sm h-10 text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#F30278]" />
                    {date ? format(date, "PPP") : <span>Choose Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  onClick={(e) => e.stopPropagation()}
                  className=" w-full mx-auto p-0 z-50 overflow-visible"
                >
                  <Calendar
                    className={"z-50"}
                    mode="single"
                    selected={date ? new Date(date) : null}
                    onSelect={handleDateSelect}
                    disabled={isPastDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              isLoading={loadingslots}
              //   onClick={handlesubmit}
              className="px-8 py-1 rounded-sm w-full h-10 border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
            >
              Fetch Slot
            </Button>
          </div>
          <div className="w-full h-60 mt-4">
            {loadingslots ? (
              <div className="flex justify-center items-center h-full">
                <Spinner color="danger" size="lg" />
              </div>
            ) : slotsserror ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">{slotsserror}</p>
              </div>
            ) : Availableslots?.availableSlots &&
              Availableslots.availableSlots.length > 0 ? (
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-2">
                  {Availableslots.slots.map((slot, index) => {
                    // Check if the slot is available
                    const isAvailable = Availableslots.availableSlots.some(
                      (availableSlot) =>
                        availableSlot.startTime === slot.startTime &&
                        availableSlot.endTime === slot.endTime
                    );

                    return (
                      <Button
                        key={index}
                        onClick={() =>
                          isAvailable &&
                          dispatch(setSelectedtheatreSlotid(slot._id))
                        }
                        disabled={!isAvailable}
                        variant={isAvailable ? "outline" : "default"}
                        className={`w-full text-xs md:text-sm ${
                          SelectedtheatreSlotid === slot._id && isAvailable
                            ? "bg-[#F30278] text-white"
                            : isAvailable
                            ? "ring-1 ring-[#F30278] text-[#F30278]"
                            : "line-through text-gray-400 ring-1 ring-gray-400 cursor-not-allowed"
                        } rounded-sm`}
                      >
                        {slot.startTime} - {slot.endTime}
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
          </div>
        </section>
        <DialogFooter className="sm:justify-end">
          <Button
            className="w-48 rounded-sm"
            variant="solid"
            color="danger"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            isLoading={Changeloadingslots}
            className="px-8 py-1 rounded-sm w-48 h-10 border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
            onClick={handlechangeslot}
          >
            Change Slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSlotDialog;
