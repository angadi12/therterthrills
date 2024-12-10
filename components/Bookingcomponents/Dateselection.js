"use client";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin } from "lucide-react";
import { format, isBefore, startOfToday } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTheaterLocations,
  fetchLocationsAndSlots,
  setSelectedLocation,
  setDate,
} from "@/lib/Redux/theaterSlice"; 
import { Spinner } from "@nextui-org/react";

export default function BookingHeader() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useDispatch();
  const { locations, locationsloading, date, selectedLocation} = useSelector(
    (state) => state.theater
  );
  const { proccedwithbranchid } = useSelector((state) => state.booking);

  const formattedDate =
    date && !isNaN(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

  useEffect(() => {
    dispatch(fetchTheaterLocations(proccedwithbranchid));
  }, [selectedLocation]);

  const payload = { location: selectedLocation, date: formattedDate };

  useEffect(() => {
    if (selectedLocation && date) {
      dispatch(fetchLocationsAndSlots(payload));
    }
  }, [selectedLocation, date, dispatch]);

  const isPastDate = (date) => isBefore(date, startOfToday());

  const handleDateSelect = (selectedDate) => {
    dispatch(setDate(selectedDate?.toISOString())); // Store valid date string
    setPopoverOpen(false); // Close the popover after selecting a date
  };

useEffect(()=>{
 if(locations?.length>0){
  dispatch(setSelectedLocation(locations[0]))
 }
},[dispatch,locations])

  return (
    <div className="w-11/12 mx-auto md:py-12 py-6">
      <div className="flex justify-between items-center md:gap-8 gap-4 flex-col md:flex-row">
        <h1 className="md:text-4xl text-xl font-medium hidden md:block">
          Book Your{" "}
          <span className="bg-clip-text font-bold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
            Private Theatre
          </span>
          <br />
          Experience Today!
        </h1>
        <div className="md:w-[400px] w-80 mx-auto">
          <label
            htmlFor="location-select"
            className="block text-sm font-medium text-[#F30278] mb-1"
          >
            Choose Theatre Location
          </label>
          <Select
            onValueChange={(value) => dispatch(setSelectedLocation(value))}
            value={selectedLocation}
          >
            <SelectTrigger
              id="location-select"
              className="w-full  h-12 flex items-center gap-2"
            >
              <SelectValue placeholder="Select location">
                {locationsloading ? (
                  <Spinner color="danger" size="sm" />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="mr-2 h-4 w-4  text-[#F30278]" />
                    {selectedLocation || "Select location"}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {locationsloading ? (
                <Spinner color="danger" size="sm" />
              ) : locations?.length > 0 ? (
                locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-1 text-center text-sm ">
                    No theaters available
                  </div>
                )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="date-picker"
            className="block text-sm font-medium  text-[#F30278] mb-1"
          >
            Choose Date
          </label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setPopoverOpen(!popoverOpen)}
                variant={"outline"}
                className={`md:w-[400px] w-80 justify-start h-12 text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#F30278]" />
                {date ? format(date, "PPP") : <span>Choose Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="md:w-[400px] w-full mx-auto p-0 ">
              <Calendar
                className={""}
                mode="single"
                selected={date ? new Date(date) : null} // Ensure `date` is passed as a Date object
                onSelect={handleDateSelect}
                disabled={isPastDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
