import React from "react";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

import FogEffects from "@/public/asset/FogEffects.png";
import PartyProps from "@/public/asset/PartyProps.png";
import HBDLetters from "@/public/asset/HBDLetters.png";
import LEDnumbers from "@/public/asset/LEDnumbers.png";
import Photoclipping from "@/public/asset/Photoclipping.png";


import Singlerose from "@/public/asset/Singlerose.png";
import RoseBouquet from "@/public/asset/RoseBouquet.png";

import Photography1 from "@/public/asset/Photography1.png";
import Photography2 from "@/public/asset/Photography2.png";
import Photography3 from "@/public/asset/Photography3.png";
import Photography4 from "@/public/asset/Photography4.png";


import Vanilla from "@/public/asset/Vanilla.png";
import Strawberry from "@/public/asset/Strawberry.png";
import Butterscotch from "@/public/asset/Butterscotch.png";
import Pineapple from "@/public/asset/Pineapple.png";
import Mangocrush from "@/public/asset/Mangocrush.png";
import Chocolate from "@/public/asset/Chocolate.png";
import Darkchocolate from "@/public/asset/Darkchocolate.png";
import Blackforest from "@/public/asset/Blackforest.png";
import whiteforest from "@/public/asset/whiteforest.png";
import Chocochips from "@/public/asset/Chocochips.png";

const Addonss = () => {
  const products = [
    {
      name: "Fog Effect",
      price: 499,
      image: FogEffects,
      category: "Decor Add-ons",
    },
    {
      name: "Photo Clippings (16 Pics)",
      price: 499,
      image: Photoclipping,
      category: "Decor Add-ons",
    },
    {
      name: "Party Props",
      price: 199,
      image: PartyProps,
      category: "Decor Add-ons",
    },
    {
      name: "LED Numbers",
      price: 99,
      image: LEDnumbers,
      category: "Decor Add-ons",
    },
    {
      name: "HBD Letters",
      price: 99,
      image: HBDLetters,
      category: "Decor Add-ons",
    },
  ];

  const roses = [
    {
      name: "Single Rose",
      price: 49,
      image: Singlerose,
      category: "Roses",
    },
    {
      name: "Rose Bouquet",
      price: 349,
      image: RoseBouquet,
      category: "Roses",
    },
  ];

  const photographyItems  = [
    { name: "20 Pictures", price: 299, image: Photography1 },
    { name: "30 Pictures", price: 499, image: Photography2 },
    { name: "40 Pictures", price: 699, image: Photography3 },
    { name: "50 Pictures", price: 999, image: Photography4 },
  ];

  const cakes = [
    { id: 1, name: "Vanilla", price: 499, image: Vanilla },
    { id: 2, name: "Strawberry", price: 549, image: Strawberry },
    { id: 3, name: "Butterscotch", price: 549, image: Butterscotch },
    { id: 4, name: "Pineapple", price: 549, image: Pineapple },
    { id: 5, name: "Mango Crush", price: 549, image: Mangocrush },
    { id: 6, name: "Chocolate", price: 599, image: Chocolate },
    { id: 7, name: "Dark Chocolate", price: 599, image: Darkchocolate },
    { id: 8, name: "Black Forest", price: 599, image: Blackforest },
    { id: 9, name: "White Forest", price: 599, image: whiteforest },
    { id: 10, name: "Chocochips", price: 599, image: Chocochips },
];

  return (
    <div className="w-11/12 mx-auto py-20 flex flex-col items-start gap-8">
      <div className="flex flex-col gap-6 w-full mx-auto">
        <h2 className="text-2xl font-bold">Decor Add-ons</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-[#004AAD26]/10 p-4 rounded-lg flex flex-col items-center text-center space-y-2"
            >
              <div className="relative w-32 h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm">{product.price}/-</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F30278]/10 p-3 border border-[#F30278] flex gap-2 items-center">
          <Info color="#F30278" className=" text-[#F30278]" />
          <p className="text-[#F30278] text-sm">
          {`  For Photoclippings, Our Team Will Reach Out To You On The Day Of
            Booking. You Need To Send 16 Soft Copies Of The Photos You Want To
            Place Inside The Theater.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full mx-auto">
        <h2 className="text-2xl font-bold">Roses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {roses.map((product) => (
            <div
              key={product.name}
              className="bg-[#004AAD26]/10 p-4 rounded-lg flex flex-col items-center text-center space-y-2"
            >
              <div className="relative w-32 h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm">{product.price}/-</p>
            </div>
          ))}
        </div>
       
      </div>

      <div className="flex flex-col gap-6 w-full mx-auto">
        <h2 className="text-2xl font-bold">Photography</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {photographyItems.map((product) => (
            <div
              key={product.name}
              className="bg-[#004AAD26]/10 p-4 rounded-lg flex flex-col items-center text-center space-y-2"
            >
              <div className="relative w-32 h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm">{product.price}/-</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F30278]/10 p-3 border border-[#F30278] flex gap-2 items-center">
          <Info color="#F30278" className=" text-[#F30278]" />
          <p className="text-[#F30278] text-sm">
         {`Timing of the photography is according to the availability of the photographer.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full mx-auto">
        <h2 className="text-2xl font-bold">Cakes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cakes.map((product) => (
            <div
              key={product.name}
              className="bg-[#004AAD26]/10 p-4 rounded-lg flex flex-col items-center text-center space-y-2"
            >
              <div className="relative w-32 h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm">{product.price}/-</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full mx-auto">
        <h2 className="text-2xl font-bold">Cakes <span className="text-sm text-[#F30278]">(Eggless)</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cakes.map((product) => (
            <div
              key={product.name}
              className="bg-[#004AAD26]/10 p-4 rounded-lg flex flex-col items-center text-center space-y-2"
            >
              <div className="relative w-32 h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm">{product.price}/-</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F30278]/10 p-3 border border-[#F30278] flex gap-2 items-center">
          <Info color="#F30278" className=" text-[#F30278]" />
          <p className="text-[#F30278] text-sm">
         {`Images are for demonstration purposes only. Actual cake may look different.`}
          </p>
        </div>
      </div>

    </div>
  );
};

export default Addonss;
