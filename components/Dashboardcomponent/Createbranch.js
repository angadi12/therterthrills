"use client";
import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Createbranchapi } from "@/lib/API/Branch";
import { useSelector, useDispatch } from "react-redux";
import {
  createBranch,
  fetchBranches,
  Setopenbranch,
} from "@/lib/Redux/BranchSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { X } from "lucide-react";
import Image from "next/image";

const Createbranch = () => {
  const { toast } = useToast();
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const openbranch = useSelector((state) => state.branches.openbranch);
  const fileInputRef = useRef(null);

  const setopenmodel = () => {
    dispatch(Setopenbranch(!openbranch));
  };
  const [formData, setFormData] = useState({
    Branchname: "",
    location: "",
    Locationlink:"",
    Number: "",
    images: [],
  });


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
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    if (!formData.Branchname) return "Branch Name is required";
    if (!formData.location) return "location is required";
    if (!formData.Number) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.Number)) {
      return "Phone Number must be 10 digits";
    }
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
        toast({
            title: "All fields are required",
            description: error,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("Branchname", formData.Branchname);
    data.append("location", formData.location);
    data.append("Number", formData.Number);
    data.append("Locationlink", formData.Locationlink);

    formData.images.forEach((image) => data.append("images", image.file));

    const result = await Createbranchapi(data);
    if (result.success===true) {
      toast({
        title: "Branch created",
        description: "Branch has been created successfully.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      dispatch(fetchBranches());
      setopenmodel();
      setLoading(false);
    } else {
      toast({
        title: "Failed to create branchr",
        description: "Failed to create branch.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full text-start">
          <p className="text-lg font-semibold">Fill Branch Details</p>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start">
          <Input
            type="text"
            name="Branchname"
            variant="bordered"
            radius="sm"
            className="w-full h-12"
            size="lg"
            color="danger"
            placeholder="Branch Name"
            value={formData.Branchname}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="location"
            variant="bordered"
            radius="sm"
            color="danger"
            className="w-full h-12"
            size="lg"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="Number"
            variant="bordered"
            color="danger"
            maxLength={10}
            radius="sm"
            className="w-full h-12"
            size="lg"
            placeholder="Phone Number"
            value={formData.Number}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="Locationlink"
            variant="bordered"
            color="danger"
            radius="sm"
            className="w-full h-12"
            size="lg"
            placeholder="Location link"
            value={formData.Locationlink}
            onChange={handleChange}
          />
          {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2 lg:col-span-2">
          <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
            +Upload Building Image
          </p>
          <span className="text-xs text-gray-400 no-underline">
            (PNG, JPG only)
          </span>
        </div> */}
        </div>
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm ring-1 ring-gray-200">
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
              <div className="grid grid-cols-3 gap-4">
                {formData?.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image.preview}
                      
                      width={60}
                      height={60}
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
                ))}
              </div>
            )}
          </div>
        <div className="flex justify-center items-center w-full">
          <Button
          isLoading={loading}
            onPress={handleSubmit}
            className="px-8 py-0.5 rounded-sm w-60  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
            Create Branch
          </Button>
        </div>
      </div>

     
    </>
  );
};

export default Createbranch;
