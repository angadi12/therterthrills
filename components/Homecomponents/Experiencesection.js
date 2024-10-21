"use client";
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
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text and Intro */}
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
                {`Whether it's a movie night with friends or a family gathering,
                enjoy the privacy of your own theatre room. We provide a fully
                customized setup to ensure an intimate and unforgettable time.`}
              </p>
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
                  currentIndex === index ? "scale-105 grayscale-0" : "scale-95 grayscale"
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
