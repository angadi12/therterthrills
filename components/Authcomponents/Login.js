"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Cookies from "js-cookie";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/lib/firebaseConfig";
import { Toaster } from "@/components/ui/toaster";
import {
  openOtpModal,
  closeOtpModal,
  openLoginModal,
  closeLoginModal,
  setIsAuthenticated
} from "@/lib/Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useRouter,usePathname } from 'next/navigation';
import {Sendotp,Verifyotp,Createuser} from "@/lib/API/Auth"


const Login = ({ redirectTo }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const path=usePathname()


  const [loginMethod, setLoginMethod] = useState("phone"); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false); // Loading state for sending OTP
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false); // Loading state for verifying OTP
  const { isLoginModalOpen, isOtpModalOpen } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(closeLoginModal());
    } else {
      dispatch(openLoginModal());
    }
  }, []);

  const setupRecaptcha = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => handleSendOtp(),
        }
      );
    }
  };

  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    if (loginMethod === "phone") {
      if (phoneNumber.length !== 10) {
        setIsSendingOtp(false);
        return toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid phone number.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }

      setupRecaptcha();
      const fullPhoneNumber = `+91${phoneNumber}`;
      try {
        const result = await signInWithPhoneNumber(
          auth,
          fullPhoneNumber,
          window.recaptchaVerifier
        );
        setConfirmationResult(result);
        toast({
            title: "OTP Has been sent to your number",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        dispatch(closeLoginModal());
        dispatch(openOtpModal());
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to send OTP",
          description: error.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } else if (loginMethod === "email") {
      if (!email.includes("@")) {
        setIsSendingOtp(false);
        return toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }

      try {
        const response = await Sendotp({ email });
        if (response.status) {
          setIsSendingOtp(false);
          dispatch(closeLoginModal());
          dispatch(openOtpModal());
          toast({
            title: "Email Sent",
            description: `An OTP has been sent to ${email}`,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        } else {
          toast({
            title: "Failed to send email OTP",
            description: response?.message,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to send email OTP",
          description: error.response?.message || error.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    }
    setIsSendingOtp(false);
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    const otpString = otp.join("");
    if (otpString.length === 6) {
      if (loginMethod === "phone" && confirmationResult) {
        try {
          const result = await confirmationResult.confirm(otpString);
          const idToken = await result.user.getIdToken();
          // Cookies.set("token", idToken);
          const userData = {
            uid: result.user.uid,
            phoneNumber: result.user.phoneNumber,
            authType: "firebase",
          };
  
          // Call Createuser endpoint
          const response = await Createuser(userData);
          if (response.status==="success") {
            Cookies.set("token", idToken);
            toast({
              title: "Login successfully",
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
            dispatch(closeOtpModal());
            dispatch(setIsAuthenticated());
            router.push(path);
          } else {
            toast({
              title: "Login failed",
              description: response.message,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
          }
        } catch (error) {
          console.error("Invalid OTP:", error);
          toast({
            title: "Failed to verify OTP",
            description: error.message,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } else if (loginMethod === "email") {
        try {
          const otpString = otp.join(""); 
          const response = await Verifyotp({ email, otp:otpString });
          if (response.status) {
            const userData = {
              email,
              authType: "emailOtp",
            };
  
            // Call Createuser endpoint
            const createUserResponse = await Createuser(userData);
  
            if (createUserResponse.status==="success") {
              Cookies.set("token", response.token);
              toast({
                title: "Login successfully",
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
              });
            dispatch(closeOtpModal());
            dispatch(setIsAuthenticated());
            router.push(path) 
          } else {
            toast({
              title: "Login failed",
              description: createUserResponse.message,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
          }        
           } else {
            toast({
              title: "Failed to verify OTP",
              description: response.message,
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
          }
          // Cookies.set("token", response.data.token);
          // dispatch(closeOtpModal());
          // router.push(redirectTo)
        } catch (error) {
          console.error("Invalid OTP:", error);
          toast({
            title: "Failed to verify OTP",
            description: error.response?.message || error.message,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      }
    }
    setIsVerifyingOtp(false);
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

  return (
    <>
      <Toaster />
      <div id="recaptcha-container"></div>

      {/* Login Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isLoginModalOpen}
        onOpenChange={() => dispatch(closeLoginModal())}
      >
        <ModalContent className="flex justify-center items-center w-full gap-4">
          <ModalHeader className="text-2xl text-center">
            Sign Up/Log In
          </ModalHeader>
          <ModalBody className="flex justify-center items-center w-full gap-8">
            <p className="text-center text-muted-foreground">
              Select Login Method. We will send you an OTP!
            </p>
            <div className="flex items-center gap-4">
              <Button
                isIconOnly
                className="text-[#004AAD] ring-1 ring-[#F30278] bg-white"
                isDisabled={loginMethod === "phone"}
                onPress={() => setLoginMethod("phone")}
              >
                <FaPhoneAlt size={24} />
              </Button>
              <Divider className="h-6 " orientation="vertical" />
              <Button
                className="text-[#004AAD] ring-1 ring-[#F30278] bg-white"
                isIconOnly
                isDisabled={loginMethod === "email"}
                onPress={() => setLoginMethod("email")}
              >
                <MdEmail size={24}/>
              </Button>
            </div>
            <div className="flex gap-4 w-full">
              {loginMethod === "phone" && (
                <div className="flex items-center gap-2 w-full">
                  {" "}
                  <FaPhoneAlt size={30} className="text-[#F30278]"/>

                  <Input
                    type="number"
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              )}

              {loginMethod === "email" && (
                <div className="flex items-center gap-2 w-full">
                <MdEmail size={40} className="text-[#F30278]"/>
                <Input
                type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                </div>
              )}
            </div>
            <Button
              isLoading={isSendingOtp}
              onPress={handleSendOtp}
              className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              >
              {isSendingOtp ? "Sending..." : "Send OTP"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* OTP Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isOtpModalOpen}
        onOpenChange={() => dispatch(closeOtpModal())}
      >
        <ModalContent>
          <ModalHeader className="text-2xl text-center">
            Enter your OTP!
          </ModalHeader>
          <ModalBody>
            <p className="text-center text-sm text-muted-foreground">
              Code sent to (+91-{phoneNumber})
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
            <Button
              isLoading={isVerifyingOtp}
              onPress={handleVerifyOtp}
              className="px-8 py-0.5 rounded-sm w-full  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              >
              {isVerifyingOtp ? "Verifying..." : "Verify"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
