"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Monitor } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBranchdetails } from "@/lib/Redux/BranchSlice";
import axios from "axios";
import { BaseUrl } from "@/lib/API/Baseurl";

const Fetchadminandtheater = ({ branchi }) => {
  const [branchData, setBranchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (branchi) {
      setLoading(true);
      setError(null);

      axios
        .get(`${BaseUrl}/Branch/details-by-branch/${branchi}`)
        .then((response) => {
          setBranchData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching branch data:", err);
          setError("Failed to fetch branch data");
          setLoading(false);
        });
    }
  }, [branchi]);

  if (loading) {
    return <SkeletonLoader />;
  }


console.log(branchData)

  //   const dispatch = useDispatch();
  //   const { branchDetailsData, branchDetailsloading, branchDetailserror } =
  //     useSelector((state) => state.branches);

  //   useEffect(() => {
  //     if (branchi) {
  //       dispatch(fetchBranchdetails(branchi));
  //     }
  //   }, [branchi, dispatch]);

  //   if (branchDetailsloading) {
  //     return <SkeletonLoader />;
  //   }

  //   console.log(branchDetailsData);

  return (
    <div className="flex space-x-2 ">
      <Badge
        variant="secondary"
        className="flex items-center  bg-slate-200 space-x-1"
      >
        <Users className="h-3 w-3 text-[#434343]" />
        <span className="text-[#434343]">
        {branchData?.data?.adminCount} Admins
        </span>
      </Badge>
      <Badge
        variant="secondary"
        className="flex items-center bg-slate-200 space-x-1"
      >
        <Monitor className="h-3 w-3 text-[#434343]" />
        <span className="text-[#434343]">
        {branchData?.data?.theaterCount} Theatres
        </span>
      </Badge>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="flex space-x-2">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-28" />
    </div>
  );
};

export default Fetchadminandtheater;
