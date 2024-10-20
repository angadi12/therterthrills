"use client"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function BookingHeader() {
  const [date, setDate] = useState()

  return (
    <div className="w-11/12 mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-medium">
          Book Your{" "}
          <span className="bg-clip-text font-bold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">Private Theatre</span>
          <br />
          Experience Today!
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-[400px] justify-start h-12 text-left font-normal ${
                !date && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[#F30278]" />
              {date ? format(date, "PPP") : <span>Choose Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Calendar
            className={""}
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}