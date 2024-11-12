"use client";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
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

const fetchLocations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
};

export default function BookingHeader() {
  const [date, setDate] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      setIsLoading(true);
      const fetchedLocations = await fetchLocations();
      setLocations(fetchedLocations);
      setIsLoading(false);
    };

    getLocations();
  }, []);

  
  return (
    <div className="w-11/12 mx-auto py-12">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-4xl font-medium">
          Book Your{" "}
          <span className="bg-clip-text font-bold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
            Private Theatre
          </span>
          <br />
          Experience Today!
        </h1>
        <div className="w-[400px]">
          <label
            htmlFor="location-select"
            className="block text-sm font-medium text-[#F30278] mb-1"
          >
            Choose Location
          </label>
          <Select onValueChange={setSelectedLocation} value={selectedLocation}>
            <SelectTrigger
              id="location-select"
              className="w-full  h-12 flex items-center gap-2"
            >
              <SelectValue placeholder="Select location">
                {isLoading ? (
                  "Loading locations..."
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="mr-2 h-4 w-4  text-[#F30278]" />
                    {selectedLocation || "Select location"}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[400px] justify-start h-12 text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#F30278]" />
                {date ? format(date, "PPP") : <span>Choose Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Calendar
                className={""}
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
