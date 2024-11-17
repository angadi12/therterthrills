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
import { useRouter,usePathname } from "next/navigation";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Add-Ons", href: "/Add-Ons" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Blogs", href: "/blogs" },
];

export default function Mobilenav() {
  const [open, setOpen] = React.useState(false);
  const router=useRouter()
  const path=usePathname()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="light" isIconOnly className="md:hidden">
          <Menu className="h-6 text-black w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {navigationItems.map((item) => (
            <>
            <span
              key={item.name}
              href={item.href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                item.href === path && "text-[#F30278]"
              )}
              onClick={() =>{router.push(item.href), setOpen(false)}}
            >
              {item.name}
            </span>
            <Divider/>
            </>
          ))}
          <Button 
          onPress={()=>{router.push("/booknow"),setOpen(false)}}
              className="px-8 py-0.5 rounded-sm w-full border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              >
            BOOK NOW
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
