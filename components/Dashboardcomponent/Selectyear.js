"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"



export default function DynamicYearSelect({ 
  label = "Select Year", 
  onChange 
}) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())

  useEffect(() => {
    // Update the current year if it changes (e.g., if the component is mounted over New Year's)
    const interval = setInterval(() => {
      const newCurrentYear = new Date().getFullYear()
      if (newCurrentYear !== currentYear) {
        setCurrentYear(newCurrentYear)
        setSelectedYear(newCurrentYear.toString())
      }
    }, 1000 * 60 * 60) // Check every hour

    return () => clearInterval(interval)
  }, [currentYear])

  const handleYearChange = (value) => {
    setSelectedYear(value)
    onChange?.(parseInt(value, 10))
  }

  const years = [currentYear - 1, currentYear]

  return (
    <div className="w-full  space-y-2">
      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger id="year-select" className="w-full  h-10">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

