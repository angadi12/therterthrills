"use client";
import Image from "next/image";
import grid1 from "@/public/asset/grid1.png";
import grid2 from "@/public/asset/grid2.png";
import grid3 from "@/public/asset/grid3.png";
import grid4 from "@/public/asset/grid4.png";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="md:py-16 py-8 bg-white">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text and Intro */}
          <div className="flex flex-col gap-2 justify-center w-full">
            <div>
              <h2 className="md:text-4xl text-2xl text-center md:text-left font-bold mb-2">
                Choose us for your ultimate
              </h2>
              <h2 className="md:text-4xl text-2xl text-center md:text-left  font-bold mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
                  Private Theatre Experience!
                </span>
              </h2>
              <Divider className="md:w-3/4 w-full mr-auto" />
            </div>
            <div className="hidden md:block">

            {currentIndex === 0 && (
              <motion.div className="mt-4"
              initial={{opacity:0.5,y:50}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.8}}>
                <h3 className="text-2xl font-semibold mb-2">
                  Exclusive Event Space
                </h3>
                <p className="text-gray-600 mb-6 text-wrap w-3/4">
                  {`Whether it's a movie night with friends or a family gathering,
                enjoy the privacy of your own theatre room. We provide a fully
                customized setup to ensure an intimate and unforgettable time.`}
                </p>
              </motion.div>
            )}
            {currentIndex === 1 && (
              <motion.div className="mt-4" initial={{opacity:0.5,y:50}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.8}}>
                <h3 className="text-2xl font-semibold mb-2">
                  Perfect for All Occasions
                </h3>
                <p className="text-gray-600 mb-6 text-wrap w-3/4">
                  {`From themed birthday parties to corporate events, we offer personalized packages. With options for decorations, snacks, and entertainment, every detail is customized to fit your vision.`}
                </p>
              </motion.div>
            )}
            {currentIndex === 2 && (
              <motion.div className="mt-4"  initial={{opacity:0.5,y:50}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.8}}>
                <h3 className="text-2xl font-semibold mb-2">
                  Best Customer Service{" "}
                </h3>
                <p className="text-gray-600 mb-6 text-wrap w-3/4">
                  {`Our team takes care of every detail, ensuring everything runs smoothly for a seamless experience. We focus on delivering a stress-free, enjoyable event tailored to your needs.`}
                </p>
              </motion.div>
            )}
            {currentIndex === 3 && (
              <motion.div className="mt-4"  initial={{opacity:0.5,y:50}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.8}}>
                <h3 className="text-2xl font-semibold mb-2">
                Easy Booking Process
                </h3>
                <p className="text-gray-600 mb-6 text-wrap w-3/4">
                  {`Our online booking system offers a simple and flexible way to schedule your event. Select your preferred date and time, then customize your experience with add-ons like snacks or decorations.`}
                </p>
              </motion.div>
            )}
            </div>
          </div>
          {/* Image Section */}
          <div className="grid grid-cols-2 gap-2">
            {[grid1, grid2, grid3, grid4].map((imageSrc, index) => (
              <div
                key={index}
                className={`relative  overflow-hidden rounded-lg `}
              >
                <Image
                  src={imageSrc}
                  alt={`Experience ${index + 1}`}
                  className={`object-cover transition-transform duration-700 rounded-lg w-full h-full ${
                    currentIndex === index
                      ? "scale-105 grayscale-0"
                      : "scale-95 grayscale"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
