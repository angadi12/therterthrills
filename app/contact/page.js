import React from "react";
import Conatctusbanner from "@/public/asset/Conatctusbanner.png";
import Image from "next/image";
import Groupicon from "@/public/asset/Groupicon.png";
import Contactform from "@/components/Contactuscomponents/Conatctform";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const page = () => {
  return (
    <main className="pb-10">
      <div className="relative justify-center items-center w-full  ">
        <Image
          src={Conatctusbanner}
          alt="about us"
          className="relative brightness-50"
        />
        <p className="absolute md:text-3xl text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2">
          Contact Us
        </p>
        
        <div className="md:grid absolute md:grid-cols-5 hidden justify-items-stretch w-full items-stretch gap-4  -bottom-8 ">
        <div></div>
          <div className="  bg-white ring-1 ring-[#F30278] rounded-lg px-4 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-10 w-10 p-2 rounded-full bg-[#F30278]">
              <IoMail
        
                className=" h-8 w-8"
              />
            </div>
            <div>
              <div className="text-sm text-[#F30278]">info@thetheatrethrills.com</div>
            </div>
          </div>
          
          <div className="  bg-white ring-1 ring-[#F30278] rounded-lg px-4 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-10 w-10 p-2 rounded-full bg-[#F30278]">
              <FaPhoneAlt
        
                className=" h-8 w-8"
              />
            </div>
            <div>
              <div className="text-sm text-[#F30278]">+91 888 5888 949</div>
            </div>
          </div>
          
          <div className="  bg-white ring-1 ring-[#F30278] rounded-lg p-2 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-10 w-10 p-2 rounded-full bg-[#F30278]">
              <FaLocationDot
        
                className=" h-6 w-6"
              />
            </div>
            <div>
              <div className="text-sm  text-[#F30278] text-pretty">{`3rd Floor, Sai Sadan Enclave, Near Jyothi Theatre, Lingampally, Hyderabad Telangana - 502032`}</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="grid  grid-cols-1 md:hidden justify-items-stretch w-full items-stretch gap-4 py-4  px-2 ">
          <div className="h-20  bg-white ring-1 ring-[#F30278] rounded-lg px-4 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-10 w-10 p-2 rounded-full bg-[#F30278]">
              <IoMail
        
                className=" h-8 w-8"
              />
            </div>
            <div>
              <div className="text-sm text-[#F30278]">info@thetheatrethrills.com</div>
            </div>
          </div>
          
          <div className="h-20  bg-white ring-1 ring-[#F30278] rounded-lg px-4 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-10 w-10 p-2 rounded-full bg-[#F30278]">
              <FaPhoneAlt
        
                className=" h-8 w-8"
              />
            </div>
            <div>
              <div className="text-sm text-[#F30278]">+91 888 5888 949</div>
            </div>
          </div>
          
          <div className=" h-20 bg-white ring-1 ring-[#F30278] rounded-lg p-2 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-10 w-10 p-2 rounded-full bg-[#F30278]">
              <FaLocationDot
        
                className=" h-8 w-8"
              />
            </div>
            <div>
              <div className="text-sm  text-[#F30278] text-pretty">{`3rd Floor, Sai Sadan Enclave , Near Jyothi Theatre, Lingampally, Hyderabad Telangana - 502032`}</div>
            </div>
          </div>
        </div>
      <Contactform/>
    </main>
  );
};

export default page;
