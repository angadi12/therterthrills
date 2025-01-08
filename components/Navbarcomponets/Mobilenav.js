"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button, Divider } from "@nextui-org/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/asset/Logo.png";
import {
  ChevronRight,
  Handshake,
  House,
  SearchSlash,
  SmilePlus,
  BookImage,
  Headset,
  Rss,
  TicketSlash,
  GlobeLock,
  HandPlatter,
  SquareArrowOutUpRight 
} from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/", icon: <House strokeWidth={1.5} /> },
  { name: "About Us", href: "/about", icon: <SearchSlash strokeWidth={1.5} /> },
  {
    name: "Our Services",
    href: "/services",
    icon: <HandPlatter strokeWidth={1.5} />,
  },
  { name: "Add-Ons", href: "/Add-Ons", icon: <SmilePlus strokeWidth={1.5} /> },
  { name: "Gallery", href: "/gallery", icon: <BookImage strokeWidth={1.5} /> },
  { name: "Blogs", href: "/blogs", icon: <Rss strokeWidth={1.5} /> },
  {
    name: "Refund Policy",
    href: "/refund-policy",
    icon: <TicketSlash strokeWidth={1.5} />,
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
    icon: <GlobeLock strokeWidth={1.5} />,
  },
  {
    name: "Terms & conditions",
    href: "/terms-and-conditions",
    icon: <Handshake strokeWidth={1.5} />,
  },
  { name: "Contact Us", href: "/contact", icon: <Headset strokeWidth={1.5} /> },
];

export default function Mobilenav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const path = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="light" isIconOnly className="lg:hidden">
          <Menu className="h-6 text-black w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <Image
            src={Logo}
            alt="logo"
            className="object-contain h-12 w-12 absolute top-2"
          />
        </SheetHeader>
        <nav className="mt-14 flex flex-col justify-between gap-3">
          {navigationItems.map((item) => (
            <>
              <div
                key={item.name}
                onClick={() => {
                  router.push(item.href), setOpen(false);
                }}
                className="w-full flex justify-between items-center"
              >
                <span
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 w-full",
                    item.href === path && "text-[#F30278]"
                  )}
                >
                  {item.icon}
                  {item.name}
                </span>
                <ChevronRight className="text-gray-300" />
              </div>
              <Divider />
            </>
          ))}
          <Button
            onPress={() => {
              router.push("/choosebranch"), setOpen(false);
            }}
            className="px-8 py-0.5 rounded-sm w-full mt-auto border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            BOOK NOW
          </Button>
          <span onClick={()=>router.push("https://www.angadiworldtech.com/")} className="underline cursor-pointer text-center text-[#004AAD] text-xs ">Developed by AWT Pvt Ltd<SquareArrowOutUpRight className="inline-block text-[#F30278] cursor-pointer h-4 w-4 ml-2 mb-1"/></span>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
