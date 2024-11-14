"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter, Mail, Phone, Plus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

// Sample data for admins
const admins = [
  {
    id: 1,
    name: 'Steve Smith',
    status: 'Active',
    location: 'Lingampally',
    email: 'stevesmiththrills@gmail.com',
    phone: '+91-7839387483/8372987289',
    avatarUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Steve Smith',
    status: 'Active',
    location: 'Lingampally',
    email: 'stevesmiththrills@gmail.com',
    phone: '+91-7839387483/8372987289',
    avatarUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Steve Smith',
    status: 'Active',
    location: 'Lingampally',
    email: 'stevesmiththrills@gmail.com',
    phone: '+91-7839387483/8372987289',
    avatarUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 4,
    name: 'Steve Smith',
    status: 'Active',
    location: 'Lingampally',
    email: 'stevesmiththrills@gmail.com',
    phone: '+91-7839387483/8372987289',
    avatarUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 5,
    name: 'Steve Smith',
    status: 'Active',
    location: 'Lingampally',
    email: 'stevesmiththrills@gmail.com',
    phone: '+91-7839387483/8372987289',
    avatarUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 6,
    name: 'Steve Smith',
    status: 'Active',
    location: 'Lingampally',
    email: 'stevesmiththrills@gmail.com',
    phone: '+91-7839387483/8372987289',
    avatarUrl: '/placeholder.svg?height=100&width=100',
  },
]

export default function ManageAdmins() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <ScrollArea className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Manage Admins <span className="text-pink-500">({admins.length})</span>
        </h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <Card key={admin.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={admin.avatarUrl} alt={admin.name} />
                    <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{admin.name}</h2>
                    <p className="text-green-500">{admin.status}</p>
                  </div>
                </div>
                <Badge className="bg-pink-500">{admin.location}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{admin.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{admin.phone}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Modify
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}