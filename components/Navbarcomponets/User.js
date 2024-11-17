"use client"
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, CalendarFold, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";
  import Link from "next/link";
  import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';


const Usercomponet = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isdelete, Setisdelete] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
      }, [isAuthenticated]);

const encodedUserData = Cookies.get("User");

  if (!encodedUserData) {
    return null;
  }
  const decodedUserData = decodeURIComponent(encodedUserData);
  const userData = JSON.parse(decodedUserData);
  const { role } = userData;



    const handleLoginClick = () => {
        dispatch(openLoginModal());
      };   


      const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("User");
        setIsLoggedIn(false);
        router.push("/");
      };


  return (
    <>
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
          {/* <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem> */}
          <Link href={"/bookings"}>
            <DropdownMenuItem>
              <CalendarFold />
              <span>My Bookings</span>
            </DropdownMenuItem>
          </Link>
          {(role === "admin" || role === "superadmin") && (
            <Link href="/dashboard">
              <DropdownMenuItem>
                <LayoutDashboard />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
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
  )
}

export default Usercomponet