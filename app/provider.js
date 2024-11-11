"use client";
import { NextUIProvider } from "@nextui-org/react";
import Loading from "./loading";

import { Suspense, useEffect, useState } from "react";
import Login from "@/components/Authcomponents/Login";
import { Checktokenexpired } from "@/lib/API/Auth";
import Cookies from "js-cookie";
import { clearUser, setUser } from "@/lib/Redux/authSlice";
import { useDispatch } from "react-redux";

export function NextuiProviderWrapper({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initial loading state for 5 seconds

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
        } else {
          Cookies.remove("token");
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Token verification error:", error);
        Cookies.remove("token"); 
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
        {children}
        <Login />
      </NextUIProvider>
    </Suspense>
  );
}
