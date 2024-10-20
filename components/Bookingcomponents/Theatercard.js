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
  return (
    <Card className="w-full ">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={Theaterimage}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {isBestSeller && (
            <span className="absolute rounded-full top-2 right-2 bg-[#FFA800] text-white text-xs font-bold px-2 py-1 ">
              Best Seller
            </span>
          )}
        </div>
      </CardHeader>
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
            <ul className="list-disc list-inside text-sm">
              {(overview ?? []).map((item, index) => (
                <li className="text-[#7A7A7A] font-medium" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {slots && slots.length > 0 && (
          <div>
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
      <CardFooter>
        <Button
          // onPress={() => router.push("/booknow")}
          className="px-8 py-0.5 rounded-sm w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Procced{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
