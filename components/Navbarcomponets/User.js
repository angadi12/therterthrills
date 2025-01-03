"use client";
import React, { useState } from "react";
import { LayoutDashboard, CalendarFold, LogOut, User } from "lucide-react";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
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
import { useRouter } from "next/navigation";
import { clearUser, openLoginModal } from "@/lib/Redux/authSlice";

const UserComponent = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth) || {}; 
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openLoginModal());
  };

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("token");
    Cookies.remove("User");
    router.push("/");
  };



  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar
            className="absolute right-4 p-1 rounded-full"
            size="sm"
            classNames={{
              base: "bg-[#004AAD]",
              icon: "text-white",
            }}
            icon={<AvatarIcon size={15} />}
          />
        </DropdownMenuTrigger>
        {user && Object.keys(user).length > 0 ? ( 
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/bookings"}>
                <DropdownMenuItem>
                  <CalendarFold />
                  <span>My Bookings</span>
                </DropdownMenuItem>
              </Link>
              {(user?.role === "admin" || user?.role === "superadmin") && (
                <Link href="/dashboard">
                  <DropdownMenuItem>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDelete(true)}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
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
        isOpen={isDelete}
        onOpenChange={setIsDelete}
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
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#F30278] text-white"
                >
                  Yes
                </Button>
                <Button
                  size="md"
                  onPress={() => setIsDelete(false)}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#004AAD] text-white"
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
};

export default UserComponent;
