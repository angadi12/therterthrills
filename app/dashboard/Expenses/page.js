"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Filter, Plus } from 'lucide-react'

const expenses = [
  {
    id: 1,
    name: "Food Items",
    date: "28-10-2024",
    description: "Cost of snacks, drinks, and restocking",
    amount: "2999/-",
  },
  {
    id: 2,
    name: "Electricity Bill",
    date: "28-10-2024",
    description: "Power expenses for projectors, lighting",
    amount: "2999/-",
  },
  {
    id: 3,
    name: "Internet Bill",
    date: "28-10-2024",
    description: "Monthly charges for internet",
    amount: "2999/-",
  },
  {
    id: 4,
    name: "Decorations",
    date: "28-10-2024",
    description: "Costs for themed decorations, balloons etc",
    amount: "2999/-",
  },
  {
    id: 5,
    name: "Party Supplies",
    date: "28-10-2024",
    description: "Plates, napkins, cups, and utensils",
    amount: "2999/-",
  },
]

export default function ExpensesTable() {
  return (
    <ScrollArea className="w-full mx-auto p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search"
              className="w-64"
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="icon" className="bg-pink-500 hover:bg-pink-600">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-600">
              <TableRow>
                <TableHead className="text-white font-medium">Name</TableHead>
                <TableHead className="text-white font-medium">Date</TableHead>
                <TableHead className="text-white font-medium">Description</TableHead>
                <TableHead className="text-white font-medium">Amount</TableHead>
                <TableHead className="text-white font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Modify
                    </Button>
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