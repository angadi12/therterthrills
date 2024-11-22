import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Upadtebranchapi, Getbranchbyid } from "@/lib/API/Branch";
import { useSelector, useDispatch } from "react-redux";
import { createBranch, fetchBranches, Setopenupdatebranch } from "@/lib/Redux/BranchSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Updatebranch = () => {
  const { toast } = useToast();
  const { Branchid,openupdatebranch } = useSelector((state) => state.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const isValidObjectId = (Branchid) => /^[0-9a-fA-F]{24}$/.test(Branchid);

  useEffect(() => {
    const fetchBranchData = async () => {
      if (!isValidObjectId(Branchid)) {
        toast({
          title: "Invalid branch ID",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setLoadingData(false);
        return;
      }

      setLoadingData(true);
      try {
        const result = await Getbranchbyid(Branchid);
        if (result.success === true) {
          setFormData({
            Branchname: result.data.Branchname,
            location: result.data.location,
            Number: result.data.Number,
            code: result.data.code,
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

    if (Branchid) {
      fetchBranchData();
    }
  }, [Branchid]);

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
    if (!formData.location) return "Address is location";
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

    const result = await Upadtebranchapi(formData, Branchid);
    if (result.success === true) {
      setLoading(false);
      dispatch(Setopenupdatebranch(!openupdatebranch))
      dispatch(fetchBranches());
    } else {
      toast({
        title: "Failed to create branch",
        description: result.message.result,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {loadingData ? (
        <div className="w-full flex justify-center items-center h-60">
          <Spinner color="danger" />
        </div>
      ) : (
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
              color="primary"
              className="w-full h-12"
              size="lg"
              placeholder="Branch Name"
              value={formData.Branchname}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="location"
              variant="bordered"
              color="primary"
              radius="sm"
              className="w-full h-12"
              size="lg"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="Number"
              variant="bordered"
              color="primary"
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
              color="primary"
              radius="sm"
              className="w-full h-12"
              size="lg"
              placeholder="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <Button
              isLoading={loading}
              onPress={handleSubmit}
              className="px-8 py-0.5 rounded-sm w-60  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              {" "}
              Update Branch
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Updatebranch;
