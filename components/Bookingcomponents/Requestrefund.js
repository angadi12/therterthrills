"use client";

import { useCallback, useState } from "react";
import { Button } from "@nextui-org/react";
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
import { AlertCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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

export default function RefundRequestModal({ booking }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await Requestforcancellation(booking?.bookingId, reason);

      if (!response.status) {
        toast({
          title: response?.message,
          description: response?.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else {
        toast({
          title: "Refund request submitted successfully.",
          description: "We'll process your request shortly.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        onOpenChange()
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error submitting refund request",
        description:
          "There was an error processing your request. Please try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <>
     { booking?.refundStatus !=="not_requested" ?<Button variant="solid" radius="sm" color="danger" >Requested</Button>:<Button variant="solid" radius="sm" color="danger" onPress={onOpen}>
        Cancel Booking
      </Button>
}
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
                <div className="space-y-2">
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
                    onClear={() => console.log("textarea cleared")}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="grid grid-cols-2 justify-center items-center gap-2 w-full mt-auto">
                <Button
                  type="submit"
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
    </>
  );
}
