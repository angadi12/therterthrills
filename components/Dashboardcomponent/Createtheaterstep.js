'use client'

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function CreateTheatreForm() {
  const [selectedSlot, setSelectedSlot] = React.useState("9:00 AM - 12:00 PM")

  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:30 PM - 3:30 PM",
    "4:00 AM - 5:30 PM",
    "5:30 PM - 7:00 PM",
    "7:30 PM - 10:00 PM"
  ]

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Create New Theatre</h1>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="price" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="details">Theatre Details</TabsTrigger>
          <TabsTrigger value="price">Price & Availability</TabsTrigger>
          <TabsTrigger value="branch">Branch & Admin</TabsTrigger>
          <TabsTrigger value="pictures">Pictures</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="space-y-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-4">Set Rates</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    type="text" 
                    placeholder="Set theatre price" 
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground mt-1">/-</span>
                </div>
                <div className="flex-1">
                  <Input 
                    type="text" 
                    placeholder="Set Advanced Amount" 
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground mt-1">/-</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="advanced-booking" />
              <label
                htmlFor="advanced-booking"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Hide Advanced Booking for this theatre
              </label>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Create a Coupon</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    type="text" 
                    placeholder="THRILLS250" 
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Input 
                    type="text" 
                    placeholder="250" 
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground mt-1">/-</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Choose Available Slots</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    className={cn(
                      "w-full",
                      selectedSlot === slot && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
                <Button variant="outline" className="text-primary">
                  +Add Slot
                </Button>
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Next
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

