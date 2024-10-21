'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@nextui-org/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CakeIcon, GlassWater, Users, PartyPopper, BabyIcon, HeartHandshake, Heart, Briefcase } from 'lucide-react'

const steps = ['Booking Details', 'Occasion', 'Add-Ons', 'Confirmation']

const occasions = [
    { name: 'Birthday', icon: CakeIcon },
    { name: 'Anniversary', icon: GlassWater },
    { name: 'Reunion', icon: Users },
    { name: 'Farewell', icon: PartyPopper },
    { name: 'Baby Shower', icon: BabyIcon },
    { name: 'Proposal', icon: HeartHandshake },
    { name: 'Romantic Date', icon: Heart },
    { name: 'Business Meet', icon: Briefcase },
  ]

export default function CheckoutOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOccasion, setSelectedOccasion] = useState('Birthday')

  const handleProceed = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }




  return (
    <div className="w-11/12 mx-auto px-6 py-20">
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li key={index} className={`flex items-center ${index !== steps.length - 1 ? 'w-full' : ''}`}>
            <div className='flex flex-col justify-center items-center gap-1'>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <span className={`text-sm font-medium ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>{index + 1}</span>
              </div>
              <span className={`ml-2 text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>{step}</span>

            </div>
              {index !== steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

       {currentStep ===0 && <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div className="space-y-4">
              <Input placeholder="Full Name" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="No. of people" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Phone Number" />
              <Input placeholder="Whatsapp Number" />
              <Input placeholder="Email Id" type="email" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Do you want to add decorations to your event? (Extra Charge)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>}


      {currentStep===1 &&  <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Choose occasion</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {occasions.map((occasion) => (
                <button
                  key={occasion.name}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                    selectedOccasion === occasion.name
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedOccasion(occasion.name)}
                >
                  <occasion.icon className="w-8 h-8 mb-2" />
                  <span className="text-sm">{occasion.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>}




        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Theatre Price (Standard)</span>
                <span>1472/-</span>
              </div>
              <div className="flex justify-between">
                <span>Add-Ons (6)</span>
                <span>1971/-</span>
              </div>
              <div className="flex justify-between">
                <span>Food (12)</span>
                <span>2311/-</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Coupon Applied (1)</span>
                <span>-250/-</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span className="text-pink-600">4468/-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <div className="flex items-center justify-around mt-6 ">
        <Button  disabled={currentStep === 0} onClick={handleBack} className="px-8 py-0.5 w-48 rounded-none  border-none bg-white border-black dark:border-white uppercase text-[#F30278] ring-1 ring-[#F30278] transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
        Back
        </Button>
        <Button onClick={handleProceed} className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
        Proceed
        </Button>
      </div>
    </div>
  )
}