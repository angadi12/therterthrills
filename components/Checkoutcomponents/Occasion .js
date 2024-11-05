"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import Birthdayicon from "@/public/asset/Birthdayicon.png";
import GlassWater from "@/public/asset/GlassWater.png";
import Users1 from "@/public/asset/Users.png";
import PartyPopper from "@/public/asset/PartyPopper.png";
import BabyIcon from "@/public/asset/BabyIcon.png";
import HeartHandshake from "@/public/asset/HeartHandshake.png";
import Heart from "@/public/asset/Heart.png";
import Briefcase from "@/public/asset/Briefcase.png";
import Bridetobe from "@/public/asset/Bridetobe.png";
import Gromtobe from "@/public/asset/Gromtobe.png";
import Momtobe from "@/public/asset/Momtobe.png";
import Loveproposal from "@/public/asset/Loveproposal.png";
import Congratulations from "@/public/asset/Congratulations.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setOccasion,
  setNickname,
  setPartnerNickname,
} from "@/lib/Redux/checkoutSlice";

const Occasion = () => {
  const dispatch = useDispatch();
  const { selectedOccasion, nickname, partnerNickname } = useSelector(
    (state) => state.checkout
  );

  const occasions = [
    { name: "Birthday", icon: Birthdayicon, requiresPartner: false },
    { name: "Anniversary", icon: GlassWater, requiresPartner: true },
    { name: "Reunion", icon: Users1, requiresPartner: false },
    { name: "Farewell", icon: PartyPopper, requiresPartner: false },
    { name: "Baby Shower", icon: BabyIcon, requiresPartner: false },
    { name: "Proposal", icon: HeartHandshake, requiresPartner: true },
    { name: "Romantic Date", icon: Heart, requiresPartner: true },
    {
      name: "Business Meet",
      icon: Briefcase,
      requiresPartner: false,
      noInput: true,
    },
    { name: "Bride to be", icon: Bridetobe, requiresPartner: false },
    { name: "Groom to be", icon: Gromtobe, requiresPartner: false },
    { name: "Mom to be", icon: Momtobe, requiresPartner: false },
    { name: "Congratulations", icon: Congratulations, requiresPartner: false },
    { name: "Love Proposal", icon: Loveproposal, requiresPartner: true },
  ];

  const isPartnerOccasion = occasions.find(
    (occasion) => occasion.name === selectedOccasion
  )?.requiresPartner;

  const handleNicknameChange = (e) => {
    dispatch(setNickname(e.target.value.slice(0, 8)));
  };

  const handlePartnerNicknameChange = (e) => {
    dispatch(setPartnerNickname(e.target.value.slice(0, 8)));
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow flex flex-col justify-start items-start gap-8">
        <h2 className="text-xl font-semibold mb-4">Choose occasion</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {occasions.map((occasion) => (
            <Button
              key={occasion.name}
              className={`flex flex-col items-center justify-center h-32 w-36 bg-white rounded-lg transition-colors ${
                selectedOccasion === occasion.name
                  ? "bg-[#F302781A] font-semibold text-[#F30278] ring-1 ring-[#F30278]"
                  : " text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => dispatch(setOccasion(occasion.name))}
            >
              <Image
                src={occasion.icon}
                alt={occasion.name}
                className="w-14 h-14 mb-2"
              />
              <span className="text-lg">{occasion.name}</span>
            </Button>
          ))}
        </div>

        {selectedOccasion === "Business Meet" ? (
          ""
        ) : (
          <div className=" w-full grid grid-cols-2 items-center gap-4 justify-center">
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nickname {isPartnerOccasion ? "(Person 1)" : ""}
              </label>
              <div className="flex space-x-2 items-center">
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="Angella"
                  className="flex-grow"
                />
                {/* <Button className="bg-[#F30278] rounded-sm text-white">
                  Confirm
                </Button> */}
              </div>
            </div>

            {isPartnerOccasion && (
              <div>
                <label
                  htmlFor="partnerNickname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Partner's Nickname (Person 2)
                </label>
                <div className="flex space-x-2 items-center">
                  <Input
                    id="partnerNickname"
                    value={partnerNickname}
                    onChange={handlePartnerNicknameChange}
                    placeholder="Alex"
                    className="flex-grow"
                  />
                  {/* <Button className="bg-[#F30278] rounded-sm text-white">
                    Confirm
                  </Button> */}
                </div>
              </div>
            )}
          </div>
        )}
        {selectedOccasion === "Business Meet" ? (
          ""
        ) : (
          <p className="text-xs w-auto text-center p-1 rounded-full ring-1 ring-[#F30278] text-[#F30278] bg-pink-500/10">
            Maximum 8 Characters Allowed For Nickname
          </p>
        )}
      </div>
    </div>
  );
};

export default Occasion;
