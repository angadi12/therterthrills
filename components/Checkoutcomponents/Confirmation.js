import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, Tv, Cake } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector, useDispatch } from "react-redux";
import { selectAddOns } from "@/lib/Redux/addOnsSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setAgreed, setCurrentStep } from "@/lib/Redux/checkoutSlice";
import { format } from "date-fns";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { setSelectedTheater } from "@/lib/Redux/theaterSlice";
import { Setselectedproccedbranchid } from "@/lib/Redux/bookingSlice";

const Confirmation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const addOns = useSelector(selectAddOns);
  const selectedCakes = useSelector((state) => state.cakes.selectedCakes);
  const agreed = useSelector((state) => state.checkout.agreed);
  const { theater, selectedslotsid, date } = useSelector(
    (state) => state.theater
  );
  const { bookingDetails, selectedOccasion } = useSelector(
    (state) => state.checkout
  );

  const formattedDate =
    date && !isNaN(new Date(date))
      ? format(new Date(date), "yyyy-MM-dd")
      : null;

  const selectedSlot = theater?.slots?.find(
    (slot) => slot._id === selectedslotsid
  );




  useEffect(() => {
    if (bookingDetails?.numberOfPeople===0) {
      onOpen();
    }
  }, []);
 


  const cleardata =()=>{
     dispatch(setSelectedTheater(""))
     dispatch(Setselectedproccedbranchid(""))
     dispatch(setCurrentStep(0))
     router.push("/")
  }


  return (
    <>
    <div className="md:col-span-2">
      <div className="bg-[#2076E80D] p-6 rounded-md ring-1 ring-[#004AAD] shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center">
              <Tv className="w-5 h-5 mr-2 text-[#004AAD]" />
              <span className="text-[#004AAD]">{theater?.name}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#004AAD]" />
              <span className="text-[#004AAD]">
              {bookingDetails?.numberOfPeople}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[#004AAD]" />
              <span className="text-[#004AAD]">{theater?.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-[#004AAD]">{formattedDate}</span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center col-span-2">
              <Cake className="w-5 h-5 mr-2 text-[#004AAD]" />
              <span className="text-[#004AAD]">{selectedOccasion}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Clock className="w-5 h-5 mr-2 text-[#004AAD]" />
              <span className="text-[#004AAD]">
                {selectedSlot
                  ? `${selectedSlot.startTime} - ${selectedSlot.endTime}`
                  : "Slot not selected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2076E80D] p-6 rounded-md ring-1 ring-[#004AAD] shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add-Ons</h2>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 w-full text-[#004AAD]">
          <div>
            <h3 className="font-semibold">Decorations</h3>
            {Object.values(addOns?.decorations).length > 0 ? Object.entries(addOns?.decorations).map(([name, count]) => (
              <p key={name} className="text-sm">
                {name} x {count}
              </p>
            )):<p className="text-sm">
            No addOns
            </p>}
          </div>
          <div>
            <h3 className="font-semibold">Roses</h3>
            {Object.values(addOns?.roses).length > 0 ? Object.entries(addOns?.roses).map(([name, count]) => (
              <p className="text-sm" key={name}>
                {name} x {count}
              </p>
            )):<p className="text-sm">No Roses</p>}
          </div>
          <div>
            <h3 className="font-semibold">Photography</h3>
            {addOns.photography.length > 0 ? (
              addOns.photography.map((item) => (
                <p className="text-sm" key={item}>
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm">No photography selected</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold">Cakes</h3>
            {Object.values(selectedCakes).length > 0 ? (
              Object.values(selectedCakes).map(({ id, name, quantity }) => (
                <div key={id}>
                  <p className="text-sm">
                    {name} x {quantity}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm">No cakes selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white ring-1 ring-gray-300 p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Refund Policy :</p>
          <p>{`Partial advance amount (Rs 500/-) will be refundable if you cancel the slot atleast 72 hours prior to your booking time.`}</p>
        </div>
        <ol className="list-decimal list-inside space-y-2">
          <li>{`Smoking and Consumption of Alcohol is strictly prohibited inside the Theaters.`}</li>
          <li>{`You need to bring your own OTT accounts to watch the content.`}</li>
          <li>{`Party poppers, foam and Champaigne is not allowed inside the theaters, considering the sensitivity of the Theaters.`}</li>
          <li>{`Outside food is strictly prohibited, considering the sensitivity of carpets and recliners inside the Theaters.`}</li>
          <li>{`We charge full for children above or equal to 5 years and half for those who are below 5 years`}</li>
          <li>{`Right to admission is reserved by the Management.`}</li>
        </ol>
        <div className="mt-4 flex items-center">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => dispatch(setAgreed(checked))}
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to all the above conditions.
          </label>
        </div>
        {/* <div className="flex justify-center items-center w-full">
          <Button
            className="px-8 mt-6 py-0.5 w-60 mx-auto rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </Button>
        </div> */}
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
          <ModalHeader className="flex flex-col gap-1 text-center">
            Capacity not selected
          </ModalHeader>
          <ModalBody>
            <p className="text-sm ">
              Please select Capacity of the peaople before proceeding
            </p>
          </ModalBody>
          <ModalFooter className="flex justify-center items-center">
            <Button
              onPress={cleardata}
              className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Go to Book Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Confirmation;
