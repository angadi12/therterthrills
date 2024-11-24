"use client";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
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
import { fetchBranches, Setopenupdateadmin } from "@/lib/Redux/BranchSlice";
import { fetchAdminsByBranchId, fetchAdminById } from "@/lib/Redux/AdminSlice";
import { Upadteadminapi, Getadminbyid } from "@/lib/API/Admin";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Label } from "@/components/ui/label";

const Updateadmin = () => {
  const { toast } = useToast();
  const branches = useSelector((state) => state.branches.branches);
  const {openupdateadmin} = useSelector((state) => state.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fetchingAdmin, setFetchingAdmin] = useState(true);

  const selectedBranchId = useSelector(
    (state) => state.branches.selectedBranchId
  );
  const selectedAdminid = useSelector((state) => state.admin.selectedAdminid);

  const [Admindata, SetAdmindata] = useState();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    authType: "",
    branch: "",
  });

  //   useEffect(() => {
  //     if (selectedAdminid) {
  //       const result = GetAdminbyid(selectedAdminid);
  //       console.log(result.data);
  //       SetAdmindata(result.data);
  //     }
  //   }, [selectedAdminid]);

  useEffect(() => {
    const fetchAdminData = async () => {
      setFetchingAdmin(true);
      try {
        const response = await Getadminbyid(selectedAdminid);
        if (response.data) {
          SetAdmindata(response?.data?.admin);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setFetchingAdmin(false);
      }
    };

    if (selectedAdminid) {
      fetchAdminData();
    }
  }, [selectedAdminid]);

  useEffect(() => {
    if (Admindata) {
      console.log("branchid", Admindata?.branch?._id);
      setFormData({
        fullName: Admindata?.fullName,
        email: Admindata?.email,
        phoneNumber: Admindata?.phoneNumber,
        authType: Admindata?.authType,
        branch: Admindata.branch?._id,
      });
    }
  }, [Admindata, branches]);

  console.log(Admindata);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // const handleSelectChange = (key, selectedKeys) => {
  //   const selectedArray = Array.from(selectedKeys);
  //   if (key === "branch") {
  //     const selectedBranch = branches?.find(
  //       (branch) => branch._id === selectedArray[0]
  //     );
  //     setFormData({ ...formData, branch: selectedBranch._id });
  //   } else if (key === "permission") {
  //     setFormData({ ...formData, permission: selectedArray });
  //   }
  // };

  const validate = () => {
    if (!formData.fullName) return "Name is required";
    if (!formData.email) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      return "Invalid email address";
    if (!formData.branch) return "Branch is required";
    if (!formData.phoneNumber) {
      return "Phone Number is required";
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

    const result = await Upadteadminapi(formData, selectedAdminid);
    console.log(result);
    if (result.status) {
      toast({
        title: "Updated",
        description: "Admin details has been updated",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      dispatch(fetchAdminsByBranchId(selectedBranchId));
      dispatch(Setopenupdateadmin(!openupdateadmin))  
      setLoading(false);
    } else {
      toast({
        title: "failed",
        description: "Failed to Update Admin",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {fetchingAdmin ? (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <Spinner color="danger" />
        </div>
      ) : (
        <form className="flex flex-col justify-center items-center gap-4">
          <div className="w-full text-start">
            <p className="text-lg font-semibold">Update Admin Details </p>
          </div>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <div className="flex items-start gap-1 flex-col w-full">
              <Label hthtmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={formData?.fullName}
                onChange={handleInputChange}
                variant="bordered"
                radius="sm"
                color="primary"
                className="w-full h-12"
                size="lg"
                placeholder="Full Name"
              />
            </div>
            <div className="flex items-start gap-1 flex-col w-full">
              <Label hthtmlFor="phoneNumber">Phone</Label>
              <Input
                type="text"
                color="primary"
                disabled
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleInputChange}
                variant="bordered"
                radius="sm"
                className="w-full h-12"
                size="lg"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <div className="flex items-start gap-1 flex-col w-full">
              <Label hthtmlFor="email">Email</Label>
              <Input
                type="text"
                name="Email"
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
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
            <div className="flex items-start gap-1 flex-col w-full">
              <Label hthtmlFor="authType">Change Login type</Label>
              <Select
                className="h-12"
                value={formData?.authType}
                onValueChange={(value) => handleSelectChange("authType", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select Login type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="firebase">Phone</SelectItem>
                  <SelectItem value="emailOtp">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start gap-1 flex-col w-full">
              <Label hthtmlFor="branch"> Change Branch</Label>
              <Select
                className="h-12"
                value={formData?.branch}
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
              Update
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default Updateadmin;
