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
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Slidingoffer from "../Homecomponents/Slidingoffer";
import { openLoginModal } from "@/lib/Redux/authSlice";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const active = " font-medium text-[#F30278]";
  const unactive = " text-gray-800 font-medium hover:text-[#F30278]";
  const [activeitem, setactiveitem] = useState();
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isdelete, Setisdelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [isAuthenticated]);

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

  const handleLogout = () => {
    Cookies.remove("token"); // Clear token from cookies
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleLoginClick = () => {
    dispatch(openLoginModal());
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -180 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white  sticky top-0 z-30"
      >
        <div className="bg-[#F30278]  w-[85%] ml-auto rounded-l-full text-white py-2 px-4 flex justify-evenly items-center text-sm relative overflow-hidden">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="absolute right-4 p-1 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@THEATERTHRILLS"
                  className=" rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {isLoggedIn ? (
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <Link href={"/bookings"}>
                  <DropdownMenuItem>
                    <CalendarFold />
                    <span>My Bookings</span>
                  </DropdownMenuItem>

                  </Link>
                  <Link href={"/dashboard"}>
                  <DropdownMenuItem>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => Setisdelete(true)}>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent>
                {" "}
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleLoginClick}>
                    <User />
                    <span>Log in</span>
                  </DropdownMenuItem>
                  </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
        <nav className="bg-white py-4 px-4 flex justify-between items-center ">
          <Link href="/" className="flex items-center space-x-2 ">
            <Image
              src={Logo}
              alt="Theatre Thrills Logo"
              className="h-24 w-24 top-0 left-12 absolute object-contain"
            />
          </Link>
          <div className="flex gap-1 items-center space-x-8">
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
              href="/contact"
              className={activeitem === "contact" ? active : unactive}
            >
              Contact Us
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

            <Button
              onClick={() => router.push("/booknow")}
              className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Book Now
            </Button>
          </div>
        </nav>
        <Slidingoffer />
      </motion.header>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isdelete}
        onOpenChange={Setisdelete}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Logout
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  onPress={() => {
                    handleLogout();
                    onClose();
                  }}
                  className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#F30278] bg-[#F30278] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#004AAD,1px_1px_#004AAD,1px_1px_#004AAD,2px_2px_#004AAD,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                >
                  Yes
                </Button>
                <Button
                  size="md"
                  onPress={() => Setisdelete(false)}
                  className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                >
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
