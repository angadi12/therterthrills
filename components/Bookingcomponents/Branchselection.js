"use client";

import { useEffect, useState } from "react";
import { MapPin } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import Branchcard from "./Branchcard";
import Branchcardskeleton from "./Branchcardskeleton";

export default function Branchselection() {
  const [selectedbranch, setselectedbranch] = useState("");
  const dispatch = useDispatch();
  const { branches, status } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const filteredBranches = selectedbranch
    ? branches?.filter((branch) => branch?._id === selectedbranch)
    : branches;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-medium text-center">
          Choose Your{" "}
          <span className="bg-clip-text font-bold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
            Branch location!
          </span>
        </h1>
        <div className="w-full max-w-md">
          <label
            htmlFor="location-select"
            className="block text-sm font-medium text-[#F30278] mb-1 text-center"
          >
            Choose Branch Location
          </label>
          <Select
            onValueChange={(value) => setselectedbranch(value)}
            value={selectedbranch}
          >
            <SelectTrigger
              id="location-select"
              className="w-full h-12 flex items-center gap-2"
            >
              <SelectValue placeholder="Select location">
                {status === "loading" ? (
                  <Spinner color="danger" size="sm" />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="mr-2 h-4 w-4 text-[#F30278]" />
                    {branches?.find(
                      (theater) => theater?._id === selectedbranch
                    )?.location || "Select location"}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {status === "loading" ? (
                <Spinner color="danger" size="sm" />
              ) : branches?.length > 0 ? (
                branches.map((location) => (
                  <SelectItem key={location._id} value={location._id}>
                    {location?.location} - {location?.Branchname}
                  </SelectItem>
                ))
              ) : (
                <div className="p-1 text-center text-sm">
                  No Branches available
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={`mt-12 grid ${filteredBranches?.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8 place-items-center max-w-7xl mx-auto`}>
        {status === "loading" ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Branchcardskeleton key={index} />
          ))
        ) : filteredBranches?.length === 0 ? (
          <p className="col-span-full text-center text-lg font-medium">
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

