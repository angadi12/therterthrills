"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Tv ,Cake} from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Button, Divider } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"

import Birthdayicon from "@/public/asset/Birthdayicon.png"
import GlassWater from "@/public/asset/GlassWater.png"
import Users1 from "@/public/asset/Users.png"
import PartyPopper from "@/public/asset/PartyPopper.png"
import BabyIcon from "@/public/asset/BabyIcon.png"
import HeartHandshake from "@/public/asset/HeartHandshake.png"
import Heart from "@/public/asset/Heart.png"
import Briefcase from "@/public/asset/Briefcase.png"

import FogEffects from "@/public/asset/FogEffects.png"
import PartyProps from "@/public/asset/PartyProps.png"
import HBDLetters from "@/public/asset/HBDLetters.png"
import CandlePath from "@/public/asset/CandlePath.png"

import Photography1 from "@/public/asset/Photography1.png"
import Photography2 from "@/public/asset/Photography2.png"
import Photography3 from "@/public/asset/Photography3.png"
import Photography4 from "@/public/asset/Photography4.png"

import Cakes1 from "@/public/asset/Cakes1.png"
import Cakes2 from "@/public/asset/Cakes2.png"
import Cakes3 from "@/public/asset/Cakes3.png"
import Cakes4 from "@/public/asset/Cakes4.png"

import Image from "next/image";

const steps = ["Booking Details", "Occasion", "Add-Ons", "Confirmation"];

const occasions = [
  { name: "Birthday", icon: Birthdayicon },
  { name: "Anniversary", icon: GlassWater },
  { name: "Reunion", icon: Users1 },
  { name: "Farewell", icon: PartyPopper },
  { name: "Baby Shower", icon: BabyIcon },
  { name: "Proposal", icon: HeartHandshake },
  { name: "Romantic Date", icon: Heart },
  { name: "Business Meet", icon: Briefcase },
];

const decorations = [
  { name: 'Fog Effects', image: FogEffects },
  { name: 'Party Props', image: PartyProps },
  { name: 'HBD Letters', image: HBDLetters },
  { name: 'Candle Path', image: CandlePath },
]

const cakes = [
  { name: 'Option 1', image:Cakes1 },
  { name: 'Option 2', image:Cakes2 },
  { name: 'Option 3', image:Cakes3 },
  { name: 'Option 4', image:Cakes4 },
]

const photography = [
  { name: '20 Pictures', image: Photography1 },
  { name: '30 Pictures', image:Photography2 },
  { name: '40 Pictures', image: Photography3 },
  { name: '50 Pictures', image: Photography4 },
]



export default function CheckoutOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOccasion, setSelectedOccasion] = useState("Birthday");
  const [selectedDecorations, setSelectedDecorations] = useState([])
  const [selectedCake, setSelectedCake] = useState('')
  const [cakeText, setCakeText] = useState('')
  const [selectedPhotography, setSelectedPhotography] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleApplyCoupon = () => {
    // Logic to apply coupon code
    console.log('Applying coupon:', couponCode)
  }

  const handleProceedToPayment = () => {
    if (!agreed) {
      alert('Please agree to the conditions before proceeding.')
      return
    }
    // Logic to proceed to payment
    console.log('Proceeding to payment')
  }

  const handleProceed = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const toggleDecoration = (name) => {
    setSelectedDecorations(prev =>
      prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]
    )
  }

  return (
    <div className="w-11/12 mx-auto px-6 py-20">
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center ${
                index !== steps.length - 1 ? "w-full" : ""
              }`}
            >
              <div className="flex flex-col justify-center items-center gap-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index <= currentStep ? "bg-[#004AAD]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStep ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? "text-[#004AAD]" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    index < currentStep ? "bg-[#004AAD]" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentStep === 0 && (
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-md shadow ring-1 ring-gray-300">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 justify-center items-center gap-4">
                <Input placeholder="Full Name" className="h-12"/>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="No. of people" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                </div>
                <div className="grid grid-cols-2 justify-center items-center gap-4">
                <Input placeholder="Phone Number" className="h-12"/>
                <Input placeholder="Whatsapp Number" className="h-12"/>
                 </div>
                <Input placeholder="Email Id" type="email" className="h-12" />
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Do you want to add decorations to your event? (Extra Charge)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="md:col-span-2">
            <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-4">Choose occasion</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.name}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                      selectedOccasion === occasion.name
                        ? "bg-[#F302781A] font-semibold text-[#F30278]"
                        : " text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedOccasion(occasion.name)}
                  >
                    <Image src={occasion.icon} alt={occasion.icon} className="w-14 h-14 mb-2" />
                    <span className="text-lg ">{occasion.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

       {currentStep ===2 && <div className="md:col-span-2">
          <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow">
            <h2 className="text-xl font-semibold mb-4">Decorations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {decorations.map((decoration) => (
                <Button
                  key={decoration.name}
                  className={`flex flex-col items-center justify-center h-32 w-28 bg-white p-1 rounded-lg transition-colors ${
                    selectedDecorations.includes(decoration.name)
                      ? 'bg-pink-100 text-[#F30278]'
                      : ' text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleDecoration(decoration.name)}
                >
                  <Image src={decoration.image} alt={decoration.name} width={80} height={80} className="mb-2 rounded" />
                  <span className="text-sm">{decoration.name}</span>
                </Button>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Cakes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {cakes.map((cake) => (
                <Button
                  key={cake.name}
                  className={`flex flex-col items-center justify-center bg-white h-32 w-28 p-1 rounded-lg transition-colors ${
                    selectedCake === cake.name
                      ? 'bg-pink-100 text-[#F30278]'
                      : ' text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCake(cake.name)}
                >
                  <Image src={cake.image} alt={cake.name} width={80} height={80} className="mb-2 rounded" />
                  <span className="text-sm">{cake.name}</span>
                </Button>
              ))}
            </div>
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Type the text to be on the cake"
                value={cakeText}
                onChange={(e) => setCakeText(e.target.value)}
                className="w-full"
              />
            </div>

            <h2 className="text-xl font-semibold mb-4">Photography</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {photography.map((option) => (
                <Button
                  key={option.name}
                  className={`flex flex-col items-center justify-center p-1 h-32 w-28 bg-white rounded-lg transition-colors ${
                    selectedPhotography === option.name
                      ? 'bg-pink-100 text-[[#F30278]'
                      : ' text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedPhotography(option.name)}
                >
                  <Image src={option.image} alt={option.name} width={80} height={80} className="mb-2 rounded" />
                  <span className="text-sm">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>}


       { currentStep ===3 &&<div className="md:col-span-2">
          <div className="bg-[#2076E80D] p-6 rounded-md ring-1 ring-[#004AAD] shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex items-center">
                <Tv className="w-5 h-5 mr-2 text-[#004AAD]" />
                <span className="text-[#004AAD]">Bronze Theatre</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#004AAD]" />
                <span className="text-[#004AAD]">4</span>
              </div>

            </div>
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#004AAD]" />
                <span className="text-[#004AAD]">Lingampally</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-[#004AAD]">17-10-2024</span>
              </div>

            </div>
            <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center col-span-2">
                <Cake className="w-5 h-5 mr-2 text-[#004AAD]" />
                <span className="text-[#004AAD]">Birthday Party</span>
              </div>
              <div className="flex items-center col-span-2">
                <Clock className="w-5 h-5 mr-2 text-[#004AAD]" />
                <span className="text-[#004AAD]">9:00 AM - 12:30 PM</span>
              </div>
            </div>
            </div>
          </div>

          <div className="bg-[#2076E80D] p-6 rounded-md ring-1 ring-[#004AAD] shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Add-Ons</h2>
            <ul className="list-disc list-inside">
              <li className="text-[#004AAD]">Fog Effects</li>
              <li className="text-[#004AAD]">Black Forest Cake</li>
              <li className="text-[#004AAD]">20 Photos</li>
            </ul>
          </div>

          <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p className="font-bold">Refund Policy :</p>
              <p>{`Partial advance amount (Rs 500/-) will be refundable if you cancel the slot atleast 72 hours prior to your booking time.`}</p>
            </div>
            <ol className="list-decimal list-inside space-y-2">
              <li>{`Smoking and Consumption of Alcohol is strictly prohibited inside the Theaters.`}</li>
              <li>{`You need to bring your own OTT accounts to watch the content.`}</li>
              <li>{`Party poppers, foam and Champaigne is not allowed inside the theaters, considering the sensitivity of the Theaters.`}</li>
              <li>{`Outside food is strictly prohibited, considering the sensitivity of carpets and recliners inside the Theaters.`}</li>
              <li>{`We charge full for children above or equal to 5 years and half for those who are below 5 years`}</li>
              <li>{`Right to admission is reserved by the Management.`}</li>
            </ol>
            <div className="mt-4 flex items-center">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked)} />
              <label htmlFor="terms" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to all the above conditions.
              </label>
            </div>
            <div className="flex justify-center items-center w-full">
          <Button 
          className="px-8 mt-6 py-0.5 w-60 mx-auto rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          onClick={handleProceedToPayment}>
            Proceed to Payment 
          </Button>
            </div>
          </div>

        </div>}



        <div>
          <div className="bg-white p-4 rounded-md shadow ring-1 ring-gray-300">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-4 text-[#636363]">
              <div className="flex justify-between">
                <span>Theatre Price (Standard)</span>
                <span>1472/-</span>
              </div>
              <Divider/>
              <div className="flex justify-between">
                <span>Add-Ons (6)</span>
                <span>1971/-</span>
              </div>
              <Divider/>

              <div className="flex justify-between">
                <span>Food (12)</span>
                <span>2311/-</span>
              </div>
              <Divider/>

              <div className="flex justify-between text-green-600">
                <span>Coupon Applied (1)</span>
                <span>-250/-</span>
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button className="flex justify-between rounded-md h-12 bg-[#F30278] font-semibold w-full">
              <span className="text-white">Total Amount</span>
              <span className="text-white">4468/-</span>
            </Button>
          </div>
         {currentStep===3 && <div className="mt-6 flex items-center">
            <Input 
              type="text" 
              placeholder="Enter Coupon Code" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="rounded-r-none h-12"
            />
            <Button onClick={handleApplyCoupon} className="rounded-l-none bg-[#F30278] text-white h-12">
              Apply
            </Button>
          </div>}
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 mt-12 ">
        <Button
          disabled={currentStep === 0}
          onClick={handleBack}
          className="px-8 py-0.5 w-48 rounded-none  border-none bg-white border-black dark:border-white uppercase text-[#F30278] ring-1 ring-[#F30278] transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Back
        </Button>
        <Button
          onClick={handleProceed}
          className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
