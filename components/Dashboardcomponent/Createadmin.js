"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Createadminapi } from "@/lib/API/Admin";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminsByBranchId } from "@/lib/Redux/AdminSlice";
import { Setopenadmin, fetchBranches } from "@/lib/Redux/BranchSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Createadmin = () => {
  const { toast } = useToast();
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const openadmin = useSelector((state) => state.branches.openadmin);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    branch: "",
    authType: "",
    role:"admin"
  });

  const setopenmodeladmin = () => {
    dispatch(Setopenadmin(!openadmin));
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  const validate = () => {
    if (!formData.fullName) return "Name is required";
    if (!formData.email) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      return "Invalid email address";
    if (!formData.branch) return "Branch is required";
    if (!formData.authType) return "Auth Type is required";
    if (!formData.phoneNumber) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      return "Phone Number must be 10 digits";
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
    setLoading(true);

    const result = await Createadminapi(formData);
    if (result.status) {
      toast({
        title: "Admin created successfully",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      dispatch(fetchAdminsByBranchId(selectedBranchId));
      setopenmodeladmin();
      setLoading(false);
    } else {
      toast({
        title: "Failed to create Admin",
        description: result.message,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <form className="flex flex-col justify-center items-center gap-4">
        <div className="w-full text-start">
          <p className="text-lg font-semibold">Fill Admin Details</p>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
          <Input
            type="text"
            name="fullName"
            value={formData?.fullName}
            onChange={handleInputChange}
            variant="bordered"
            color="primary"
            radius="sm"
            className="w-full h-12"
            size="lg"
            placeholder="Full Name"
          />

          <Input
            type="tel"
            maxLength={10}
            max={10}
            name="phoneNumber"
            color="primary"
            value={formData?.phoneNumber}
            onChange={handleInputChange}
            variant="bordered"
            radius="sm"
            className="w-full h-12 "
            size="lg"
            placeholder="Phone Number"
          />
        </div>
        <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
          <Input
            type="text"
            name="email"
            color="primary"
            value={formData?.email}
            onChange={handleInputChange}
            variant="bordered"
            radius="sm"
            className="w-full h-12"
            size="lg"
            placeholder="Email"
          />
        </div>

        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
          <Select
            className="h-12"
            onValueChange={(value) => handleSelectChange("authType", value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select Login type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobileOtp">Phone</SelectItem>
              <SelectItem value="emailOtp">Email</SelectItem>
            </SelectContent>
          </Select>

          <Select
            className="h-12"
            onValueChange={(value) => handleSelectChange("branch", value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches?.map((branch) => (
                <SelectItem
                  color="primary"
                  variant="flat"
                  key={branch?._id}
                  value={branch?._id}
                >
                  {branch?.Branchname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2">
        <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
          +Upload Admin Image
        </p>
        <span className="text-xs text-gray-400 no-underline">
          (For Profile Picture - PNG, JPG only)
        </span>
      </div> */}
        <div className="flex justify-center items-center w-full">
          <Button
            isLoading={loading}
            onPress={handleSubmit}
            className="px-8 py-0.5 rounded-none md:w-60 w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );
};

export default Createadmin;
