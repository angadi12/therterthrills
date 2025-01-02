"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronDown,
  MessageSquare,
  Phone,
  ChevronsDown,
} from "lucide-react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed md:bottom-6 bottom-20 md:right-6 right-3 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full mb-4 right-0"
          >
            <div className="bg-white rounded-2xl shadow-lg md:w-[300px] w-full p-6 relative">
              <div className="absolute md:-bottom-2 -bottom-1 md:right-6 right-3 w-4 h-4 bg-white transform rotate-45" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <ChevronDown className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#F30278]/20 bg-opacity-10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#004AAD]" />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h2 className="text-xl font-semibold bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#F30278] via-[#F30278] to-[#E2B600]">
                  Hi there!
                </h2>
                <p className="text-gray-600">How can I help you?</p>
              </div>

              <Button
                className="px-8 py-0.5 rounded-sm w-full  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                onClick={() =>
                  window.open("https://wa.me/918885888949", "_blank")
                }
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with us</span>
                </div>
                <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
              </Button>

              <div className="mt-4 text-center flex items-center justify-center  gap-2">
                <Link
                  href={
                    "https://www.instagram.com/thetheatrethrills/?igsh=aTB2a25hYzQxNWpp"
                  }
                >
                  <Instagram className="text-pink-500 w-4 h-4" />
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/people/The-Theatre-Thrills/61570456632986/?mibextid=ZbWKwL"
                  }
                >
                  <Facebook className="text-blue-500 w-4 h-4" />
                </Link>
                <Link href={"https://www.youtube.com/@TheTheatreThrills"}>
                  <Youtube className="text-red-500 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F30278] hover:bg-opacity-90 md:w-14 md:h-14 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isOpen ? (
          <Phone className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}{" "}
      </motion.button>
    </div>
  );
}
