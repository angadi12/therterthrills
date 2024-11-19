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

export default function Contactform() {
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
            <p className="text-gray-600 text-xs md:text-sm text-justify">
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
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input placeholder="First Name" className="h-12" />
              <Input placeholder="Last Name" className="h-12" />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Input placeholder="Mobile Number" type="tel" className="h-12" />
              <Input
                placeholder="E-Mail Address"
                type="email"
                className="h-12"
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Select className="h-12">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                </SelectContent>
              </Select>
              <Select className="h-12">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Add-Ons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="decoration">Decoration</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              className="min-h-[100px]"
              placeholder="Details (Optional)"
            />
            <Button className="px-8 py-0.5 rounded-none md:w-48 w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
