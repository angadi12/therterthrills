import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Upadtetheatre, Gettheaterbyid } from "@/lib/API/Theater";
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
  fetchtheaterbybranchid,
  setopentheatre,
  setopenupdatetheatre,
} from "@/lib/Redux/theaterSlice";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const UpdateTheaterForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openamentiy, Setamentiy] = useState(false);
  const [Loading, Setloading] = useState(false);
  const dispatch = useDispatch();
  const { Updatetheaterid, openupdatetheatre } = useSelector(
    (state) => state.theater
  );
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    maxCapacity: "",
    branch: "",
    groupSize: "",
    Locationlink: "",
    price: "",
    minimumDecorationAmount: "",
    extraPerPerson: "",
    amenities: [],
    slots: [{ startTime: "", endTime: "", dates: [] }],
    images: [],
    status: "available",
  });

  const { toast } = useToast();
  const branches = useSelector((state) => state.branches.branches);
  const { selectedBranchId } = useSelector((state) => state.branches);
  const [loadingData, setLoadingData] = useState(true);
  const [amenity, setAmenity] = useState("");
  const [images, setImages] = useState([]);

  const isValidObjectId = (Updatetheaterid) =>
    /^[0-9a-fA-F]{24}$/.test(Updatetheaterid);

  useEffect(() => {
    const fetchTheatreData = async () => {
      if (!isValidObjectId(Updatetheaterid)) {
        toast({
          title: "Invalid branch ID",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setLoadingData(false);
        return;
      }

      setLoadingData(true);
      try {
        const result = await Gettheaterbyid(Updatetheaterid);
        if (result) {
          setFormData({
            name: result?.name || "",
            location: result?.location || "",
            maxCapacity: result?.maxCapacity || "",
            branch: result?.branch || "",
            groupSize: result?.groupSize || "",
            Locationlink: result?.Locationlink || "",
            price: result?.price || "",
            minimumDecorationAmount: result?.minimumDecorationAmount || "",
            extraPerPerson: result?.extraPerPerson || "",
            amenities: result?.amenities || [],
            slots: result?.slots || [{ startTime: "", endTime: "", dates: [] }],
            images: result?.images || [],
            status: result?.status || "available",
          });
        } else {
          toast({
            title: "Failed to fetch branch data",
            description: result.message,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } catch (error) {
        toast({
          title: "An error occurred while fetching branch data",
          description: error,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } finally {
        setLoadingData(false);
      }
    };

    if (Updatetheaterid) {
      fetchTheatreData();
    }
  }, [Updatetheaterid]);

  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   if (files) {
  //     const fileObjects = Array.from(files).map((file) => ({
  //       file, // Store the file for form submission
  //       preview: URL.createObjectURL(file), // Store the preview URL
  //     }));
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       images: [...prevData.images, ...fileObjects],
  //     }));
  //   }
  // };

  // const handleRemoveImage = (index) => {
  //   setFormData((prevData) => {
  //     // Revoke the object URL to avoid memory leaks
  //     URL.revokeObjectURL(prevData.images[index].preview);

  //     // Remove the image from the array
  //     const updatedImages = prevData.images.filter((_, i) => i !== index);
  //     return { ...prevData, images: updatedImages };
  //   });
  // };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const fileObjects = Array.from(files).map((file) => ({
        file, // Store the file for form submission
        preview: URL.createObjectURL(file), // Store the preview URL
      }));
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...fileObjects],
      }));

      // Reset the file input to allow re-uploading the same file
      event.target.value = null;
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(prevData.images[index].preview);

      // Remove the image from the array
      const updatedImages = prevData.images.filter((_, i) => i !== index);
      return { ...prevData, images: updatedImages };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleAddAmenity = () => {
  //   if (amenity) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       amenities: [...prev.amenities, amenity],
  //     }));
  //     setAmenity("");
  //   }
  // };
  const handleAddSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots, { startTime: "", endTime: "" }],
    });
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = formData.slots.filter((_, i) => i !== index);
    setFormData({ ...formData, slots: updatedSlots });
  };

  const handleAddAmenity = () => {
    setFormData({
      ...formData,
      amenities: [...formData.amenities, amenity],
    });
    setAmenity("");
  };

  const handleRemoveAmenity = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const validate = () => {
    if (!formData.name) return "name is required";
    // if (!formData.Locationlink) return "Location link is required";
    if (!formData.location) return "Location is required";
    if (!formData.price) return "Theatre price is required";
    if (!formData.branch) return "branch  is required";
    if (!formData.slots) return "Theatre slots is required";
    if (!formData.status) return "Theatre status is required";
    if (!formData.images) return "images are required";
    if (!formData.amenities) return "amenities are required";
    if (!formData.extraPerPerson) return "extra Per Person charge  is required";
    if (!formData.groupSize) return "Min Capacity is required";
    if (!formData.minimumDecorationAmount)
      return "Decoration amount is required";
    if (!formData.maxCapacity) {
      return "Max Capacity  is required";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast({
        title: "failed",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }

    Setloading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("Locationlink", formData.Locationlink);
    data.append("branch", formData.branch);
    data.append("maxCapacity", formData.maxCapacity);
    data.append("groupSize", formData.groupSize);
    data.append("price", formData.price);
    data.append("minimumDecorationAmount", formData.minimumDecorationAmount);
    data.append("extraPerPerson", formData.extraPerPerson);
    data.append("status", formData.status);
    formData.amenities.forEach((amenity, index) =>
      data.append(`amenities[${index}]`, amenity)
    );
    formData.slots.forEach((slot, index) => {
      data.append(`slots[${index}][startTime]`, slot.startTime);
      data.append(`slots[${index}][endTime]`, slot.endTime);
    });
    formData.images.forEach((image) => data.append("images", image.file));

    try {
      const result = await Upadtetheatre(data, Updatetheaterid);
      if (result.status === true) {
        toast({
          title: "Theater updated successfully!",
          description: "Theater updated successfully!",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        Setloading(false);
        dispatch(setopenupdatetheatre(!openupdatetheatre));
        dispatch(fetchtheaterbybranchid(selectedBranchId));

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
      } else {
        Setloading(false);
        toast({
          title: "Error updating theater",
          description: "Error updating theater",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating theater",
        description: error.message,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      Setloading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {loadingData ? (
        <div className="w-full flex justify-center items-center h-60">
          <Spinner color="danger" />
        </div>
      ) : (
        <ScrollArea className="flex flex-col justify-center items-center gap-4 ">
          <div className="flex flex-col justify-center items-center gap-4 p-4">
          
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Theatre name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12"
                  placeholder="Theatre Name"
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Theatre Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="location"
                  className="h-12"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </div>
            </div>
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Max Capacity <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className="h-12"
                  placeholder="Enter Max Capacity"
                  required
                  type="number"
                />
              </div>
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Min Capacity <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="groupSize"
                  className="h-12"
                  value={formData.groupSize}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Enter Min  Capacity"
                  type="number"
                />
              </div>
            </div>

            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Theatre Price <span className="text-red-500">*</span>
                </Label>
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
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Extra Person Charge <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="extraPerPerson"
                  className="h-12"
                  value={formData.extraPerPerson}
                  onChange={handleChange}
                  placeholder="Extra person charge"
                  required
                  type="number"
                />
              </div>
            </div>

            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              
              <div className="w-full flex flex-col gap-1 items-start">
                  <Label className="mb-2">
                  Select Branch  <span className="text-red-500">*</span>
                  </Label>
                <Select
                  className="h-12"
                  value={formData?.branch}
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
                  </div>
                  <div className="w-full flex flex-col gap-1 items-start">
                  <Label className="mb-2">
                  Select Status <span className="text-red-500">*</span>
                  </Label>
                <Select
                  className="h-12"
                  value={formData?.status}
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
              </div>

            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              {/* <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Theatre Location Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="Locationlink"
                  className="h-12"
                  value={formData?.Locationlink}
                  onChange={handleChange}
                  placeholder="Location link"
                  required
                  type="text"
                />
              </div> */}
              <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                  Decoration Amount <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="minimumDecorationAmount"
                  className="h-12"
                  value={formData.minimumDecorationAmount}
                  onChange={handleChange}
                  placeholder="Minimum Decoration Amount"
                  required
                  type="number"
                />
              </div>
            </div>

            {/* <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              
            <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                Select Branch  <span className="text-red-500">*</span>
                </Label>
              <Select
                className="h-12"
                value={formData?.branch}
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
                </div>
                <div className="w-full flex flex-col gap-1 items-start">
                <Label className="mb-2">
                Select Status <span className="text-red-500">*</span>
                </Label>
              <Select
                className="h-12"
                value={formData?.status}
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
            </div> */}

            <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button
                  onClick={handleButtonClick}
                  className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                >
                  Upload Images
                </Button>
              </div>
              {formData?.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {formData?.images.map(
                    (image, index) =>
                      image?.preview && (
                        <div key={index} className="relative group">
                          <Image
                            src={image?.preview}
                            width={200}
                            height={200}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
              <Button
                className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                onClick={() => Setamentiy(!openamentiy)}
              >
                Update Amenity
              </Button>
              <Button
                className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                onClick={() => onOpen()}
              >
                Update Time Slot
              </Button>
            </div>
            <Button
              isLoading={Loading}
              onClick={handleSubmit}
              className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Update Theater
            </Button>
          </div>
        </ScrollArea>
      )}

      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Time Slot for  {formData?.name} 
              </ModalHeader>
              <ModalBody>
                <ScrollArea className="mb-4 h-80">
                  <h3 className="text-lg font-semibold">Slots</h3>
                  {formData.slots.map((slot, index) => (
                    <Card key={index} className="p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`startTime-${index}`}>
                            Start Time
                          </Label>
                          <Input
                            name="startTime"
                            id={`startTime-${index}`}
                            value={slot.startTime}
                            onChange={(e) => {
                              const updatedSlots = [...formData.slots];
                              updatedSlots[index].startTime = e.target.value;
                              setFormData({ ...formData, slots: updatedSlots });
                            }}
                            placeholder="Start Time"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`endTime-${index}`}>End Time</Label>
                          <Input
                            name="endTime"
                            id={`endTime-${index}`}
                            value={slot.endTime}
                            onChange={(e) => {
                              const updatedSlots = [...formData.slots];
                              updatedSlots[index].endTime = e.target.value;
                              setFormData({ ...formData, slots: updatedSlots });
                            }}
                            placeholder="End Time"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => handleRemoveSlot(index)}
                        className="px-8 py-0.5 rounded-sm mt-2  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                      >
                        Remove Slot
                      </Button>
                    </Card>
                  ))}
                </ScrollArea>
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

      {/* <Modal isOpen={openamentiy} onOpenChange={Setamentiy}>
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
      </Modal> */}
      <Modal isOpen={openamentiy} onOpenChange={Setamentiy}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Amenity for  {formData?.name} </ModalHeader>
              <ModalBody>
                <Textarea
                  name="amenity"
                  value={amenity}
                  onChange={(e) => setAmenity(e.target.value)}
                  placeholder="Enter an amenity"
                />
                <div className="mt-4">
                  {formData.amenities.map((a, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-200 px-3 py-1 rounded mb-2"
                    >
                      <span>{a}</span>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleRemoveAmenity(index)}
                      >
                        Remove
                      </Button>
                    </div>
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

export default UpdateTheaterForm;
