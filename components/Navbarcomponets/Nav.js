"use client";
import Link from "next/link";
import Logo from "@/public/asset/Logo.png";
import Insta from "@/public/asset/Insta.png";
import Facebook from "@/public/asset/Facebook.png";
import Youtube from "@/public/asset/Youtube.png";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  stagger,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { LayoutDashboard, CalendarFold, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const active = " font-medium text-[#F30278]";
  const unactive = " text-gray-800 font-medium hover:text-[#F30278]";
  const [activeitem, setactiveitem] = useState();
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY.get() > prevScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setPrevScrollY(scrollY.get());
    };

    const unsubscribe = scrollY.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollY, prevScrollY]);

  const handleredirect = (link) => {
    switch (link) {
      case "home":
        router.push("/");
        break;
      case "blogs":
        router.push("/blogs");
        break;
      case "bookings":
        router.push("/bookings");
        break;
      case "contact":
        router.push("/contact");
        break;
      case "gallery":
        router.push("/gallery");
        break;
      case "services":
        router.push("/services");
        break;
      case "about":
        router.push("/about");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/":
        setactiveitem("home");
        break;
      case "/bookings":
        setactiveitem("bookings");
        break;
      case "/blogs":
        setactiveitem("blogs");
        break;
      case "/contact":
        setactiveitem("contact");
        break;
      case "/about":
        setactiveitem("about");
        break;
      case "/gallery":
        setactiveitem("gallery");
        break;
      case "/services":
        setactiveitem("services");
        break;
      default:
        setactiveitem("");
    }
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -140 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white  sticky top-0 z-30 border-gray-200 border-b-2"
    >
      <div className="bg-[#F30278] w-[85%] ml-auto rounded-l-full text-white py-2 px-4 flex justify-evenly items-center text-sm relative overflow-hidden">
        <div className="flex items-center space-x-8 ml-6 relative z-10">
          <div className="flex items-center">
            <IoMail className="w-4 h-4 mr-2" />
            <span>info@theatrethrills.in</span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="w-4 h-4 mr-2" />
            <span>+91 8363802949</span>
          </div>
          <div className="flex items-center">
            <FaLocationDot className="w-4 h-4 mr-2" />
            <span>Hyderabad, India</span>
          </div>
        </div>
        <Divider className="h-6 w-0.5 bg-white" orientation="vertical" />
        <div>
          <p>@thetheatrethrills</p>
        </div>
        <div className="flex gap-4 items-center space-x-2 relative z-10">
          <Image src={Insta} alt="insta" className="w-6 h-6 object-contain" />
          <Image
            src={Facebook}
            alt="Facebook"
            className="w-6 h-6 object-contain"
          />
          <Image
            src={Youtube}
            alt="Youtube"
            className="w-6 h-6 object-contain"
          />
        </div>
      </div>
      <nav className="bg-white py-4 px-8 flex justify-between items-center ">
        <Link href="/" className="flex items-center space-x-2 ">
          <Image
            src={Logo}
            alt="Theatre Thrills Logo"
            className="h-24 w-24 top-0 left-12 absolute object-contain"
          />
        </Link>
        <div className="flex gap-3 items-center space-x-8">
          <Link href="/" className={activeitem === "home" ? active : unactive}>
            Home
          </Link>
          <Link
            href="/about"
            className={activeitem === "about" ? active : unactive}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className={activeitem === "services" ? active : unactive}
          >
            Our Services
          </Link>
          {/* <Link
            href="/bookings"
            className={activeitem === "bookings" ? active : unactive}
          >
            My Bookings
          </Link> */}
          <Link
            href="/gallery"
            className={activeitem === "gallery" ? active : unactive}
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className={activeitem === "contact" ? active : unactive}
          >
            Contact Us
          </Link>
          <Link
            href="/blogs"
            className={activeitem === "blogs" ? active : unactive}
          >
            Blogs
          </Link>

          <Button
            onClick={() => router.push("/booknow")}
            className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            Book Now
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarFold strokeWidth={1.5} /> 
                  <span>My Booking</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LayoutDashboard strokeWidth={1.5} />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </motion.header>
  );
}
