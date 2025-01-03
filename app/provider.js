"use client";
import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";

import { Suspense, useEffect, useState } from "react";
import Login from "@/components/Authcomponents/Login";
import { Checktokenexpired } from "@/lib/API/Auth";
import Cookies from "js-cookie";
import { clearUser, setIsAuthenticated, setUser } from "@/lib/Redux/authSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbarcomponets/Nav";
import Topfooter from "@/components/Footercomponets/Topfooter";
import Footer from "@/components/Footercomponets/Footer";
import useDeviceIdHook from '@/hooks/useDeviceId';
import ChatWidget from "@/components/Homecomponents/Chatwidget";

const Loading = dynamic(() => import("../components/Homecomponents/loading"), {
  ssr: false, 
});

export function NextuiProviderWrapper({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initial loading state for 5 seconds
  const pathname = usePathname();
  useDeviceIdHook(); 

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
          <Navbar/>
          
        )}
        {children}
        {pathname === "/dashboard" ||
        pathname.startsWith("/dashboard") ||
        pathname === "/Profile/settings" ||
        pathname === "/Profile/accountinfo" ||
        pathname === "/Login" ? null : (
          <>
          <ChatWidget/>

            <Topfooter />

            <Footer />
          </>
        )}
        <Login />
      </NextUIProvider>
  );
}
