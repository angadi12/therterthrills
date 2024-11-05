import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import FogEffects from "@/public/asset/FogEffects.png";
import PartyProps from "@/public/asset/PartyProps.png";
import HBDLetters from "@/public/asset/HBDLetters.png";
import CandlePath from "@/public/asset/CandlePath.png";

import Cakes1 from "@/public/asset/Cakes1.png";
import Cakes2 from "@/public/asset/Cakes2.png";
import Cakes3 from "@/public/asset/Cakes3.png";
import Cakes4 from "@/public/asset/Cakes4.png";

import Photography1 from "@/public/asset/Photography1.png";
import Photography2 from "@/public/asset/Photography2.png";
import Photography3 from "@/public/asset/Photography3.png";
import Photography4 from "@/public/asset/Photography4.png";

const AddOns = () => {
    const [selectedDecorations, setSelectedDecorations] = useState([]);
    const [selectedCake, setSelectedCake] = useState(null);
    const [selectedPhotography, setSelectedPhotography] = useState("");


    const toggleDecoration = (name) => {
        setSelectedDecorations((prev) =>
          prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
        );
      };
    

  const decorations = [
    { name: "Fog Effects", image: FogEffects },
    { name: "Party Props", image: PartyProps },
    { name: "HBD Letters", image: HBDLetters },
    { name: "Candle Path", image: CandlePath },
  ];

  const cakes = [
    { id: 1, name: "Vanilla", price: 499, image: Cakes1 },
    { id: 2, name: "Strawberry", price: 549, image: Cakes2 },
    { id: 3, name: "Butterscotch", price: 549, image: Cakes3 },
    { id: 4, name: "Chocolate", price: 599, image: Cakes4 },
  ];
  
  const photography = [
    { name: "20 Pictures", image: Photography1 },
    { name: "30 Pictures", image: Photography2 },
    { name: "40 Pictures", image: Photography3 },
    { name: "50 Pictures", image: Photography4 },
  ];

  return (
    <div className="md:col-span-2">
      <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Decorations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {decorations.map((decoration) => (
            <Button
              key={decoration.name}
              className={`flex flex-col items-center justify-center h-32 w-28 bg-white p-1 rounded-lg transition-colors ${
                selectedDecorations.includes(decoration.name)
                  ? "bg-pink-100 text-[#F30278] ring-1 ring-[#F30278]"
                  : " text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => toggleDecoration(decoration.name)}
            >
              <Image
                src={decoration.image}
                alt={decoration.name}
                width={80}
                height={80}
                className="mb-2 rounded-full"
              />
              <span className="text-sm">{decoration.name}</span>
            </Button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Rose</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {cakes.map((cake) => (
            <Button
              key={cake.name}
              className={`flex flex-col items-center justify-center bg-white h-32 w-28 p-1 rounded-lg transition-colors ${
                selectedCake === cake.name
                  ? "bg-pink-100 text-[#F30278] ring-1 ring-[#F30278]"
                  : " text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCake(cake.name)}
            >
              <Image
                src={cake.image}
                alt={cake.name}
                width={80}
                height={80}
                className="mb-2 rounded"
              />
              <span className="text-sm">Single Rose</span>
            </Button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Photography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {photography.map((option) => (
            <Button
              key={option.name}
              className={`flex flex-col items-center justify-center p-1 h-32 w-28 bg-white rounded-lg transition-colors ${
                selectedPhotography === option.name
                  ? "bg-pink-100 text-[#F30278] ring-1 ring-[#F30278]"
                  : " text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedPhotography(option.name)}
            >
              <Image
                src={option.image}
                alt={option.name}
                width={80}
                height={80}
                className="mb-2 rounded"
              />
              <span className="text-sm">{option.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddOns;
