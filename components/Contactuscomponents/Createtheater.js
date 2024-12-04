"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Createtheater } from "@/lib/API/Theater";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddTheaterForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openamentiy, Setamentiy] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    amenities: [],
    slots: [],
    price: "",
    minimumDecorationAmount: "",
    branch: "",
    images: [],
    status: "available",
  });

  const [slot, setSlot] = useState({ startTime: "", endTime: "", dates: [] });
  const [amenity, setAmenity] = useState("");
  const { toast } = useToast();
  const branches = useSelector((state) => state.branches.branches);
  const { opentheatre } = useSelector((state) => state.branches);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAmenity = () => {
    if (amenity) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }));
      setAmenity("");
    }
  };

  const handleAddSlot = () => {
    if (slot.startTime && slot.endTime) {
      setFormData((prev) => ({ ...prev, slots: [...prev.slots, slot] }));
      setSlot({ startTime: "", endTime: "", dates: [] });
    }
  };

  const handleSubmit = async () => {
    try {
      await Createtheater(formData);
      toast({
        title: "Theater added successfully!",
        description: "Theater added successfully!",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setFormData({
        name: "",
        location: "",
        capacity: "",
        amenities: [],
        slots: [],
        price: "",
        minimumDecorationAmount: "",
        branch: "",
        images: [],
        status: "available",
      });
    } catch (error) {
      toast({
        title: "Error adding theater",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ScrollArea className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12"
              placeholder="Theater Name"
              required
            />
            <Input
              name="location"
              className="h-12"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
          </div>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Input
              name="capacity"
              value={formData.capacity}
              className="h-12"
              onChange={handleChange}
              placeholder="Capacity"
              required
              type="number"
            />
            <Input
              name="price"
              className="h-12"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              type="number"
            />
          </div>

          <Input
            name="minimumDecorationAmount"
            className="h-12"
            value={formData.minimumDecorationAmount}
            onChange={handleChange}
            placeholder="Minimum Decoration Amount"
            required
            type="number"
          />

          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Select
              className="h-12"
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, branch: value }))
              }
              required
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches?.map((branch) => (
                  <SelectItem key={branch?._id} value={branch?._id}>
                    {branch?.Branchname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              className="h-12"
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
              required
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="coming soon">Coming Soon</SelectItem>
                <SelectItem value="under maintenance">
                  Under Maintenance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <Button
              className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              onClick={() => Setamentiy(!openamentiy)}
            >
              Add Amenity
            </Button>
            <Button
              className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              onClick={() => onOpen()}
            >
              ADD Time Slot
            </Button>
          </div>
          <Button
            onClick={handleSubmit}
            className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            Add Theater
          </Button>
        </div>
      </ScrollArea>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Time Slot
              </ModalHeader>
              <ModalBody>
                <Input
                  name="startTime"
                  value={slot.startTime}
                  onChange={(e) =>
                    setSlot({ ...slot, startTime: e.target.value })
                  }
                  placeholder="Start Time"
                  required
                />
                <Input
                  name="endTime"
                  value={slot.endTime}
                  onChange={(e) =>
                    setSlot({ ...slot, endTime: e.target.value })
                  }
                  placeholder="End Time"
                  required
                />
                <div>
                  {formData.slots.map((s, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{`${s.startTime} - ${s.endTime}`}</span>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                  onClick={handleAddSlot}
                >
                  Add Time Slot
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={openamentiy} onOpenChange={Setamentiy}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Amenity
              </ModalHeader>
              <ModalBody>
                <Textarea
                  name="amenity"
                  value={amenity}
                  onChange={(e) => setAmenity(e.target.value)}
                  placeholder="Enter an amenity"
                />
                <div>
                  {formData.amenities.map((a, index) => (
                    <span
                      key={index}
                      className="mr-2 inline-block bg-gray-200 px-3 py-1 rounded"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                  onClick={handleAddAmenity}
                >
                  Add Amenity
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTheaterForm;
