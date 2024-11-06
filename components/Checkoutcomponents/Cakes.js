"use client"
import React, { useState } from 'react';
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from "@nextui-org/react";
import { SquareDot } from 'lucide-react';

import Cakes1 from "@/public/asset/Cakes1.png";
import Cakes2 from "@/public/asset/Cakes2.png";
import Cakes3 from "@/public/asset/Cakes3.png";
import Cakes4 from "@/public/asset/Cakes4.png";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { toggleEggless, updateCakeText, addCake, updateQuantity } from "@/lib/Redux/cakeSlice";

const Cakes = () => {
  
  const dispatch = useDispatch();

  // Access state from Redux
  const selectedCakes = useSelector((state) => state.cakes.selectedCakes);
  const isEggless = useSelector((state) => state.cakes.isEggless);
  const cakeText = useSelector((state) => state.cakes.cakeText);

    const cakes = [
        { id: 1, name: "Vanilla", price: 499, image: Cakes1 },
        { id: 2, name: "Strawberry", price: 549, image: Cakes2 },
        { id: 3, name: "Butterscotch", price: 549, image: Cakes3 },
        { id: 4, name: "Chocolate", price: 599, image: Cakes4 },
    ];

  

    return (
      <div className="md:col-span-2">
      <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow flex flex-col justify-start items-start gap-8 w-full">
          <div className="bg-pink-50 text-pink-600 p-2 text-sm rounded-lg mb-6 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Images Are For Demonstration Purposes Only. Actual Cake May Look Different.
          </div>

          <div className="flex justify-between items-center mb-6 w-full">
              <h1 className="text-2xl font-bold">Select Cakes</h1>
              <div className="flex items-center gap-2">
                  <span className="text-[#F30278]">Eggless</span>
                  <Switch checked={isEggless} onCheckedChange={() => dispatch(toggleEggless())} />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {cakes.map((cake) => (
                  <Card
                      key={cake.id}
                      className={`p-4 cursor-pointer relative transition-all ${
                          selectedCakes[cake.id] ? "ring-2 ring-pink-500 border-0 bg-pink-100" : ""
                      }`}
                      onClick={() => dispatch(addCake(cake))}
                  >
                    <SquareDot className={`absolute top-2 right-2 ${isEggless? "text-green-500":"text-red-500"}`}/>
                      <div className="aspect-square relative mb-4 rounded-full overflow-hidden">
                          <Image
                              src={cake.image}
                              alt={cake.name}
                              fill
                              className="object-contain"
                          />
                      </div>
                      <div className="text-center">
                          <h3 className="font-semibold ">{cake.name}</h3>
                          <p className="text-gray-600">{cake.price}/-</p>

                          {selectedCakes[cake.id] && (
                              <div className="mt-8 absolute rounded-full bg-[#F30278] w-11/12 mx-auto left-0 right-0 top-1/2 flex items-center justify-center gap-2">
                                  <Button
                                      variant="solid"
                                      isIconOnly
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          dispatch(updateQuantity({ id: cake.id, change: -1 }));
                                      }}
                                      className="bg-[#F30278] font-bold text-white"
                                  >
                                      -
                                  </Button>
                                  <span className="w-auto font-bold text-white text-center">
                                      {selectedCakes[cake.id].quantity}
                                  </span>
                                  <Button
                                      variant="solid"
                                      isIconOnly
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          dispatch(updateQuantity({ id: cake.id, change: 1 }));
                                      }}
                                      className="bg-[#F30278] font-bold text-white"
                                  >
                                      +
                                  </Button>
                              </div>
                          )}
                      </div>
                  </Card>
              ))}
          </div>

          <div className="bg-pink-50 text-pink-600 p-2 text-sm rounded-lg mb-6 flex items-start gap-2">
              <Info className="h-6 w-6" />
              {`For photoclippings, our team will reach out to you on the day of booking. You need to send 16 soft copies of the photos you want to place inside the theater.`}
          </div>

          <div className="mb-6 w-1/2">
              <Input
                  type="text"
                  placeholder="Type the text to be on the cake"
                  value={cakeText}
                  onChange={(e) => dispatch(updateCakeText(e.target.value))}
                  className="w-full"
              />
          </div>
      </div>
  </div>
);
};

export default Cakes;
