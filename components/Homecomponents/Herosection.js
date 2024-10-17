import { Button } from "@nextui-org/react"
import Image from "next/image"
import Birthdayparty from "@/public/asset/Birthdayparty.png"

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <Image
        src={Birthdayparty}
        alt="Birthday celebration"
        className="absolute inset-0 object-cover w-full h-full"
        layout="reponsive"
      />
      <div className="relative z-20 flex flex-col items-start justify-end h-full  mx-auto py-12 sm:px-6 lg:px-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Private Theatre <br />
          Spaces for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            Birthday Party!
          </span>
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Experience a private theatre, perfect for your next movie night or celebration. Book Now!
        </p>
        <Button className="px-8 py-0.5 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
          Book Now
</Button>
      </div>
    </div>
  )
}