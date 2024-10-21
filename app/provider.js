"use client";
import { NextUIProvider } from "@nextui-org/react";
import Loading from "./loading";
import { useState } from "react";

export function NextuiProviderWrapper({ children }) {
const [loading, Setloading] = useState(true)

setTimeout(() => {
  Setloading(false)
}, 5000);


if(loading){
  return <Loading/>
}

  return <NextUIProvider>{children}</NextUIProvider>;
}
