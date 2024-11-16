"use client";
import { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  setSelectedOccasion,
  toggleDecoration,
  setSelectedCake,
  setQuantity,
} from "@/lib/Redux/checkoutSlice";
import { setBookingField, setValidationError } from "@/lib/Redux/checkoutSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import BookingDetails from "@/components/Checkoutcomponents/BookingDetails ";
import Occasion from "@/components/Checkoutcomponents/Occasion ";
import Cakes from "@/components/Checkoutcomponents/Cakes";
import AddOns from "@/components/Checkoutcomponents/AddOns";
import Confirmation from "@/components/Checkoutcomponents/Confirmation";
import Cart from "@/components/Checkoutcomponents/Cart";
import { Createbooking, verifyPayment } from "@/lib/API/Booking";
import Cookies from "js-cookie";
import { selectAddOns } from "@/lib/Redux/addOnsSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";


const CheckoutOnboarding = () => {
  const router=useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const {
    currentStep,
    nickname,
    partnerNickname,
    selectedOccasion,
    Occasionobject,
    agreed,
  } = useSelector((state) => state.checkout);
  const { bookingDetails, validationErrors } = useSelector(
    (state) => state.checkout
  );
  const cakeText = useSelector((state) => state.cakes.cakeText);
  const isEggless = useSelector((state) => state.cakes.isEggless);

  const addDecorations = useSelector(
    (state) => state.checkout.bookingDetails.addDecorations
  );

  const selectedCakes = useSelector((state) => state.cakes.selectedCakes);
  const { selectedTheater, selectedslotsid ,date} = useSelector(
    (state) => state.theater
  );
  const { decorations, roses, photography } = useSelector(selectAddOns);

useEffect(() => {
  if(!selectedTheater & !selectedslotsid){
    onOpen()
  }
   
}, [])

const formattedDate =
    date && !isNaN(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

      console.log(formattedDate)

  const steps =
    addDecorations === "yes"
      ? [
          { component: <BookingDetails />, name: "Booking Details" },
          { component: <Occasion />, name: "Occasion" },
          { component: <Cakes />, name: "Cakes" },
          { component: <AddOns />, name: "Add-Ons" },
          { component: <Confirmation />, name: "Confirmation" },
        ]
      : [
          { component: <BookingDetails />, name: "Booking Details" },
          { component: <Confirmation />, name: "Confirmation" },
        ];

  // Render current step's component based on dynamic steps array
  const renderStepComponent = () => steps[currentStep]?.component;

  const handleProceed = () => {
    if (handleValidation()) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const validateFields = (bookingDetails) => {
    const errors = {};
    if (!bookingDetails.fullName) errors.fullName = "Full name is required.";
    if (!bookingDetails.numberOfPeople)
      errors.numberOfPeople = "Select number of people.";
    if (!bookingDetails.addDecorations)
      errors.addDecorations = "Do you want to add decorations to your event?";
    if (!bookingDetails.phoneNumber.match(/^\d{10}$/))
      errors.phoneNumber = "Phone number must be 10 digits.";
    if (!bookingDetails.whatsappNumber.match(/^\d{10}$/))
      errors.whatsappNumber = "WhatsApp number must be 10 digits.";
    if (!bookingDetails.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/))
      errors.email = "Email is invalid.";

    if (!Occasionobject?.noInput && currentStep === 1) {
      if (!nickname) {
        errors.nickname = "Nickname is required.";
      }

      if (Occasionobject?.requiresPartner) {
        if (!partnerNickname) {
          errors.partnerNickname = "Partner's nickname is required.";
        }
      }
    }

    if (currentStep === 2 && Object.keys(selectedCakes).length) {
      if (!cakeText) errors.cakeText = "Cake text is required.";
    }

    return errors;
  };

  const handleValidation = () => {
    const errors = validateFields(bookingDetails);

    Object.entries(errors).forEach(([field, error]) => {
      dispatch(setValidationError({ field, error }));

      // Show toast for each error
      toast({
        title: "All fields Are Required",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    });

    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = async () => {
    if (!agreed) {
      toast({
        title: "Accept All The Conditions",
        description: "Please agree to the conditions before proceeding.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      return;
    }

    const encodedUserData = Cookies.get("User");

    if (!encodedUserData) {
      return null;
    }
    const decodedUserData = decodeURIComponent(encodedUserData);
    const userData = JSON.parse(decodedUserData);
    console.log(userData)
    const bookingData = {
      fullName:bookingDetails.fullName,
      phoneNumber: bookingDetails.phoneNumber,
      whatsappNumber: bookingDetails.whatsappNumber,
      email: bookingDetails.email,
      numberOfPeople: bookingDetails.numberOfPeople,
      addDecorations: bookingDetails.addDecorations,
      nickname: nickname,
      partnerNickname: partnerNickname,
      Occasionobject: selectedOccasion,
      selectedCakes: selectedCakes,
      cakeText: cakeText,
      isEggless:isEggless,
      addOns: {
        decorations,
        roses,
        photography,
      },
      theaterId: selectedTheater,
      slotId: selectedslotsid,
      user:userData?._id,
      date:formattedDate,
      paymentAmount:750
    };

    try {
      const response = await Createbooking(bookingData);
      if (response?.success) {
        // toast({
        //   title: "Booking Successful",
        //   description: "Your booking has been created successfully.",
        //   action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        // });
        // Redirect or perform further actions after successful booking
        const bookingId = response.order?.receipt; // Extract bookingId
        console.log(bookingId)
        var razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
          amount: response.order?.amount, // Amount in paise (response from API)
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: response.order?.id, // Order ID from backend
          handler: async function (response) {
            try {
              const verifyResponse = await verifyPayment({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }, bookingId);
              if (verifyResponse.success) {
                toast({
                  title: "Payment Successful",
                  description: "Your payment has been verified.",
                  action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                });
                // router.push("/success"); // Redirect to success page
              } else {
                toast({
                  title: "Payment Failed",
                  description: "Verification failed.",
                  action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                });
              }
            } catch (error) {
              console.error("Verification Error:", error);
            }
          },
          prefill: {
            name: bookingDetails.fullName,
            email: bookingDetails.email,
            contact: bookingDetails.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const razorpay= new window.Razorpay(razorpayOptions)
        razorpay.open()

      } else {
        toast({
          title: "Booking Failed",
          description: response?.message || "An error occurred.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    }
  };
  return (
    <>
      <div className="w-11/12 mx-auto px-6 py-20">
        <div className="mb-8 flex justify-center items-center">
          <ol
            className={`flex items-center ${
              addDecorations === "no" ? "w-1/2" : " w-full"
            }`}
          >
            {steps.map((step, index) => (
              <li
                key={index}
                className={`flex items-center ${
                  index !== steps.length - 1 ? "w-full" : ""
                }`}
              >
                <div className="flex flex-col justify-center items-center gap-1">
                  <div
                    className={`flex items-center justify-center w-4 h-4 rounded-full ${
                      index <= currentStep ? "bg-[#004AAD]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-white" : "text-gray-500"
                      }`}
                    ></span>
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      index <= currentStep ? "text-[#004AAD]" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < currentStep ? "bg-[#004AAD]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderStepComponent()}

          <Cart />
        </div>

        <div className="flex items-center justify-center gap-12 mt-12 ">
          <Button
            disabled={currentStep === 0}
            onClick={handleBack}
            className="px-8 py-0.5 w-48 rounded-none  border-none bg-white border-black dark:border-white uppercase text-[#F30278] ring-1 ring-[#F30278] transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            Back
          </Button>
          {steps[currentStep].name === "Confirmation" ? (
            <Button
              onPress={handleProceedToPayment}
              className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Procced to payment
            </Button>
          ) : (
            <Button
              disabled={currentStep >= steps.length - 1}
              onClick={handleProceed}
              className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Proceed
            </Button>
          )}
        </div>
      </div>

      <Modal
      hideCloseButton={true}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">Theater not selected</ModalHeader>
          <ModalBody>
            <p className="text-sm ">Please select both a slot and a theater before proceeding</p>
          </ModalBody>
          <ModalFooter className="flex justify-center items-center">

            <Button onPress={()=>router.push("/booknow")} className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
              Go to Book Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckoutOnboarding;
