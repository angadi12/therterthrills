"use client";
import Calender from "@/public/asset/Calender.png";
import Cinematic from "@/public/asset/Cinematic.png";
import Packages from "@/public/asset/Packages.png";
import Privatespace from "@/public/asset/Privatespace.png";
import Hall from "@/public/asset/Hall.png";
import Curtanleft from "@/public/asset/Curtanleft.png";
import Curtanright from "@/public/asset/Curtanright.png";
import Whitecircle from "@/public/asset/Whitecircle.png";
import Shooticon from "@/public/asset/Shooticon.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function FeaturesSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-11/12  mx-auto ">
        <div className="flex flex-col md:flex-row items-center">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full md:w-1/2 mb-8 md:mb-0 overflow-hidden relative"
          >
            <Image src={Hall} alt="cinemaHall" className="z-0 w-full" />
            <div className="absolute grid grid-cols-2 justify-center items-center top-0 right-0 bottom-0 left-0 w-full  h-full">
              {/* <motion.div
                animate={{ x: isHovered ? -200  :0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-30 "
              >
                <div className="flex justify-center items-center relative">
                  <Image src={Whitecircle} alt="circle" />
                  <Image src={Shooticon} alt="shoot" className="absolute" />
                </div>
              </motion.div> */}
              <motion.div
                animate={{ x: isHovered ? "-100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative  w-full   h-full  z-20"
              >
                <Image
                  src={Curtanleft}
                  alt="Curtanleft"
                  className="w-full h-full"
                />
                <div
              
              
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  w-full   z-30 "
              >
                <div className="flex justify-center items-center relative -right-1/2">
                  <Image src={Whitecircle} alt="circle" className="w-36 h-36 rounded-full"/>
                  <Image src={Shooticon} alt="shoot" className="absolute h-20 w-20" />
                </div>
              </div>
              </motion.div>
              <motion.div
                animate={{ x: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full w-full z-10"
              >
                <Image
                  src={Curtanright}
                  alt="Curtanright"
                  className="h-full w-full"
                />
              </motion.div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-4">
              We make your celebration{" "}
              <span className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
                a Blockbuster!
              </span>
            </h2>
            <p className="text-gray-600 leading-7 mb-6">
              {`At The Theatre Thrills, we provide private theatre space for a personalized entertainment experience. Whether you're hosting a movie night, birthday, or party, we make it unforgettable with our state-of-the-art theatres and event customization.`}{" "}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <FeatureItem icon={Cinematic} title="4K Cinematic Experience" />
              <FeatureItem icon={Calender} title="Flexible Booking Options" />
              <FeatureItem icon={Packages} title="Custom Event Packages" />
              <FeatureItem
                icon={Privatespace}
                title="Exclusive Private Space"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title }) {
  return (
    <div className="flex gap-2 items-center">
      <Image src={icon} alt="icon" className="mr-4 object-contain" />
      <span className="text-lg font-bold">{title}</span>
    </div>
  );
}
