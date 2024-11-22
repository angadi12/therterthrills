"use client";
import React, { useState } from "react";
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

const Createbranch = () => {
  const { toast } = useToast();
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const openbranch = useSelector((state) => state.branches.openbranch);

  const setopenmodel = () => {
    dispatch(Setopenbranch(!openbranch));
  };
  const [formData, setFormData] = useState({
    Branchname: "",
    location: "",
    Number: "",
    code: "",
  });

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
    if (!formData.code) return "code is required";
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

    // try {
    //   await dispatch(createBranch(formData));
    //   toast.success("Branch created successfully");
    //   await dispatch(fetchBranches());
    // } catch (error) {
    //   toast.error(error.message);
    // }
    const result = await Createbranchapi(formData);
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
            radius="sm"
            className="w-full h-12"
            size="lg"
            placeholder="Phone Number"
            value={formData.Number}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="code"
            variant="bordered"
            color="danger"
            radius="sm"
            className="w-full h-12"
            size="lg"
            placeholder="code"
            value={formData.code}
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
