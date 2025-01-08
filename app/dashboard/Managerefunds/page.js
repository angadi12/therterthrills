"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Allrefunds from "@/components/Managerefunds/Allrefunds";
import Recentrefunds from "@/components/Managerefunds/Recentrefunds";
import BookingDatePicker from "@/components/Dashboardcomponent/Bookingdaterange";
import { Setselectedtheaterid } from "@/lib/Redux/bookingSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
import { Spinner } from "@nextui-org/react";

const Refunds = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("Refund Request");
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const { Selectedtheaterbyid } = useSelector((state) => state.booking);

useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [selectedBranchId, dispatch]);

  useEffect(() => {
    if (branchtheatre?.length > 0) {
      dispatch(Setselectedtheaterid("all"));
    }
  }, [branchtheatre, dispatch, selectedBranchId]);


  return (
    <>
      <section className="flex justify-center items-center w-full h-auto flex-col mx-auto ">
        <div className="w-full justify-start items-start gap-4  bg-white z-20 sticky top-0">
          <div className="w-full px-4 py-4 text-start flex justify-between items-center">
            <p className="text-lg font-semibold w-60">Manage Refunds</p>
            <div className="flex items-center justify-end space-x-2  w-full col-span-2 ">
             { selected === "All Refunds" && <BookingDatePicker />}

            { selected !== "All Refunds" && <Select
                onValueChange={(value) => dispatch(Setselectedtheaterid(value))}
                value={Selectedtheaterbyid}
              >
                <SelectTrigger
                  id="location-select"
                  className="w-60 h-12 border-1 border-[#F30278]/60 flex items-center rounded-sm gap-2"
                >
                  <SelectValue placeholder="Select Theater">
                    {branchtheatreloading ? (
                      <Spinner color="danger" size="sm" />
                    ) : (
                      <div className="flex items-center gap-2">
                        {Selectedtheaterbyid === "all"
                          ? "All Theatres"
                          : branchtheatre?.find(
                              (theater) => theater?._id === Selectedtheaterbyid
                            )?.name || "Select Theatre"}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {branchtheatreloading ? (
                    <div className="p-2 text-center">Loading theaters...</div>
                  ) : branchtheatre?.length > 0 ? (
                    <>
                      <SelectItem value="all">All Theaters</SelectItem>
                      {branchtheatre.map((theater) => (
                        <SelectItem key={theater?._id} value={theater?._id}>
                          {theater?.name}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <div className="p-1 text-center text-sm ">
                      No theaters available
                    </div>
                  )}
                </SelectContent>
              </Select>}
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-4 ">
            <div>
              <Tabs
                selectedKey={selected}
                onSelectionChange={setSelected}
                aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0 ",
                  cursor: "w-full bg-[#205093]",
                  tab: "w-auto px-0 h-10",
                  tabContent:
                    "group-data-[selected=true]:text-[#205093] font-semibold",
                }}
              >
                <Tab
                  key="Refund Request"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Refund Request</span>
                    </div>
                  }
                />
                <Tab
                  key="All Refunds"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>All Refunds</span>
                    </div>
                  }
                />
              </Tabs>
            </div>
          </div>
          <Divider />
        </div>

        <div className="w-full flex flex-col gap-4 justify-start items-start  mx-auto  h-auto mt-4 rounded-sm">
          {selected === "All Refunds" && <Allrefunds />}
          {selected === "Refund Request" && <Recentrefunds />}
        </div>
      </section>
    </>
  );
};

export default Refunds;
