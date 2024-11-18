'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from "react-lottie";
import { Button } from "@nextui-org/react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";
// You'll need to replace this with your actual Lottie animation data
import successAnimation from '@/lib/successAnimation.json'

export default function Successmodal() {
  const [isOpensucess, setIsOpensucess] = useState(true)
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/bookings')
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal
    hideCloseButton={true}
    isDismissable={false}
    size='2xl'
    isKeyboardDismissDisabled={true}
    backdrop='opaque'
    isOpen={isOpensucess}
    onOpenChange={setIsOpensucess}
     >
      <ModalContent className="w-full flex justify-center items-center">
        <ModalHeader>
          <p className="text-center text-2xl font-bold text-green-600">Payment Successful!</p>
        </ModalHeader>
        <ModalBody>

        <div className="flex justify-center">
        <Lottie options={defaultOptions} height={150} width={150} />
        </div>
        <div className="text-center">
          Your payment has been processed successfully.
        </div>
        </ModalBody>
        <ModalFooter className="sm:justify-center">
          <Button onClick={handleRedirect}
              className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
              >
            Go to My Bookings
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}