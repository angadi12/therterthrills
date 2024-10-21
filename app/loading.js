"use client"
import React, { useEffect, useState } from "react";
import * as animationData from "@/lib/Theaterthrills.json";
import Lottie from 'react-lottie';
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-white absolute z-50 left-0 right-0 top-0 bottom-0 w-full h-screen flex flex-col gap-4 justify-center items-center">
      <Lottie options={defaultOptions} height={200} width={200} />
      <AnimatePresence>
            {title.map(
              (value, index) =>
                index === currentIndex && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-clip-text text-3xl font-bold inline-block text-transparent bg-gradient-to-r from-[#F30278] via-[#F30278] to-[#E2B600]"
                  >
                    {value}.
                  </motion.p>
                )
            )}
          </AnimatePresence>
    </div>
  );
};

export default Loading;
