"use client";

import { Spinner } from "@nextui-org/react";
import React from "react";

const Overlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
         <Spinner  color="danger"/>
        <p className="mt-4 text-lg font-semibold text-gray-700">Please wait ...</p>
      </div>
    </div>
  );
};

export default Overlay;
