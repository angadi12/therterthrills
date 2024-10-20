"use client"
import Image from "next/image";
import grid1 from "@/public/asset/grid1.png";
import grid2 from "@/public/asset/grid2.png";
import grid3 from "@/public/asset/grid3.png";
import grid4 from "@/public/asset/grid4.png";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center place-content-center items-stretch gap-8">
          <div className="flex flex-col gap-2 justify-center w-full">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Choose us for your ultimate
              </h2>
              <h2 className="text-4xl font-bold mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
                  Private Theatre Experience!
                </span>
              </h2>
              <Divider className="w-3/4 mr-auto" />
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold mb-2">
                Exclusive Event Space
              </h3>
              <p className="text-gray-600 mb-6 text-wrap w-3/4">
                {`  Whether it's a movie night with friends or a family gathering,
                enjoy the privacy of your own theatre room. We provide a fully
                customized setup to ensure an intimate and unforgettable time.`}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 h-80">
            <div className={`relative ${currentIndex===0?`col-span-2 transition-all duration-700 w-full grayscale-0 `:" grayscale "} ${currentIndex===2?"h-20 col-span-2":""} ${currentIndex===3?`h-20 `:""}  overflow-hidden  rounded-lg h-full`}>
              <Image
                src={grid1}
                alt={"alt"}
                className={`object-cover w-full  h-full`}
              />
            </div>
            <div className={`relative ${currentIndex===3?`col-span-2 h-20 `:""} ${currentIndex===2?`h-20`:""} ${currentIndex===1?`col-span-2 transition-all duration-700 h-full grayscale-0 `:" grayscale "}  overflow-hidden  rounded-lg w-full`}>
              <Image
                src={grid2}
                alt={"alt"}
                className="object-cover w-full h-full "
              />
            </div>
            <div className={`relative ${currentIndex===2?`col-span-2 transition-all duration-700 w-full grayscale-0 `:" grayscale "} ${currentIndex===0?"h-20 col-span-2":""} ${currentIndex===1?"h-20 ":""} overflow-hidden  rounded-lg h-full` }>
              <Image
                src={grid3}
                alt={"alt"}
                className="object-cover w-full h-full "
              />
            </div>
            <div className={`relative ${currentIndex===3?`col-span-2 transition-all duration-700 w-full grayscale-0 `:" grayscale "}  ${currentIndex===1?"h-20 col-span-2 ":""} ${currentIndex===0?"h-20 ":""}  overflow-hidden  rounded-lg w-full` }>
              <Image
                src={grid4}
                alt={"alt"}
                className="object-cover w-full h-full "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

