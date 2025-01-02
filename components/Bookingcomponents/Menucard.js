"use client";

import { Button } from "@nextui-org/react";
import { HandPlatter } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MenuCarousel() {
  const menuImages = [
    "https://res.cloudinary.com/dipr7y36n/image/upload/v1735819498/THE-THEATRETHRILLS/Menucard_igp6zv.png",
    "https://res.cloudinary.com/dipr7y36n/image/upload/v1735819508/THE-THEATRETHRILLS/menucard2_rfb8ed.png",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          startContent={<HandPlatter className="w-4 h-4" />}
          className="flex  justify-center rounded-sm gap-2 items-center  text-[#F30278] bg-[#F30278]/10 ring-1 ring-[#F30278] p-2 font-semibold text-xs"
        >
          <span>Food Menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[90vw] md:h-[90vh] md:w-auto p-0">
        <ScrollArea className="h-full w-full rounded-md">
          <div className="p-0">
            <Carousel className="w-full max-w-3xl mx-auto">
              <CarouselContent>
                {menuImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={src}
                        alt={`Menu card ${index + 1}`}
                        width={800}
                        height={1000}
                        className="rounded-lg object-contain w-full h-auto"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-pink-500 text-white" />
              <CarouselNext className="right-2 bg-pink-500 text-white" />
            </Carousel>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
