import React from 'react'
import Aboutus from "@/public/asset/Aboutus.png"
import Image from 'next/image'
import Eventpromo from '@/components/Aboutcomponents/Eventpromo'
import BranchInfo from '@/components/Aboutcomponents/Locationcard'

const page = () => {
  return (
   <main className='pb-20 md:pb-12' >
    <div className=' justify-center items-center w-full relative'>
    <Image src={Aboutus} alt='about us' className=' brightness-50'/>
     <p className='absolute md:text-3xl text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>About us</p>
    </div>
    <Eventpromo/>
    <BranchInfo/>
   </main>
  )
}

export default page