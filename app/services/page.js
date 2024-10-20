import React from 'react'
import Service from "@/public/asset/Service.png"
import EventServices from '@/components/Servicecomponets/Eventservice'
import Image from 'next/image'

const page = () => {
  return (
    <main >
    <div className=' justify-center items-center w-full '>
    <Image src={Service} alt='about us' className='relative brightness-50'/>
     <p className='absolute text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Our Services</p>
    </div>
    <EventServices/>
   </main>
  )
}

export default page