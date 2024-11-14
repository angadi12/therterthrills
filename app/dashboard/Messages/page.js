"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, ChevronRight, Filter, Mail, Phone } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const messages = [
  {
    id: 1,
    name: 'Ashok H',
    phone: '+91-8383746293',
    email: 'sample@gmail.com',
    eventType: 'Birthday Party',
    avatar: '/placeholder.svg?height=40&width=40',
    message: '',
  },
  {
    id: 2,
    name: 'Sarah M',
    phone: '+91-8383746293',
    email: 'sample@gmail.com',
    eventType: 'Birthday Party',
    avatar: '/placeholder.svg?height=40&width=40',
    message: "Hi there! I'm interested in booking a private theater with you, but I have a quick question about the policies. Are we allowed to bring in outside food or snacks, or do we need to purchase refreshments through your service? Also, would we be able to connect to our own streaming accounts if we want to watch a particular movie? Thanks in advance!",
  },
  {
    id: 3,
    name: 'Emma H',
    phone: '+91-8383746293',
    email: 'sample@gmail.com',
    eventType: 'Birthday Party',
    avatar: '/placeholder.svg?height=40&width=40',
    message: '',
  },
  {
    id: 4,
    name: 'Kumar H',
    phone: '+91-8383746293',
    email: 'sample@gmail.com',
    eventType: 'Birthday Party',
    avatar: '/placeholder.svg?height=40&width=40',
    message: '',
  },
]

export default function MessagesSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedMessage, setExpandedMessage] = useState(2)

  const toggleMessage = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id)
  }

  return (
    <ScrollArea className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Messages <span className="text-pink-500">(12)</span>
        </h1>
        <div className="flex space-x-2">
          <Input
            type="search"
            placeholder="Search Notifications"
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={message.avatar} alt={message.name} />
                  <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{message.name}</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-1" />
                    {message.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <Mail className="h-4 w-4 inline mr-1" />
                  {message.email}
                </div>
                <div className="text-sm text-gray-500">{message.eventType}</div>
                <Button
                  variant="link"
                  className="text-pink-500"
                  onClick={() => toggleMessage(message.id)}
                >
                  {expandedMessage === message.id ? (
                    <>
                      Close Message
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      View Message
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
            {expandedMessage === message.id && message.message && (
              <div className="px-4 pb-4">
                <p className="text-gray-700 mb-4">{message.message}</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Reply</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}