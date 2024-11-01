"use client"
import { Star, Users, Wine } from "lucide-react";
import { Button } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Groupicon2 from "@/public/asset/Groupicon2.png";
import Alchol from "@/public/asset/Alchol.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TheatreCard({
  name,
  price,
  rating,
  reviews,
  capacity,
  alcoholPermitted,
  Theaterimage,
  isBestSeller = true,
  overview,
  slots,
}) {
const router=useRouter()
const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % Theaterimage.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="w-full flex flex-col mx-auto justify-around items-center p-0 relative">
          {isBestSeller && (
            <span className="absolute rounded-full top-2 right-2 bg-[#FFA800] text-white text-xs font-bold px-2 py-1 ">
              Best Seller
            </span>
          )}
      <div className="p-0 w-full">
        {/* <div className="w-full p-0">
          <Image
            src={Theaterimage}
            alt={name}
            className="w-full h-48 object-fill rounded-t-lg"
          />
        </div> */}
        <div className="w-full relative p-0 h-48 overflow-hidden">
        {Theaterimage.map((src, index) => (
          <>

          {currentImage===index && <Image
            key={index}
            src={src.images}
            alt={`Theater image ${index + 1}`}
         
            className={`w-full h-48 object-fill rounded-t-l transition-opacity duration-1000`}
          />}

          </>
        ))}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Theaterimage.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImage ? 'bg-[#F30278]' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>


      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-[#FFA128] fill-[#FFA128]" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-[#6B6B6B]">
              {reviews} Reviews
            </span>
          </div>
          <span className="font-bold text-lg">{price}/-</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="flex gap-2 mb-4">
          <span className="bg-pink-100 ring-1 ring-[#F30278] text-xs text-[#F30278] px-2 py-2 font-semibold rounded flex items-center">
            <Image src={Groupicon2} alt="grp" className="w-3 h-3 mr-1" />{" "}
            {capacity} People Capacity
          </span>
          <span className="bg-pink-100 text-[#F30278] ring-1 ring-[#F30278] text-xs font-semibold px-2 py-1 rounded flex items-center">
            <Image src={Alchol} alt="Alcohol" className="w-3 h-3 mr-1" />{" "}
            Alcohol Permitted
          </span>
        </div>
        {overview && overview.length > 0 && (
          <div className="mb-4">
            <h4 className="font-bold mb-2">Theatre Overview</h4>
            <div className="flex justify-start items-start gap-2 w-full flex-col text-xs">
              {(overview ?? []).map((item, index) => (
                <div key={index} className="flex gap-2 justify-start items-center">
                <Image src={item.icon} alt={item.icon} className="object-contain "/> 
                <p className="text-[#7A7A7A] font-medium " key={index}>
                 {item.title}
                </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {slots && slots.length > 0 && (
          <div className="mt-auto">
            <h4 className="font-bold mb-2">Choose Slot</h4>
            <div className="grid grid-cols-2 gap-2 px-2">
              {(slots ?? []).map((slot, index) => (
                <Button
                  key={index}
                  variant={
                    index === (slots?.length ?? 0) - 1 ? "default" : "outline"
                  }
                  className="w-full bg-[#F30278] text-white rounded-sm"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex flex-col justify-center items-center gap-3 w-full">
        <Button
          onPress={() => router.push("/checkout")}
          className="px-8 py-0.5 rounded-sm w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Procced{" "}
        </Button>
        <p className="text-[#7A7A7A]">(Book at just 750/- now)</p>
      </CardFooter>
    </Card>
  );
}
