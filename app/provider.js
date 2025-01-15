"use client";
import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { Suspense, useEffect, useState } from "react";
import Login from "@/components/Authcomponents/Login";
import { Checktokenexpired } from "@/lib/API/Auth";
import Cookies from "js-cookie";
import { clearUser, setIsAuthenticated, setUser } from "@/lib/Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbarcomponets/Nav";
import Topfooter from "@/components/Footercomponets/Topfooter";
import Footer from "@/components/Footercomponets/Footer";
import useDeviceIdHook from "@/hooks/useDeviceId";
import ChatWidget from "@/components/Homecomponents/Chatwidget";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { io } from "socket.io-client";
import { fetchNotifications } from "@/lib/Redux/notificationSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { fetchContactsByDateRange } from "@/lib/Redux/contactSlice";
import moment from "moment";
import { fetchBookingByBranchId } from "@/lib/Redux/bookingSlice";
import { selectDateRange } from "@/lib/Redux/BookingdateSlice";

const Loading = dynamic(() => import("../components/Homecomponents/loading"), {
  ssr: false,
});

export function NextuiProviderWrapper({ children }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initial loading state for 5 seconds
  const pathname = usePathname();
  useDeviceIdHook();
  const { startDate: reduxStartDate, endDate: reduxEndDate } =
    useSelector(selectDateRange);
  const { selectedBranchId } = useSelector((state) => state.branches);

  useEffect(() => {
    const socket = io("https://test.thetheatrethrills.com"); // Replace with your backend URL

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    dispatch(fetchNotifications());

    socket.on("Notification", (newNotification) => {
      const notificationType = newNotification?.notification?.type;
      dispatch(fetchNotifications());

      const defaultFromDate = moment().subtract(7, "days").format("YYYY-MM-DD");
      const defaultToDate = moment().format("YYYY-MM-DD");

      if (pathname.startsWith("/dashboard")) {
        switch (notificationType) {
          case "Inquiry":
            // Fetch messages or perform specific logic for "Message" notifications
            dispatch(
              fetchContactsByDateRange({
                from: defaultFromDate,
                to: defaultToDate,
              })
            );
            toast({
              title: "New Message Received!",
              description: "You have received a new message.",
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
            break;

          case "Booking Received":
            dispatch(
              fetchBookingByBranchId({
                BranchId: selectedBranchId,
                status: "AllBooking",
                startDate: reduxStartDate,
                endDate: reduxEndDate,
              })
            );
            toast({
              title: "New Booking Received",
              description: newNotification?.notification?.message,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
            break;

          case "Cancellation Request":
            // Fetch reminders or perform specific logic for "Reminder" notifications
            dispatch(
              fetchBookingByBranchId({
                BranchId: selectedBranchId,
                status: "cancelled",
                startDate: reduxStartDate,
                endDate: reduxEndDate,
              })
            );
            toast({
              title: "Cancellation Request!",
              description: "You have a new Cancellation Request.",
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
            break;

          default:
            // Handle unknown types or fallback logic
            console.warn("Unhandled notification type:", notificationType);
            toast({
              title: "Notification Received",
              description: "You have received a new notification.",
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
            break;
        }
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Show loading for 5 seconds

    const verifyToken = async () => {
      const token = Cookies.get("token");

      if (!token) {
        Cookies.remove("token");
        Cookies.remove("User");
        dispatch(clearUser());
        return;
      }

      try {
        const result = await Checktokenexpired();
        if (result?.user) {
          dispatch(setUser(result?.user));
          dispatch(setIsAuthenticated());
          Cookies.set("User", JSON.stringify(result?.user));
        } else {
          Cookies.remove("token");
          Cookies.remove("User");
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Token verification error:", error);
        Cookies.remove("token");
        Cookies.remove("User");
        dispatch(clearUser());
      }
    };

    verifyToken();

    return () => clearTimeout(timer); // Clear timeout when component unmounts
  }, []);

  if (loading) {
    return <Loading />; // Show initial loading for 5 seconds
  }

  return (
    <NextUIProvider>
      {pathname === "/dashboard" ||
      pathname.startsWith("/dashboard") ||
      pathname === "/Profile/settings" ||
      pathname === "/Profile/accountinfo" ||
      pathname === "/Login" ? null : (
        <Navbar />
      )}
      {children}
      {pathname === "/dashboard" ||
      pathname.startsWith("/dashboard") ||
      pathname === "/Profile/settings" ||
      pathname === "/Profile/accountinfo" ||
      pathname === "/Login" ? null : (
        <>
          {pathname !== "/checkout" && <ChatWidget />}

          <Topfooter />

          <Footer />
        </>
      )}
      <Login />
    </NextUIProvider>
  );
}
