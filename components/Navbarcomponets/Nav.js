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
  useScroll,
} from "framer-motion";
import { Button } from "@nextui-org/react";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Slidingoffer from "../Homecomponents/Slidingoffer";
import { openLoginModal } from "@/lib/Redux/authSlice";
import Mobilenav from "./Mobilenav";
import Usercomponet from "./User";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const active = " font-medium text-[#F30278]";
  const unactive = " text-gray-800 font-medium hover:text-[#F30278]";
  const [activeitem, setactiveitem] = useState();
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    switch (pathname) {
      case "/":
        setactiveitem("home");
        break;
      case "/bookings":
        setactiveitem("bookings");
        break;
      case "/Add-Ons":
        setactiveitem("Add-Ons");
        break;
      case "/blogs":
        setactiveitem("blogs");
        break;
      case "/contact":
        setactiveitem("contact");
        break;
      case "/refund-policy":
        setactiveitem("refund-policy");
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
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -180 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white  sticky top-0 z-30"
      >
        <div className="bg-[#F30278] hidden  w-[85%] ml-auto rounded-l-full text-white py-2 px-4 md:flex justify-evenly items-center text-sm relative overflow-hidden">
          <div className="flex items-center space-x-8 ml-6 relative z-10">
            <div className="flex items-center">
              <IoMail className="w-4 h-4 mr-2" />
              <span>info@theatrethrills.in</span>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="w-4 h-4 mr-2" />
              <span>+91 9398617123</span>
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
          <Link href={"https://www.instagram.com/thetheatrethrills/?igsh=aTB2a25hYzQxNWpp"}>
            <Image src={Insta} alt="insta" className="w-6 h-6 object-contain" />

          </Link>
           <Link href={"https://www.facebook.com/people/The-Theatre-Thrills/61570456632986/?mibextid=ZbWKwL"}>

            <Image
              src={Facebook}
              alt="Facebook"
              className="w-6 h-6 object-contain"
            />
           </Link>
            <Image
              src={Youtube}
              alt="Youtube"
              className="w-6 h-6 object-contain"
            />
          </div>
          <Usercomponet/>
        </div>
        <nav className="bg-white h-12 md:h-auto border-b  py-4 md:px-4 px-2 flex justify-between items-center ">
          <Link href="/" className="flex items-center space-x-2 ">
            <Image
              src={Logo}
              alt="Theatre Thrills Logo"
              className="md:h-24 md:w-24 top-0 md:left-12 h-10 w-10 md:absolute static object-contain"
            />
          </Link>
          <div className="md:flex  hidden gap-1 items-center space-x-8">
            <Link
              href="/"
              className={activeitem === "home" ? active : unactive}
            >
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
            <Link
              href="/Add-Ons"
              className={activeitem === "Add-Ons" ? active : unactive}
            >
              Add-Ons
            </Link>
            <Link
              href="/gallery"
              className={activeitem === "gallery" ? active : unactive}
            >
              Gallery
            </Link>
           
            <Link
              href="/refund-policy"
              className={activeitem === "refund-policy" ? active : unactive}
            >
              Refund Policy
            </Link>
            <Link
              href="/blogs"
              className={activeitem === "blogs" ? active : unactive}
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className={activeitem === "contact" ? active : unactive}
            >
              Contact Us
            </Link>

            <Button
              onClick={() => router.push("/choosebranch")}
              className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Book Now
            </Button>
          </div>
          <Mobilenav />
        </nav>
        <Slidingoffer />
      </motion.header>
    </>
  );
}
