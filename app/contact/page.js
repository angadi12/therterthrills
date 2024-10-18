import React from "react";
import Conatctusbanner from "@/public/asset/Conatctusbanner.png";
import Image from "next/image";
import Groupicon from "@/public/asset/Groupicon.png";
import Contactform from "@/components/Contactuscomponents/Conatctform";

const page = () => {
  return (
    <main className="">
      <div className="relative justify-center items-center w-full  ">
        <Image
          src={Conatctusbanner}
          alt="about us"
          className="relative brightness-50"
        />
        <p className="absolute text-2xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2">
          Contact Us
        </p>
        <div className="flex absolute justify-center w-full items-center gap-8 -bottom-8 ">
          <div className="  bg-[#F30278]/20 ring-1 ring-[#F30278] rounded-lg p-3 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-16 w-16 rounded-full bg-[#F30278]">
              <Image
                src={Groupicon}
                alt="Groupicon"
                className="object-contain h-10 w-10"
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F30278]">100+</div>
              <div className="text-lg text-[#F30278]">Happy Customers</div>
            </div>
          </div>
          <div className="  bg-[#F30278]/20 ring-1 ring-[#F30278] rounded-lg p-3 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-16 w-16 rounded-full bg-[#F30278]">
              <Image
                src={Groupicon}
                alt="Groupicon"
                className="object-contain h-10 w-10"
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F30278]">100+</div>
              <div className="text-lg text-[#F30278]">Happy Customers</div>
            </div>
          </div>
          <div className="  bg-[#F30278]/20 ring-1 ring-[#F30278] rounded-lg p-3 text-white flex gap-2 items-center">
            <div className="flex justify-center items-center h-16 w-16 rounded-full bg-[#F30278]">
              <Image
                src={Groupicon}
                alt="Groupicon"
                className="object-contain h-10 w-10"
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#F30278]">100+</div>
              <div className="text-lg text-[#F30278]">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
      <Contactform/>
    </main>
  );
};

export default page;
