import Image from "next/image";
import grid1 from "@/public/asset/grid1.png"
import grid2 from "@/public/asset/grid2.png"
import grid3 from "@/public/asset/grid3.png"
import grid4 from "@/public/asset/grid4.png"
import { Divider } from "@nextui-org/react";

export default function ExperienceSection() {
  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center place-content-center items-stretch gap-8">
          <div className="flex flex-col gap-2 justify-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Choose us for your ultimate
              </h2>
              <h2 className="text-4xl font-bold mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
                  Private Theatre Experience!
                </span>
              </h2>
            </div>
            <Divider className="w-3/4 mr-auto"/>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Exclusive Event Space
              </h3>
              <p className="text-gray-600 mb-6">
              {`  Whether it's a movie night with friends or a family gathering,
                enjoy the privacy of your own theatre room. We provide a fully
                customized setup to ensure an intimate and unforgettable time.`}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageWithHover
              src={grid1}
              alt="Event space 1"
            
            />
            <ImageWithHover
              src={grid2}
              alt="Event space 2"
            
            />
            <ImageWithHover
              src={grid3}
              alt="Event space 3"
            
            />
            <ImageWithHover
              src={grid4}
              alt="Event space 4"
            
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageWithHover({ src, alt }) {
  return (
    <div className="relative overflow-hidden rounded-lg h-full">
      <Image
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
    </div>
  );
}
