"use client"
import { useState } from 'react'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronRightIcon, Clock, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area'

export default function BookingDashboard() {
  const [dateRange, setDateRange] = useState('25-10-2024 to 28-10-2024')
  const [selectedTheatre, setSelectedTheatre] = useState('Silver Theatre')
  const [selectedYear, setSelectedYear] = useState('2024')

  const branches = [
    { name: 'Branch - 1', total: 12, pending: 2 },
    { name: 'Branch - 2', total: 12, pending: 2 },
    { name: 'Branch - 3', total: 12, pending: 2 },
    { name: 'Branch - 4', total: 12, pending: 2 },
  ]

  const performanceData = [
    { month: 'Jan', value: 80 },
    { month: 'Feb', value: 50 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 30 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 65 },
    { month: 'Aug', value: 50 },
    { month: 'Sep', value: 35 },
    { month: 'Oct', value: 70 },
    { month: 'Nov', value: 45 },
    { month: 'Dec', value: 65 },
  ]

  const upcomingEvents = [
    { icon: '🎂', name: 'Birthday', location: 'Lingampally', time: '9:00 AM - 12:30 PM' },
    { icon: '🥂', name: 'Anniversary', location: 'Lingampally', time: '9:00 AM - 12:30 PM' },
    { icon: '💍', name: 'Proposal', location: 'Lingampally', time: '9:00 AM - 12:30 PM' },
  ]

  const newBookings = [
    { icon: '🎉', name: 'Birthday Party', time: '9:00 AM - 12:30 PM' },
    { icon: '💑', name: 'Anniversary Party', time: '9:00 AM - 12:30 PM' },
    { icon: '👋', name: 'Farewell Party', time: '9:00 AM - 12:30 PM' },
  ]

  return (
    <ScrollArea className="p-4 bg-gray-100 ">
      <div className="w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Overall Status</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-pink-500 text-white border-pink-500 hover:bg-pink-600 hover:border-pink-600">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Theatre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Silver Theatre">Silver Theatre</SelectItem>
                <SelectItem value="Gold Theatre">Gold Theatre</SelectItem>
                <SelectItem value="Platinum Theatre">Platinum Theatre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-600 text-white">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-blue-500 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600 text-white">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-blue-500 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Pending Bookings</p>
                <p className="text-3xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600 text-white">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-blue-500 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Completed Bookings</p>
                <p className="text-3xl font-bold">44</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Our Branches</h2>
                <span className="text-green-500 font-medium">Live</span>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto space-x-4 pb-4">
                  {branches.map((branch, index) => (
                    <div key={index} className="flex-none w-48 border rounded-lg p-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <h3 className="font-medium mb-2">{branch.name}</h3>
                      <div className="flex justify-between text-sm">
                        <span>Total</span>
                        <span>Pending</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>{branch.total}</span>
                        <span>{branch.pending}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Performance</h2>
                <div className="flex items-center space-x-4">
                  <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Theatre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Silver Theatre">Silver Theatre</SelectItem>
                      <SelectItem value="Gold Theatre">Gold Theatre</SelectItem>
                      <SelectItem value="Platinum Theatre">Platinum Theatre</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="h-64">
                <div className="flex h-full items-end space-x-2">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full ${data.month === 'Jun' ? 'bg-pink-500' : 'bg-blue-600'}`} 
                        style={{ height: `${data.value}%` }}
                      ></div>
                      <span className="text-xs mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upcoming Events</h2>
                <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Theatre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Silver Theatre">Silver Theatre</SelectItem>
                    <SelectItem value="Gold Theatre">Gold Theatre</SelectItem>
                    <SelectItem value="Platinum Theatre">Platinum Theatre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl">
                        {event.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                      Send Reminder
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">New Bookings <span className="text-pink-500">(12)</span></h2>
                <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Theatre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Silver Theatre">Silver Theatre</SelectItem>
                    <SelectItem value="Gold Theatre">Gold Theatre</SelectItem>
                    <SelectItem value="Platinum Theatre">Platinum Theatre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {newBookings.map((booking, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${index === 1 ? 'bg-pink-500 text-white' : 'bg-blue-600 text-white'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                        {booking.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{booking.name}</h3>
                        <div className="text-sm opacity-80 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-6 h-6" />
                  </div>
                ))}
                <Button variant="link" className="w-full text-blue-600 hover:text-blue-700">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}