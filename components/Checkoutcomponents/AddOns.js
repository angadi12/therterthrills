import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import FogEffects from "@/public/asset/FogEffects.png";
import PartyProps from "@/public/asset/PartyProps.png";
import HBDLetters from "@/public/asset/HBDLetters.png";
import CandlePath from "@/public/asset/CandlePath.png";

import Singlerose from "@/public/asset/Singlerose.png";
import RoseBouquet from "@/public/asset/RoseBouquet.png";

import Photography1 from "@/public/asset/Photography1.png";
import Photography2 from "@/public/asset/Photography2.png";
import Photography3 from "@/public/asset/Photography3.png";
import Photography4 from "@/public/asset/Photography4.png";
import {
  addDecoration,
  removeDecoration,
  addRose,
  removeRose,
  togglePhotography,
  selectAddOns,
  selectTotalAmount,
} from "@/lib/Redux/addOnsSlice";
import { useDispatch, useSelector } from "react-redux";

const AddOns = () => {
  const dispatch = useDispatch();
  const { decorations, roses, photography } = useSelector(selectAddOns);
  const { selectedCakes, isEggless, cakeText } = useSelector(
    (state) => state.cakes
  );

  const decorationItems = [
    { name: "Fog Effects", price: 349, image: FogEffects },
    { name: "Party Props", price: 449, image: PartyProps },
    { name: "HBD Letters", price: 199, image: HBDLetters },
    { name: "Candle Path", price: 99, image: CandlePath },
  ];

  const roseItems = [
    { name: "Single Rose", price: 49, image: Singlerose },
    { name: "Rose Bouquet", price: 349, image: RoseBouquet },
  ];

  const photographyItems = [
    { name: "20 Pictures", price: 299, image: Photography1 },
    { name: "30 Pictures", price: 499, image: Photography2 },
    { name: "40 Pictures", price: 699, image: Photography3 },
    { name: "50 Pictures", price: 999, image: Photography4 },
  ];

  const toggleQuantitySelection = (item, setSelected, selectedItems) => {
    setSelected((prev) => ({
      ...prev,
      [item.name]: prev[item.name] ? prev[item.name] + 1 : 1,
    }));
  };

  const decreaseQuantity = (item, setSelected, selectedItems) => {
    setSelected((prev) => {
      const currentQuantity = prev[item.name] || 0;
      if (currentQuantity <= 1) {
        const updatedItems = { ...prev };
        delete updatedItems[item.name];
        return updatedItems;
      }
      return { ...prev, [item.name]: currentQuantity - 1 };
    });
  };

  const togglePhotographySelection = (name) => {
    setSelectedPhotography((prev) =>
      prev.includes(name)
        ? prev.filter((photo) => photo !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Decorations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 w-full">
          {decorationItems.map((decoration) => (
            <div
              key={decoration.name}
              className="flex flex-col items-center relative"
            >
              <Button
                className={`flex flex-col items-center justify-center h-40 w-32 md:h-48 md:w-40 bg-white p-1 rounded-lg ${
                  decorations[decoration.name]
                    ? "bg-pink-100 text-[#F30278] ring-1 ring-[#F30278]"
                    : "text-gray-600 hover:bg-gray-200 ring-1 ring-[#F30278]/30"
                }`}
                // onClick={() => dispatch(addDecoration(decoration))}
              >
                <Image
                  src={decoration.image}
                  alt={decoration.name}
                  width={80}
                  height={80}
                  className="mb-2 rounded-full"
                />
                <div className="flex flex-col justify-start pb-3">
                  <span className="text-sm">{decoration.name}</span>
                  <span className="text-sm">{decoration.price}/-</span>
                </div>
                {!decorations[decoration.name] && (
                  <Button
                    onClick={() => dispatch(addDecoration(decoration))}
                    size="sm"
                    className="absolute bg-[#F30278] text-white bottom-1 mx-auto left-0 right-0 w-1/2"
                  >
                    Add to cart
                  </Button>
                )}{" "}
              </Button>
              {decorations[decoration.name] && (
                <div className="absolute h-6 bg-[#F30278] w-1/2 mx-auto left-0 right-0 top-1/2 flex items-center justify-center gap-2">
                  <Button
                    variant="solid"
                    isIconOnly
                    className="bg-[#F30278] h-6 font-bold text-white"
                    onClick={() => dispatch(removeDecoration(decoration))}
                  >
                    -
                  </Button>
                  <span className="px-2 text-white">
                    {decorations[decoration.name]}
                  </span>
                  <Button
                    variant="solid"
                    isIconOnly
                    className="bg-[#F30278] h-6 font-bold text-white"
                    onClick={() => dispatch(addDecoration(decoration))}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Roses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {roseItems.map((rose) => (
            <div
              key={rose.name}
              className="flex relative flex-col items-center"
            >
              <Button
                className={`flex flex-col items-center justify-center h-40 w-32 md:h-48 md:w-40 bg-white p-1 rounded-lg ${
                  roses[rose.name]
                    ? "bg-pink-100 text-[#F30278] ring-1 ring-[#F30278]"
                    : "text-gray-600 hover:bg-gray-200 ring-1 ring-[#F30278]/30"
                }`}
                onClick={() => dispatch(addRose(rose))}
              >
                <Image
                  src={rose.image}
                  alt={rose.name}
                  width={80}
                  height={80}
                  className="mb-2 rounded"
                />
                <div className="flex flex-col justify-start pb-3">
                  <span className="text-sm">{rose?.name}</span>
                  <span className="text-sm">{rose?.price}/-</span>
                </div>
                {!roses[rose?.name] && (
                  <Button
                onClick={() => dispatch(addRose(rose))}
                size="sm"
                    className="absolute bg-[#F30278] text-white bottom-1 mx-auto left-0 right-0 w-1/2"
                  >
                    Add to cart
                  </Button>
                )}
              </Button>
              {roses[rose?.name] && (
                <div className="absolute h-6 bg-[#F30278] w-1/2 mx-auto left-0 right-0 top-1/2 flex items-center justify-center gap-2">
                  <Button
                    variant="solid"
                    isIconOnly
                    className="bg-[#F30278] h-6 font-bold text-white"
                    onClick={() => dispatch(removeRose(rose))}
                  >
                    -
                  </Button>
                  <span className="px-2 text-white">{roses[rose.name]}</span>
                  <Button
                    variant="solid"
                    isIconOnly
                    className="bg-[#F30278] h-6 font-bold text-white"
                    onClick={() => dispatch(addRose(rose))}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Photography</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 mx-auto gap-4">
          {photographyItems.map((option) => (
            <Button
              key={option.name}
              className={`flex flex-col items-center justify-center p-1 h-48 w-32 md:h-48 md:w-40 bg-white rounded-lg ${
                photography.includes(option.name)
                  ? "bg-pink-100 text-[#F30278] ring-1 ring-[#F30278]"
                  : "text-gray-600 hover:bg-gray-200 ring-1 ring-[#F30278]/30"
              }`}
              onClick={() => dispatch(togglePhotography(option))}
            >
              <Image
                src={option.image}
                alt={option.name}
                width={80}
                height={80}
                className="mb-2 rounded-full"
              />
              <div className="flex flex-col justify-start pb-3">
                <span className="text-sm">{option.name}</span>
                <span className="text-sm">{option.price}/-</span>
              </div>
              { !photography.includes(option.name) ? (
                  <Button
              onClick={() => dispatch(togglePhotography(option))}
              size="sm"
                    className="absolute bg-[#F30278] text-white bottom-1 mx-auto left-0 right-0 w-1/2"
                  >
                    Add to cart
                  </Button>
                ): <Button
              onClick={() => dispatch(togglePhotography(option))}
              size="sm"
                    className="absolute bg-[#F30278] text-white bottom-1 mx-auto left-0 right-0 w-1/2"
                  >
                   Remove
                  </Button> }
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddOns;
