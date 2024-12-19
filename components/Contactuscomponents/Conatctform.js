"use client";
import { Button } from "@nextui-org/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Contactimage from "@/public/asset/Contactimage.png";
import Image from "next/image";
import { CreatTicket } from "@/lib/API/Contact";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";

export default function Contactform() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    occasion: "",
    addOns: [],
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOnsChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      addOns: [...prevState.addOns, value],
    }));
  };

  const validate = () => {
    let valid = true;
    if (!formData.firstName) {
      toast({
        title: "Error",
        description: "First Name is required.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
      valid = false;
    }
    if (!formData.lastName) {
      toast({
        title: "Error",
        description: "Last Name is required.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
      valid = false;
    }
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      toast({
        title: "Error",
        description: "Valid Mobile Number is required.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
      valid = false;
    }
    // if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   toast({
    //     title: "Error",
    //     description: "Valid Email is required.",
    //     action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    //   });
    //   setIsLoading(false)
    //   valid = false;
    // }
    if (!formData.occasion) {
      toast({
        title: "Error",
        description: "Please select an occasion.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
      valid = false;
    }
    if (formData.addOns.length === 0) {
      toast({
        title: "All fields are required!",
        description: "Please select at least one add-on.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      return;
    }

    const ticketData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNumber: Number(formData.mobileNumber),
      email: formData.email,
      occasion: formData.occasion,
      addOns: formData.addOns,
      details: formData.details,
    };
    try {
      const response = await CreatTicket(ticketData);
      if (response.status === "success") {
        toast({
          title: "message sent",
          description: "Your message has been sent successfully.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setIsLoading(false);
        setFormData({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          email: "",
          occasion: "",
          addOns: [],
          details: "",
        });
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast({
        title: "failed",
        description: "failed to send try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
    }
  };

  return (
    <main className="w-11/12 mx-auto md:py-20 py-8">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center place-content-center items-stretch">
          <div className="space-y-4 flex flex-col-reverse md:flex-col  gap-2 items-start ">
            <div className="flex flex-col  gap-2 items-start">
              <h1 className="md:text-3xl text-xl font-medium">{`Let's Plan Something Epic?`}</h1>
              <h2 className="md:text-4xl text-2xl font-semibold">
                <span className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
                  Contact Us Today!{" "}
                </span>{" "}
              </h2>
              <p className="text-gray-600  text-justify">
                {`  We're excited to help bring your event to life. Whether you're booking a private screening or planning a
              celebration, contact us today for all the details. Our team is here to make sure your experience is smooth and
              unforgettable.`}
              </p>
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden w-full">
              <Image
                alt="Team member"
                className="absolute inset-0 w-full h-full object-cover"
                height="200"
                src={Contactimage}
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input
                placeholder="First Name"
                className="h-12"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Last Name"
                type="text"
                name="lastName"
                className="h-12"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input
                placeholder="Mobile Number"
                name="mobileNumber"
                type="tel"
                maxLength={10}
                className="h-12"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
              <Input
                placeholder="E-Mail Address (Optional)"
                type="email"
                name="email"
                className="h-12"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Select
                className="h-12"
                onValueChange={(value) => handleSelectChange("occasion", value)}
              >
                <SelectTrigger className={`${formData.occasion.length>0? "h-12 text-black":"h-12 text-gray-500"}`}>
                  <SelectValue placeholder="Occasion"  className="text-black"/>
                </SelectTrigger>
                <SelectContent className="h-60 ">
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="Farewell">Farewell</SelectItem>
                  <SelectItem value="Anniversary">Anniversary</SelectItem>
                  <SelectItem value="Reunion">Reunion</SelectItem>
                  <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                  <SelectItem value="Marriage Proposal">
                    Marriage Proposal
                  </SelectItem>
                  <SelectItem value="Romantic Date">Romantic Date</SelectItem>
                  <SelectItem value="Business Meet">Business Meet</SelectItem>
                  <SelectItem value="Bride to be">Bride to be</SelectItem>
                  <SelectItem value="Groom to be">Groom to be</SelectItem>
                  <SelectItem value="Bride to be">Bride to be</SelectItem>
                  <SelectItem value="Congratulations">
                    Congratulations
                  </SelectItem>
                  <SelectItem value="Love Proposal">Love Proposal</SelectItem>
                </SelectContent>
              </Select>
              <Select className="h-12 text-gray-400" onValueChange={handleAddOnsChange}>
              <SelectTrigger className={`${formData.addOns.length>0? "h-12 text-black":"h-12 text-gray-500"}`}>
              <SelectValue placeholder="Add-Ons" className="text-black" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decoration">Decoration</SelectItem>
                  <SelectItem value="Roses">Roses</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cakes">Cakes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              className="min-h-[100px]"
              placeholder="Details (Optional)"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
            />
            <Button
              isLoading={isLoading}
              type="submit"
              className="px-8 py-0.5 rounded-none md:w-48 w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
