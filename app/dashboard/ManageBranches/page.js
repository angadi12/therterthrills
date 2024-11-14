"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter, MapPin, Plus, Users } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

// Sample data for branches
const branches = [
  {
    id: 1,
    location: 'Hyderabad',
    name: 'Financial District',
    adminCount: 1,
    theatreCount: 15,
    adminName: 'Admin Name',
    adminPhone: '+91-7393749403',
    adminStatus: 'Active',
  },
  {
    id: 2,
    location: 'Hyderabad',
    name: 'Financial District',
    adminCount: 1,
    theatreCount: 15,
    adminName: 'Admin Name',
    adminPhone: '+91-7393749403',
    adminStatus: 'Active',
  },
  {
    id: 3,
    location: 'Hyderabad',
    name: 'Financial District',
    adminCount: 1,
    theatreCount: 15,
    adminName: 'Admin Name',
    adminPhone: '+91-7393749403',
    adminStatus: 'Active',
  },
  {
    id: 4,
    location: 'Hyderabad',
    name: 'Financial District',
    adminCount: 1,
    theatreCount: 15,
    adminName: 'Admin Name',
    adminPhone: '+91-7393749403',
    adminStatus: 'Active',
  },
  {
    id: 5,
    location: 'Hyderabad',
    name: 'Financial District',
    adminCount: 1,
    theatreCount: 15,
    adminName: 'Admin Name',
    adminPhone: '+91-7393749403',
    adminStatus: 'Active',
  },
  {
    id: 6,
    location: 'Hyderabad',
    name: 'Financial District',
    adminCount: 1,
    theatreCount: 15,
    adminName: 'Admin Name',
    adminPhone: '+91-7393749403',
    adminStatus: 'Active',
  },
]

export default function ManageBranches() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <ScrollArea className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Manage Branches <span className="text-pink-500">({branches.length})</span>
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
        {branches.map((branch) => (
          <Card key={branch.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{branch.location}</span>
              </div>
              <CardTitle>{branch.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex space-x-2 mb-4">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{branch.adminCount} Admin</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>{branch.theatreCount} Theatres</span>
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt={branch.adminName} />
                  <AvatarFallback>{branch.adminName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{branch.adminName}</p>
                  <p className="text-sm text-pink-500">{branch.adminPhone}</p>
                </div>
                <Badge variant="outline" className="ml-auto text-green-500 border-green-500">
                  {branch.adminStatus}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 mt-2">
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