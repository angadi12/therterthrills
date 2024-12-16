"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DatePickerWithRange } from "@/components/Dashboardcomponent/Daterangecoupon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCouponapi } from "@/lib/API/Coupon";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches, setSelectedBranch } from "@/lib/Redux/BranchSlice";
import { formatISO } from "date-fns";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";

const CouponOfferForm = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [Loading, Setloading] = useState(false);
  const branches = useSelector((state) => state.branches.branches);
  const { branchtheatre, branchtheatreloading } = useSelector(
    (state) => state.theater
  );

  const [formData, setFormData] = useState({
    type: "coupon",
    code: "",
    description: "",
    discountAmount: "",
    discountType: "percentage",
    theater: "",
    isActive: false,
    validPeriod: null, // For date range
    usageLimit: "",
    userLimit: "",
    branch: "",
  });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (formData?.branch) {
      dispatch(fetchtheaterbybranchid(formData?.branch));
    }
  }, [formData?.branch, dispatch]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      if (field === "validPeriod") {
        return {
          ...prev,
          validFrom: value?.from
            ? formatISO(value.from, { representation: "date" })
            : null,
          validUntil: value?.to
            ? formatISO(value?.to, { representation: "date" })
            : null,
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };


  const validate = () => {
    if (!formData.code) return "code is required";
    if (!formData.description) return "description is required";
    if (!formData.discountAmount) return "discountAmount is required";
    if (!formData.usageLimit) return "Usage Limit is required";
    if (!formData.discountAmount) return "User Limit is required";
    if (!formData.validFrom && !formData.validUntil) {
      return "date  is required";
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

    if (formData.type === "coupon") {
      if (!formData.theater)
        return toast({
          title: "failed",
          description: "Theatre not selected",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
    }

    const data = {
      code: formData.code,
      type: formData.type,
      description: formData.description,
      discountAmount: Number(formData.discountAmount),
      discountType: formData.discountType,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      isActive: formData.isActive,
      theater: formData.type === "coupon" ? formData.theater : null,
      usageLimit: Number(formData.usageLimit) || null,
      userLimit: Number(formData.userLimit) || null,
    };
    Setloading(true);
    try {
      const response = await CreateCouponapi(data);
      if (response?.status === "success") {
        toast({
          title: "Coupon created successfully!",
          description: "Coupon created successfully!",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        // Reset form fields after successful creation
        setFormData({
          type: "coupon",
          code: "",
          description: "",
          discountAmount: "",
          discountType: "percentage",
          theater: "",
          isActive: false,
          validPeriod: null,
          usageLimit: "",
          userLimit: "",
          branch: "",
        });
        Setloading(false);
      } else {
        toast({
          title: "Failed to create coupon",
          description: response.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        Setloading(false);
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast({
        title: "Failed to create coupon",
        description: error.message,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      Setloading(false);
    }
  };

  return (
    <ScrollArea>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Add Coupon or Offer</CardTitle>
          <CardDescription>
            Create a new coupon for a specific theater or an offer code for the
            site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="coupon"
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coupon" id="coupon" />
                  <Label htmlFor="coupon">Coupon (Theater-specific)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offer" id="offer" />
                  <Label htmlFor="offer">Offer (Site-wide)</Label>
                </div>
              </RadioGroup>

              <div
                className={`${
                  formData.type === "coupon"
                    ? "grid grid-cols-2 items-center gap-4"
                    : "grid grid-cols-1 gap-4"
                }`}
              >
                {/* <Select
                    className="h-10"
                    onValueChange={(value) =>
                      handleInputChange("branch", value)
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches?.map((branch) => (
                        <SelectItem key={branch?._id} value={branch?._id}>
                          {branch?.Branchname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                <div className="space-y-2">
                  <Input
                    id="code"
                    placeholder="Enter coupon or offer code"
                    value={formData.code}
                    onChange={(e) => handleInputChange("code", e.target.value)}
                  />
                </div>

                {formData.type === "coupon" && (
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("theater", value)
                    }
                    value={formData.theater}
                  >
                    <SelectTrigger
                      id="location-select"
                      className="w-full  h-10 flex items-center gap-2"
                    >
                      <SelectValue placeholder="Select Theater">
                        {branchtheatreloading
                          ? "Loading..."
                          : branchtheatre?.find(
                              (theater) => theater?._id === formData?.theater
                            )?.name || "Select Theater"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {branchtheatre?.map((theater) => (
                        <SelectItem key={theater?._id} value={theater?._id}>
                          {theater?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 w-full items-center">
                <div className="flex items-center space-x-2">
                  <Input
                    id="discount"
                    type="number"
                    placeholder="Enter discount amount"
                    value={formData.discountAmount}
                    onChange={(e) =>
                      handleInputChange("discountAmount", e.target.value)
                    }
                  />
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("discountType", value)
                    }
                    defaultValue="percentage"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Valid Period</Label>
                <DatePickerWithRange
                  className="mb-4"
                  onDateChange={(value) =>
                    handleInputChange("validPeriod", value)
                  }
                />
              </div>

              <div className="grid w-full grid-cols-2 gap-2 items-center">
                <Input
                  id="usageLimit"
                  type="number"
                  placeholder="Enter usage limit"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    handleInputChange("usageLimit", e.target.value)
                  }
                />
                <Input
                  id="userLimit"
                  type="number"
                  placeholder="Enter user limit"
                  value={formData.userLimit}
                  onChange={(e) =>
                    handleInputChange("userLimit", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(value) =>
                    handleInputChange("isActive", value)
                  }
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            isLoading={Loading}
            className=" rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            onClick={handleSubmit}
          >
            Create Coupon or Offer
          </Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
};

export default CouponOfferForm;
