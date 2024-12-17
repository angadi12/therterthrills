import React from "react";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Back from "@/public/asset/Back.png";
import Logo from "@/public/asset/Logo.png";

const Topfooter = () => {
  return (
    <div className="w-full p-0 bg-[#F30278] relative h-24 md:flex hidden ">
      <div className=" mx-auto  flex flex-col md:flex-row items-center justify-between w-full">
        <div className="p-0 absolute left-0 top-0">
          <Image src={Back} alt="The Theatre Thrills" className="h-24" />
          <Image src={Logo} alt="Logo" className="object-contain absolute -top-14 left-24  " />
        </div>
        <div className="w-full px-4 py-2 flex flex-col md:flex-row items-center justify-center md:justify-end gap-12 lg:gap-20 space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-white flex justify-center items-center rounded-full h-12 w-12">
              <IoMail className="h-5 w-5 text-[#F30278]" />
            </div>
            <span className="text-sm text-white">info@thetheatrethrills.in</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white flex justify-center items-center rounded-full h-12 w-12">
              <FaPhoneAlt className="h-5 w-5 text-[#F30278]" />
            </div>{" "}
            <span className="text-sm text-white">+91 9398617123</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white flex justify-center items-center rounded-full h-12 w-12">
              <FaLocationDot className="h-5 w-5 text-[#F30278]" />
            </div>{" "}
            <span className="text-sm text-white">
              3rd Floor, Sai Sadan , Enclave Near Jyothi Theatre,<br></br>{" "}
              Lingampally, Hyderabad Telangana - 500032
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topfooter;
