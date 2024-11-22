import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Upadtebranchapi,Getbranchbyid } from "@/lib/API/Branch";
import { useSelector,useDispatch } from "react-redux";
import { createBranch,fetchBranches } from "@/lib/Redux/BranchSlice";

const Updatebranch = ({id}) => {
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);


  useEffect(() => {
    const fetchBranchData = async () => {
        if (!isValidObjectId(id)) {
            toast.error("Invalid branch ID");
            setLoadingData(false);
            return;
          }

      setLoadingData(true);
      try {
        const result = await Getbranchbyid(id);
        if (result.status) {
          setFormData({
            Branchname: result.data.Branchname,
            location: result.data.location,
            Number: result.data.Number,
            code: result.data.code,
          });
        } else {
          toast.error(result.message || "Failed to fetch branch data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching branch data");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchBranchData();
    }
  }, [id]);

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
      toast.error(error);
      return;
    }

    setLoading(true);


    const result = await Upadtebranchapi(formData,id);
    if (result.status) {
    dispatch(fetchBranches());
    setLoading(false)
    } else {

      toast.error(result.message.result || "Failed to create branch");
      setLoading(false)
    }
  };

  return (
    <>
   {loadingData ?<div className="w-full flex justify-center items-center h-72">
    <span className="loader3"></span>
   </div>: <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Branch Details</p>
      </div>
      <div
        className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start"
      
      >
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
        <Button onPress={handleSubmit} className="buttongradient text-white rounded-md w-60 uppercase font-semibold">
        {loading ? <span className="loader2"></span> : "Update Branch"}
        </Button>

        </div>
    </div>}


    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "linear-gradient(90deg, #222C68 0%, #1D5B9E 100%)",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

    </>
  );
};


export default Updatebranch