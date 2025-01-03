"use client"
import React, { useEffect, useMemo } from 'react'
import { Bell, MoreVertical, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux'



const notifications = [
  {
    id: '1',
    title: 'New Offer!',
    message: 'Get 20% off on your next order. Limited time offer!',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'Order Delivered',
    message: 'Your order #1234 has been delivered successfully.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'We have received your payment of $25.99 for order #1234.',
    time: '2 hours ago',
    isRead: true,
  },
  {
    id: '4',
    title: 'New Restaurant Added',
    message: 'Check out our new partner restaurant "Tasty Bites"!',
    time: '1 day ago',
    isRead: true,
  },
]

export default function NotificationSheet() {
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false)
  const unreadCount = notifications.filter(n => !n.isRead).length


  const socket = useMemo(
    () =>
      io("http://localhost:9100", {
        withCredentials: true,
      }),
    []
  );


  useEffect(() => {
    // Fetch initial orders when the component mounts
    // dispatch(fetchorders());

    // Set up socket listeners for real-time updates
    socket.on("connect", () => {
      // console.log("Connected to socket", socket.id);
    });

    socket.on("Messagecreated", (newContact) => {
      // console.log("New order received:", newContact);
      // toast.success(`New order received: ${newContact.orderId}`);
      // Optionally, you can dispatch an action to update the Redux store with the new order
      // dispatch(fetchorders());
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);



  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative hover:text-white hover:bg-transparent">
          <Bell className="h-6 w-6 text-black" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-[#F04F5F] rounded-full flex items-center justify-center text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full ">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)] mt-4">
          <div className="">
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                {index > 0 && <Separator className="my-2" />}
                <div className={`p-4 rounded-lg ${notification.isRead ? 'bg-white' : 'bg-pink-50'}`}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${notification.isRead ? 'bg-gray-200' : 'bg-[#F04F5F]'} mr-4`}>
                      <Bell className={`h-4 w-4 ${notification.isRead ? 'text-gray-600' : 'text-white'}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-sm">{notification.title}</h2>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}