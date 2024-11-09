"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/lib/Redux/authSlice";
import Login from "@/components/Authcomponents/Login";

export default function Unauthorized() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

  const handleLoginClick = () => {
    dispatch(openLoginModal());
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        You are not logged in.
      </h1>
      <p className="text-gray-600">
        Please log in to access this page.
      </p>
      <button
        onClick={handleLoginClick}
        className="px-8 py-0.5 rounded-sm w-48 h-12  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
        Log In
      </button>
      <Login />
    </div>
  );
}
