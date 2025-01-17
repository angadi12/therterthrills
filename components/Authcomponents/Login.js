"use client";
import React, { useEffect, useRef, useState } from "react";
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
  setIsAuthenticated,
  setUser,
} from "@/lib/Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { Sendotp, Verifyotp, Createuser,SendMobileOtp } from "@/lib/API/Auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();

  const [loginMethod, setLoginMethod] = useState("phone"); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const resendIntervalRef = useRef(null);
  const { isLoginModalOpen, isOtpModalOpen, user } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     dispatch(closeLoginModal());
  //   } else {
  //     dispatch(openLoginModal());
  //   }
  // }, []);

  const storeUserDetails = (token, user, dispatch, toast) => {
    Cookies.set("token", token);
    Cookies.set("User", JSON.stringify(user));
    dispatch(setUser(user));
    toast({
      title: "Login successfully",
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    });
  };

  const formatMobileNumber = (mobile) => {
    if (mobile.length === 12 && mobile.startsWith("91")) {
      // If the mobile number already has 12 digits and starts with "91", do nothing
      return mobile;
    } else if (mobile.length === 10) {
      // If the mobile number is 10 digits, add the "91" prefix
      return "91" + mobile;
    } else {
      throw new Error("Invalid mobile number length. It should be 10 digits or 12 digits with 91 prefix.");
    }
  };
  

  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    setResendTimer(60);
    if (loginMethod === "phone") {
      if (phoneNumber.length !== 10) {
        setIsSendingOtp(false);
        return toast({
          title: "Invalid Phone Number",
          description: "Enter a valid 10-digit phone number.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }

      try {
        const response = await SendMobileOtp({ mobile:formatMobileNumber(phoneNumber) });
        if (response.status) {
          toast({
            title: "OTP Sent",
            description: `OTP has been sent to ${formatMobileNumber(phoneNumber)}`,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
          dispatch(closeLoginModal());
          dispatch(openOtpModal());
        } else {
          toast({
            title: "OTP Failed",
            description: response?.message,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "OTP Failed",
          description: "Failed to send OTP. Please try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } else if (loginMethod === "email") {
      if (!email.includes("@")) {
        setIsSendingOtp(false);
        return toast({
          title: "Invalid Email",
          description: "Enter a valid email address.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }

      try {
        const response = await Sendotp({ email });
        if (response.status) {
          toast({
            title: "Email OTP Sent",
            description: `OTP has been sent to ${email}`,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
          dispatch(closeLoginModal());
          dispatch(openOtpModal());
        } else {
          toast({
            title: "Email OTP Failed",
            description: response?.message,
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Email OTP Error",
          description: error.response?.message || error.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    }
    setIsSendingOtp(false);
  };

  // const handleVerifyOtp = async () => {
  //   setIsVerifyingOtp(true);

  //   if (otp.length !== 6) {
  //     setIsVerifyingOtp(false);
  //     return toast({
  //       title: "Invalid OTP",
  //       description: "OTP should be 6 digits long.",
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //   }

  //   try {
  //     if (loginMethod === "phone" && confirmationResult) {
  //       const result = await confirmationResult.confirm(otp);
  //       const idToken = await result.user.getIdToken();

  //       const userData = {
  //         uid: result.user.uid,
  //         phoneNumber: result.user.phoneNumber,
  //         authType: "firebase",
  //       };

  //       const response = await Createuser(userData);
  //       if (response.status === "success") {
  //         storeUserDetails(idToken, response?.data?.user, dispatch, toast);
  //         dispatch(closeOtpModal());
  //         router.refresh(path);
  //         setOtp("");
  //       } else {
  //         throw new Error(response.message);
  //       }
  //     } else if (loginMethod === "email") {
  //       const response = await Verifyotp({ email, otp });
  //       if (response.status) {
  //         const createUserResponse = await Createuser({
  //           email,
  //           authType: "emailOtp",
  //         });

  //         if (createUserResponse.status === "success") {
  //           storeUserDetails(
  //             response.token,
  //             createUserResponse?.data?.user,
  //             dispatch,
  //             toast
  //           );
  //           dispatch(closeOtpModal());
  //           router.refresh(path);
  //           setOtp("");
  //         } else {
  //           throw new Error(createUserResponse.message);
  //           setOtp("");
  //         }
  //       } else {
  //         throw new Error(response.message);
  //         setOtp("");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during OTP verification:", error);
  //     toast({
  //       title: "OTP Verification Failed",
  //       description: error.response?.message || error.message,
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //   }

  //   setIsVerifyingOtp(false);
  // };


  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
  
    if (otp.length !== 6) {
      setIsVerifyingOtp(false);
      return toast({
        title: "Invalid OTP",
        description: "OTP should be 6 digits long.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  
    try {
      if (loginMethod === "phone") {
        // Mobile OTP verification flow
        const response = await Verifyotp({mobile:formatMobileNumber(phoneNumber), otp });
        if (response.status) {
          const createUserResponse = await Createuser({
            phoneNumber: formatMobileNumber(phoneNumber),
            authType: "mobileOtp",
            otp:otp
          });
  
          if (createUserResponse.status === "success") {
            storeUserDetails(
              response.token,
              createUserResponse?.data?.user,
              dispatch,
              toast
            );
            dispatch(closeOtpModal());
            router.refresh(path);
            setOtp("");
          } else {
            throw new Error(createUserResponse.message);
          }
        } else {
          throw new Error(response.message);
        }
      } else if (loginMethod === "email") {
        // Email OTP verification flow
        const response = await Verifyotp({ email, otp });
        if (response.status) {
          const createUserResponse = await Createuser({
            email,
            authType: "emailOtp",
          });
  
          if (createUserResponse.status === "success") {
            storeUserDetails(
              response.token,
              createUserResponse?.data?.user,
              dispatch,
              toast
            );
            dispatch(closeOtpModal());
            router.refresh(path);
            setOtp("");
          } else {
            throw new Error(createUserResponse.message);
          }
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast({
        title: "OTP Verification Failed",
        description: error.response?.message || error.message,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  
    setIsVerifyingOtp(false);
  };
  



  useEffect(() => {
    if (resendTimer > 0) {
      resendIntervalRef.current = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(resendIntervalRef.current);
    }

    return () => clearInterval(resendIntervalRef.current);
  }, [resendTimer]);

  const handleResendOtp = () => {
     setOtp("")
    if (resendTimer === 0) {
      setIsSendingOtp(true);
      handleSendOtp();
      setTimeout(() => {
        setIsSendingOtp(false);
        setResendTimer(60);
      }, 1000);
    }
  };

  const editLoginDetails = () => {
    dispatch(openLoginModal());
    dispatch(closeOtpModal());
  };

  useEffect(() => {
    // Check if the Web OTP API is supported
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp && otp.code) {
            setOtp(otp.code);
            onComplete(otp.code);
          }
        })
        .catch((err) => {
        });

      return () => ac.abort();
    }
  }, []);


useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
}, [otp])



  return (
    <div className="overflow-hidden">
      <div id="recaptcha-container"></div>

      {/* Login Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        className="overflow-hidden"
        isOpen={isLoginModalOpen}
        onOpenChange={() => dispatch(closeLoginModal())}
      >
        <ModalContent className="flex justify-center items-center w-full gap-4 overflow-hidden">
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
                className={`text-[#004AAD]  ${
                  loginMethod === "phone"
                    ? "ring-1 ring-[#F30278]"
                    : "ring-1 ring-[#004AAD]"
                } bg-white`}
                // isDisabled={loginMethod === "phone"}
                onPress={() => setLoginMethod("phone")}
              >
                <FaPhoneAlt size={24} />
              </Button>
              <Divider className="h-6 " orientation="vertical" />
              <Button
                className={`text-[#004AAD] ${
                  loginMethod === "email"
                    ? "ring-1 ring-[#F30278]"
                    : "ring-1 ring-[#004AAD]"
                } bg-white`}
                isIconOnly
                // isDisabled={loginMethod === "email"}
                onPress={() => setLoginMethod("email")}
              >
                <MdEmail size={24} />
              </Button>
            </div>
            <div className="flex gap-4 w-full">
              {loginMethod === "phone" && (
                <div className="flex items-center gap-2 w-full">
                  {" "}
                  <FaPhoneAlt size={30} className="text-[#F30278]" />
                  <Input
                    type="tel"
                    maxLength={10}
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              )}

              {loginMethod === "email" && (
                <div className="flex items-center gap-2 w-full">
                  <MdEmail size={40} className="text-[#F30278]" />
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
              Code sent to {loginMethod === "phone" ? phoneNumber: email}
            </p>
            <div className="flex justify-center gap-2">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                }}
              >
                <InputOTPGroup className="md:gap-4 gap-1">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex justify-between w-full items-center">
              <Button
                variant="light"
                className="bg-white text-[#F30278]"
                onPress={editLoginDetails}
              >
                Edit {loginMethod === "phone" ? "Number" : "Email"}
              </Button>
              <Button
                variant="light"
                className="bg-white text-[#004AAD]"
                isDisabled={resendTimer > 0}
                onPress={handleResendOtp}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </Button>
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
    </div>
  );
};

export default Login;
