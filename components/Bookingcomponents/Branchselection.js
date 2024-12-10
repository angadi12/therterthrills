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
import { Setselectedproccedbranchid } from "@/lib/Redux/bookingSlice";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import Branchcard from "./Branchcard";
import Branchcardskeleton from "./Branchcardskeleton";

export default function Branchselection() {
    const [selectedbranch,setselectedbranch]=useState("")
  const dispatch = useDispatch();
  const { branches, status } = useSelector((state) => state.branches);
  const { proccedwithbranchid } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);


  const filteredBranches = selectedbranch
  ? branches.filter((branch) => branch._id === selectedbranch)
  : branches;




  return (
    <div className="w-11/12 mx-auto md:py-12 py-6">
      <div className="flex justify-between items-center md:gap-8 gap-4 flex-col md:flex-row">
        <h1 className="md:text-4xl text-xl font-medium hidden md:block">
          Choose Your{" "}
          <span className="bg-clip-text font-bold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
            Branch location!
          </span>
        </h1>
        <div className="md:w-[400px] w-80 mx-auto">
          <label
            htmlFor="location-select"
            className="block text-sm font-medium text-[#F30278] mb-1"
          >
            Choose Branch Location
          </label>
          <Select
            onValueChange={(value) =>
              setselectedbranch(value)
            }
            value={selectedbranch}
          >
            <SelectTrigger
              id="location-select"
              className="w-full  h-12 flex items-center gap-2"
            >
              <SelectValue placeholder="Select location">
                {status === "loading" ? (
                  <Spinner color="danger" size="sm" />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="mr-2 h-4 w-4  text-[#F30278]" />
                    {/* {proccedwithbranchid || "Select location"} */}
                    {branches?.find(
                      (theater) => theater?._id === selectedbranch
                    )?.location || "Select location"}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {branches?.map((location) => (
                <SelectItem key={location} value={location._id}>
                  {location?.location} - {location?.Branchname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full h-full mx-auto py-20 grid md:grid-cols-3 grid-cols-1 gap-8 justify-center place-content-center items-stretch">
        {status === "loading" ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Branchcardskeleton key={index} />
          ))
        ) : filteredBranches?.length === 0? (
          <p className="col-span-3 text-center text-lg font-medium">
            No branches available 
          </p>
        ) : (
            filteredBranches?.map((branch, index) => (
            <Branchcard key={index} branch={branch} />
          ))
        )}
      </div>
    </div>
  );
}
