import React from 'react'
import Aboutus from "@/public/asset/Aboutus.png"
import Image from 'next/image'
import Eventpromo from '@/components/Aboutcomponents/Eventpromo'
import BranchInfo from '@/components/Aboutcomponents/Locationcard'

const page = () => {
  return (
   <main >
    <div className=' justify-center items-center w-full '>
    <Image src={Aboutus} alt='about us' className='relative brightness-50'/>
     <p className='absolute text-2xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>About us</p>
    </div>
    <Eventpromo/>
    <BranchInfo/>
   </main>
  )
}

export default page