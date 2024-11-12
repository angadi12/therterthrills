"use client";
import Arrowleft from "../../public/asset/Arrowleft.png";
import Insta from "../../public/asset/Insta.png";
import Facebook from "../../public/asset/Facebook.png";
import Youtube from "../../public/asset/Youtube.png";
import Image from "next/image";
import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router=useRouter()
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      // toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/Newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();

      if (result.error) {
        //   toast.error(result.message);
      } else {
        //   toast.success("Subscription successful!");
        setEmail("");
      }
    } catch (error) {
      // toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bggradient text-white  pt-4 ">
      <div className="w-11/12 mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Theatre Thrills
            </h2>
            <p className="text-sm leading-6">{`At The Theatre Thrills, we provide private theatre spaces for a personalized entertainment experience. Whether you're hosting a movie time, birthday, or party, we make it unforgettable with our state of the art theatres and event customization.`}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm">
              <li onClick={()=>router.push("/")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                Home
              </li>
              <li onClick={()=>router.push("/about")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                About Us
              </li>
              <li onClick={()=>router.push("/bookings")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                My Bookings
              </li>
              <li onClick={()=>router.push("/Add-Ons")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
               Add-ons
              </li>
              <li onClick={()=>router.push("/contact")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                Contact Us
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
             Legal
            </h3>
            <ul className="space-y-4 text-sm">
              <li onClick={()=>router.push("/refund-policy")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                Refund Policy              </li>
              <li onClick={()=>router.push("/terms-and-conditions")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                Terms & Condition
              </li>
              <li onClick={()=>router.push("/privacy-policy")} className="flex items-center gap-2 cursor-pointer">
                <Image src={Arrowleft} alt="arrow" className="object-contain" />
                Privacy Policy
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Get Started
            </h3>
            <div className="flex justify-start items-start gap-4 flex-col">
              <p className="text-redtheme  text-xs">
                {`Let’s make your event the best!`}
              </p>
              <Button onPress={()=>router.push("/booknow")} className="px-8 py-0.5 rounded-sm w-60  border-none hover:bg-[#F30278] bg-[#F30278] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#FFCCE5,1px_1px_#FFCCE5,1px_1px_#FFCCE5,2px_2px_#FFCCE5,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F30278] py-2 w-full text-white flex justify-between px-6 items-center  text-sm text-center">
        <div className="flex items-center gap-2">
          <Image
            src={Insta}
            alt="Instagram"
            className="h-6 w-6 object-contain"
          />
          <Image
            src={Facebook}
            alt="Instagram"
            className="h-6 w-6 object-contain"
          />
          <Image
            src={Youtube}
            alt="Instagram"
            className="h-6 w-6 object-contain"
          />
        </div>
        <p>
          &copy;Copyrights {new Date().getFullYear()} .The Theatre Thrills . All
          rights reserved.
        </p>
        <div>
          {/* <Button size="sm" className="ring-1 ring-white text-white bg-transparent rounded-md">
          ENG
          </Button> */}
        </div>
      </div>
    </footer>
  );
}
