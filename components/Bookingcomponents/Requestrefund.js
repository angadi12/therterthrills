"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { AlertCircle,CheckCircle2 ,Hourglass} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

import { Requestforcancellation } from "@/lib/API/Booking";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { fetchBookingByBranchId, fetchBookingByUserId } from "@/lib/Redux/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { fetchRefundDetails } from "@/lib/Redux/RefundSlice";
import { setSelectedpaymentid } from "@/lib/Redux/paymentSlice";
import { Copy } from "lucide-react";
import { setDateRange, selectDateRange } from "@/lib/Redux/BookingdateSlice";

export default function RefundRequestModal({ booking }) {
  const [isOpen, onOpenChange] = useState(false);
  const [ismodalOpen, Setmodalopen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const Selectedpaymentid = useSelector(
    (state) => state.payments.Selectedpaymentid
  );
  const { refundDetails, loading, error } = useSelector(
    (state) => state.refunds
  );
 const { selectedBranchId } = useSelector((state) => state.branches);
  const { startDate: reduxStartDate, endDate: reduxEndDate } =
    useSelector(selectDateRange);
  useEffect(() => {
    if (Selectedpaymentid) {
      dispatch(fetchRefundDetails(Selectedpaymentid));
    }
  }, [dispatch, Selectedpaymentid]);


  

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);
  
  //   try {
  //     const response = await Requestforcancellation(booking?.bookingId, reason);
  //     console.log(response);
  //     if (response.status === "success") {
  //       toast({
  //         title: "Refund request submitted successfully.",
  //         description: "We'll process your request shortly.",
  //         action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //       });
  //       onOpenChange(false);
  //       dispatch(fetchBookingByUserId(user?._id));
  //        dispatch(
  //       fetchBookingByBranchId({
  //         BranchId: selectedBranchId,
  //         status: "cancelled",
  //         startDate: reduxStartDate,
  //         endDate: reduxEndDate,
  //       })
  //     );
  //       form.reset();
  //     } else {
  //       toast({
  //         title: response?.message || "Unexpected error",
  //         description: response?.message || "Something went wrong. Please try again.",
  //         action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error submitting refund request",
  //       description: "There was an error processing your request. Please try again.",
  //       action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  

  const handleSubmit = async () => {
    setIsSubmitting(true);
  
    try {
      // Make the request for cancellation
      const response = await Requestforcancellation(booking?.bookingId, reason);
  
      // Check if the request was successful
      if (response?.status === "success") {
        toast({
          title: "Refund request submitted successfully.",
          description: "We'll process your request shortly.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
  
        onOpenChange(false); // Close the modal or dialog
  
        // Dispatch actions to refresh bookings
        dispatch(fetchBookingByUserId(user?._id));
        dispatch(
          fetchBookingByBranchId({
            BranchId: selectedBranchId,
            status: "upcoming",
            startDate: reduxStartDate,
            endDate: reduxEndDate,
          })
        );
  
      } else {
        // Handle error response
        const errorMessage = response?.message || "Something went wrong. Please try again.";
        toast({
          title: errorMessage,
          description: errorMessage,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Error during refund request:", error);
  
      // Extract error message safely
      const errorMessage = error?.message || error?.toString() || "There was an error processing your request.";
      toast({
        title: "Error submitting refund request",
        description: errorMessage,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setIsSubmitting(false); // Ensure the button is re-enabled
    }
  };
  




  function StepItem({ title, description, status }) {
    return (
      <div className="flex items-start space-x-3">
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
            status === "complete"
              ? "border-reen-600  bg-green-600 text-primary-foreground"
              : "border-muted-foreground bg-yellow-600 text-primary-foreground border-yellow-500"
          )}
        >
          {status === "complete" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Hourglass className="h-4 w-4" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }

  function InfoRow({ label, value, copyable = false, className }) {
    return (
      <div className={cn("flex items-center justify-between py-2", className)}>
        <div className="flex items-center text-sm gap-1 text-muted-foreground">
          {label}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{value}</span>
          {copyable && (
            <Button
              variant="light"
              isIconOnly
              className="h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => navigator.clipboard.writeText(value)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  const statusMapping = {
    pending: {
      title: "Refund Initiated",
      description: "Refund request has been received and is being processed.",
      icon: "⏳",
      badgeColor: "bg-yellow-400",
    },
    processed: {
      title: "Refund processed",
      description:
        "Amount will be credited to customer’s bank account within 5-7 working days after the refund has processed.",
      icon: "✅",
      badgeColor: "bg-green-400",
    },
    failed: {
      title: "Refund Failed",
      description:
        "The refund could not be processed. Possible reasons include customer or bank-related issues.",
      icon: "❌",
      badgeColor: "bg-red-400",
    },
  };

  <StepItem
    title={statusMapping[refundDetails?.status]?.title}
    description={statusMapping[refundDetails?.status]?.description}
    status={statusMapping[refundDetails?.status]?.status}
  />;

  const refundSteps = [
    {
      status: "pending",
      title: "Refund Initiated",
      description: "Refund request has been received and is being processed.",
    },
    {
      status: "processing",
      title: "Refund Processing",
      description: "Takes 3-5 working days.",
    },
    {
      status: "processed",
      title: "Refund Completed",
      description:
        "Amount will be credited to customer’s bank account within 5-7 working days after the refund has processed.",
    },
  ];

  refundSteps.map((step) => (
    <StepItem
      key={step.status}
      title={step.title}
      description={step.description}
      status={refundDetails?.status === step.status ? "current" : "complete"}
    />
  ));

  const formatTimestamp = (timestamp) => {
    const timestampInSeconds = Number(timestamp);
    if (isNaN(timestampInSeconds)) {
      return "Invalid timestamp";
    }
    const date = new Date(timestampInSeconds * 1000);

    if (date.toString() === "Invalid Date") {
      return "Invalid date";
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    return formattedDate.toLowerCase();
  };

  return (
    <>
      {booking?.refundStatus !== "not_requested" ? (
        <>
          {booking?.refundStatus === "processed" ? (
            <Button
              onPress={() => {
                Setmodalopen(!ismodalOpen),
                  dispatch(setSelectedpaymentid(booking?.refundId));
              }}
              variant="solid"
              radius="sm"
              className="text-white rounded-sm"
              color="success"
            >
              Refund Details
            </Button>
          ) : (
            <Button
              variant="solid"
              radius="sm"
              className="text-white rounded-sm"
              color="danger"
            >
              Requested
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="solid"
          radius="sm"
          color="danger"
          className="px-8 py-0.5"
          onPress={() => onOpenChange(true)}
        >
          Cancel Booking
        </Button>
      )}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="p-4">
          {(onClose) => (
            <>
              <ModalHeader className="text-center w-full flex justify-center items-center flex-col gap-3 ">
                <p>Cancel Booking</p>
                <p className="text-xs md:text-sm font-medium text-gray-500">
                  Are you sure you want to cancel your booking? Please provide a
                  reason for the cancellation.
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2 ">
                  <Label htmlFor="reason">Cancellation Reason</Label>
                  {/* <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please explain why you're cancelling..."
                    required
                    minLength={10}
                    maxLength={500}
                  /> */}
                  <Textarea
                    isClearable
                    className="w-full"
                    color="danger"
                    label="Cancellation Reason"
                    placeholder="Please explain why you're cancelling..."
                    variant="bordered"
                    onValueChange={setReason}
                    value={reason}
                    // eslint-disable-next-line no-console
                    // onClear={() => console.log("textarea cleared")}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="grid grid-cols-2 justify-center items-center gap-2 w-full mt-auto">
                <Button
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!reason.trim()}
                  className="px-8 py-0.5 rounded-sm w-full   border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                >
                  Request Refund
                </Button>
                <Button
                  onPress={onClose}
                  variant="solid"
                  color="danger"
                  radius="sm"
                >
                  Close
                </Button>
                <div className="flex items-center space-x-2 text-sm text-yellow-600 w-full col-span-2 mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <p>Refunds are subject to our cancellation policy.</p>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="opaque"
        isOpen={ismodalOpen}
        size="3xl"
        onOpenChange={Setmodalopen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) =>
            loading ? (
              <ModalBody>
                {" "}
                <div className="flex justify-center items-center h-80">
                  <Spinner color="danger" />
                </div>
              </ModalBody>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold">
                        ₹{(refundDetails?.amount / 100).toFixed(2)}
                      </span>
                      <Badge
                        className={
                          statusMapping[refundDetails?.status]?.badgeColor
                        }
                      >
                        {refundDetails?.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Created on: {formatTimestamp(refundDetails?.created_at)}
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-6 p-4">
                    <div className="space-y-0 divide-y">
                      <InfoRow
                        label="Refund ID"
                        value={refundDetails?.id}
                        copyable
                      />
                      <InfoRow
                        label="ARN/RRN"
                        value={refundDetails?.acquirer_data.rrn}
                        copyable
                      />
                      <InfoRow
                        label="Amount"
                        value={(refundDetails?.amount / 100).toFixed(2)}
                      />
                      <InfoRow
                        label="Refund speed"
                        value={refundDetails?.speed_requested}
                      />
                      <InfoRow
                        label="Issued on"
                        value={formatTimestamp(refundDetails?.created_at)}
                      />
                      <InfoRow
                        label="Notes"
                        value={refundDetails?.notes?.reason}
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Refund Status</h4>
                      <div className="space-y-4">
                        {Object.entries(statusMapping).map(
                          ([key, { title, description, icon }]) => (
                            <div
                              key={key}
                              className={`flex items-start gap-3 ${
                                refundDetails?.status === key
                                  ? "text-black"
                                  : "hidden"
                              }`}
                            >
                              <span className="text-lg">{icon}</span>
                              <div>
                                <h5 className="font-medium">{title}</h5>
                                <p className="text-sm">{description}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
}
