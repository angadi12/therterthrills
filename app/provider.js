"use client";
import { NextUIProvider } from "@nextui-org/react";
import Loading from "../components/Homecomponents/loading";

import { Suspense, useEffect, useState } from "react";
import Login from "@/components/Authcomponents/Login";
import { Checktokenexpired } from "@/lib/API/Auth";
import Cookies from "js-cookie";
import { clearUser, setUser } from "@/lib/Redux/authSlice";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbarcomponets/Nav";
import Topfooter from "@/components/Footercomponets/Topfooter";
import Footer from "@/components/Footercomponets/Footer";

export function NextuiProviderWrapper({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initial loading state for 5 seconds
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Show loading for 5 seconds

    const verifyToken = async () => {
      const token = Cookies.get("token");

      if (!token) {
        dispatch(clearUser());
        return;
      }

      try {
        const result = await Checktokenexpired();
        if (result?.user) {
          dispatch(setUser(result.user));
          Cookies.set("User", JSON.stringify(result?.user));
          console.log(result.user)
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
    <Suspense fallback={<Loading />}>
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
            <Topfooter />

            <Footer />
          </>
        )}
        <Login />
      </NextUIProvider>
    </Suspense>
  );
}
