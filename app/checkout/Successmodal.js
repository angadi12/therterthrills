'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from 'lottie-react'
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

export default function Component({ orderId = "ORD123456" }) {
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
    isKeyboardDismissDisabled={true}

    isOpen={isOpensucess}
    onOpenChange={setIsOpensucess}
     >
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <p className="text-center text-2xl font-bold text-green-600">Payment Successful!</p>
        </ModalHeader>
        <ModalBody>

        <div className="flex justify-center py-4">
        <Lottie options={defaultOptions} height={200} width={200} />
        </div>
        <div className="text-center">
          Your payment has been processed successfully. <br />
          Order ID: <span className="font-semibold">{orderId}</span>
        </div>
        </ModalBody>
        <ModalFooter className="sm:justify-center">
          <Button onClick={handleRedirect} className="w-full sm:w-auto">
            Go to My Bookings
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}