"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Filter, Plus } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

const payments = [
  {
    id: 1,
    name: "Mithul M",
    bookingId: "#booking_7562",
    contactNo: "91+7353830989",
    occasion: "Birthday Party",
    receivedOn: "28-10-2024",
    method: "UPI",
    amount: "5999/-",
  },
  {
    id: 2,
    name: "Mithul M",
    bookingId: "#booking_7562",
    contactNo: "91+7353830989",
    occasion: "Anniversary Party",
    receivedOn: "28-10-2024",
    method: "UPI",
    amount: "5999/-",
  },
  {
    id: 3,
    name: "Mithul M",
    bookingId: "#booking_7562",
    contactNo: "91+7353830989",
    occasion: "Reunion Party",
    receivedOn: "28-10-2024",
    method: "Online Banking",
    amount: "5999/-",
  },
  {
    id: 4,
    name: "Mithul M",
    bookingId: "#booking_7562",
    contactNo: "91+7353830989",
    occasion: "Farewell Party",
    receivedOn: "28-10-2024",
    method: "Cash",
    amount: "5999/-",
  },
  {
    id: 5,
    name: "Mithul M",
    bookingId: "#booking_7562",
    contactNo: "91+7353830989",
    occasion: "Birthday Party",
    receivedOn: "28-10-2024",
    method: "Debit Card",
    amount: "5999/-",
  },
]

export default function PaymentsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <ScrollArea className="w-full mx-auto p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Payments</h1>
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search"
              className="w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="icon" className="bg-pink-500 hover:bg-pink-600">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              All Payments
            </TabsTrigger>
            <TabsTrigger 
              value="advance"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              Advance Payments
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              Completed Payments
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-600">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Booking_ID</TableHead>
                <TableHead className="text-white">Contact No.</TableHead>
                <TableHead className="text-white">Occasion</TableHead>
                <TableHead className="text-white">Received On</TableHead>
                <TableHead className="text-white">Method</TableHead>
                <TableHead className="text-white text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.name}</TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>
                    <a 
                      href={`tel:${payment.contactNo}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {payment.contactNo}
                    </a>
                  </TableCell>
                  <TableCell>{payment.occasion}</TableCell>
                  <TableCell>{payment.receivedOn}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">
                      {payment.amount}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  )
}