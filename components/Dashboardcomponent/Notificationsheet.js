import React, { useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BaseUrl } from "@/lib/API/Baseurl";
import { useRouter, usePathname } from "next/navigation";
import {
  deleteNotification,
  fetchNotifications,
} from "@/lib/Redux/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationSheet() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]);
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  const unreadCount = notifications?.filter((n) => n.status === "Unread").length;

  // Mark notification as read and navigate
  const handleNotificationClick = async (id, route) => {
    console.log(pathname,route)
    try {
      await dispatch(deleteNotification(id));
      if (pathname === route) {
        setOpen(!open);
        dispatch(fetchNotifications())
      } else {
        router.push(route);
        setOpen(!open);
        dispatch(fetchNotifications())
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative hover:text-white hover:bg-transparent"
        >
          <Bell className="h-6 w-6 text-black" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-[#F30278] rounded-full flex items-center justify-center text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)] mt-4">
          <div>
            {notifications?.map((notification, index) => (
              <React.Fragment key={notification.id}>
                {index > 0 && <Separator className="my-2" />}
                <div
                  className={`p-4 rounded-lg ${
                    notification?.status !== "Unread" ? "bg-white" : "bg-pink-50"
                  } cursor-pointer`}
                  onClick={() =>
                    handleNotificationClick(
                      notification?._id,
                      notification?.route
                    )
                  }
                >
                  <div className="flex items-start">
                    <div
                      className={`p-2 rounded-full ${
                        notification?.status !== "Unread"
                          ? "bg-gray-200"
                          : "bg-[#F04F5F]"
                      } mr-4`}
                    >
                      <Bell
                        className={`h-4 w-4 ${
                          notification?.status !== "Unread"
                            ? "text-gray-600"
                            : "text-white"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-sm">
                        {notification?.type}
                      </h2>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification?.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification?.createdAt}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
