"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Birthdayparty from "@/public/asset/Birthdayparty.png";
import Annivarsary from "@/public/asset/Annivarsary.png";
import Reunion from "@/public/asset/Reunion.png";
import Farewell from "@/public/asset/Farewell.png";
import Bussinessparty from "@/public/asset/Bussinessparty.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  const title = [
    "Birthday Party!",
    "Anniversary!",
    "Reunion!",
    "Farewell!",
    "Business Party!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % title.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const data = [
    {
      image: Birthdayparty,
    },
    {
      image: Annivarsary,
    },
    {
      image: Reunion,
    },
    {
      image: Farewell,
    },
    {
      image: Bussinessparty,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative md:h-screen w-full overflow-hidden ">
      <AnimatePresence>
        {data.map((value, index) => (
         currentIndex === index && <motion.div
           initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            key={index}
          >
                <div className="absolute inset-0 bg-black/40 z-10"></div>

            <Image
              src={value.image}
              alt="Birthday celebration"
              className="absolute inset-0 object-cover w-full md:h-full h-[60vh]"
              layout="reponsive"
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="relative z-20 flex flex-col items-start justify-end h-full  mx-auto md:py-12 py-6 sm:px-6 lg:px-12 ml-4 md:ml-0">
        <h1 className="text-xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Private Theatre <br />
          Spaces for{" "}
          <AnimatePresence>
            {title.map(
              (value, index) =>
                index === currentIndex && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#F30278] via-[#F30278] to-[#E2B600]"
                  >
                    {value}.
                  </motion.p>
                )
            )}
          </AnimatePresence>
          {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            Birthday Party!
          </span> */}
        </h1>
        <p className="md:text-xl text-sm text-white md:mb-8 mb-4 md:max-w-2xl">
          Experience a private theatre, perfect for your next movie night or
          celebration. Book Now!
        </p>
        <Button className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
          Book Now
        </Button>
      </div>
    </div>
  );
}
