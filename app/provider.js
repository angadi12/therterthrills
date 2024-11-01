"use client";
import { NextUIProvider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Loading from "./loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/lib/firebaseConfig";

export function NextuiProviderWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isOpen: showLoginModal, onOpen: openLoginModal, onOpenChange: setShowLoginModal } = useDisclosure();
  const { isOpen: showOtpModal, onOpen: openOtpModal, onOpenChange: setShowOtpModal } = useDisclosure();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpRequestCooldown, setOtpRequestCooldown] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null); // Make sure this is defined
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      openLoginModal();
    }
  }, []);

 

  const setupRecaptcha = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => handleSendOtp(),
        "expired-callback": () => {
          console.warn("reCAPTCHA expired; reset reCAPTCHA verifier.");
          setupRecaptcha();
        },
      });
    }
  };

  const handleSendOtp = async () => {
    if (otpRequestCooldown) return;
    setupRecaptcha();
    const fullPhoneNumber = `+91${phoneNumber}`;

    try {
      const result = await signInWithPhoneNumber(auth, fullPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      setShowLoginModal(false);
      openOtpModal();
      setTimeout(() => setOtpRequestCooldown(false), 60000);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpRequestCooldown(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6 && confirmationResult) {
      try {
        const result = await confirmationResult.confirm(otpString);
        const idToken = await result.user.getIdToken();
        Cookies.set("token", idToken);
        setIsAuthenticated(true);
        setShowOtpModal(false);
      } catch (error) {
        console.error("Invalid OTP:", error);
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  if (loading) {
    return <Loading />;
  }

  return (
    <NextUIProvider>
      {children}
      <div id="recaptcha-container"></div>
      {/* Login Modal */}
      <Modal isDismissable={false} isKeyboardDismissDisabled={true} backdrop="opaque" isOpen={showLoginModal} onOpenChange={setShowLoginModal}>
        <ModalContent className="flex justify-center items-center w-full gap-4">
          <ModalHeader className="text-2xl text-center">Sign Up/Log In</ModalHeader>
          <ModalBody className="flex justify-center items-center w-full gap-8">
            <p className="text-center text-muted-foreground">Enter your mobile number. We will send you an OTP!</p>
            <div className="flex gap-4 w-full">
              <Input label="Code" value="+91" disabled className="w-20 bg-[#F30278] text-white" />
              <Input label="Mobile Number" placeholder="Enter your mobile number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <Button onPress={handleSendOtp}
            className="px-8 py-0.5 rounded-sm w-48  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >Send OTP</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* OTP Modal */}
      <Modal isDismissable={false} isKeyboardDismissDisabled={true} backdrop="opaque" isOpen={showOtpModal} onOpenChange={setShowOtpModal}>
        <ModalContent>
          <ModalHeader className="text-2xl text-center">Enter your OTP!</ModalHeader>
          <ModalBody>
            <p className="text-center text-sm text-muted-foreground">
              Code sent to (+91-{phoneNumber}) - <Button variant="link" className="text-pink-600" onPress={openLoginModal}>Edit Number</Button>
            </p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  className="w-12 h-12 text-center text-lg"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  maxLength={1}
                />
              ))}
            </div>
            <Button onPress={handleVerifyOtp} className="w-full bg-[#004AAD] text-white">Verify</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </NextUIProvider>
  );
}
