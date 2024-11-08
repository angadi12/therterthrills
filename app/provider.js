"use client";
import { NextUIProvider} from "@nextui-org/react";
import Loading from "./loading";

import {useState } from "react";
import Login from "@/components/Authcomponents/Login";


export function NextuiProviderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  if (loading) {
    return <Loading />;
  }




  return (
    <NextUIProvider>
      {children}
      <Login/>
    </NextUIProvider>
  );
}