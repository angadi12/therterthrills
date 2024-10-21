"use client"
import React from "react";
import * as animationData from "@/lib/Theaterthrills.json";
import Lottie from 'react-lottie';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className=" bg-white absolute z-50 left-0 right-0 top-0 bottom-0 w-full h-screen flex justify-center items-center">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loading;
