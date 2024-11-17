import React from 'react'
import Addonimage from "@/public/asset/Addons.png"
import Image from 'next/image'
import AddOnss from '@/components/Addonscomponents/Addons'

const Addonspage = () => {
  return (
    <main className='pb-20 md:pb-0' >
    <div className='relative justify-center items-center w-full '>
    <Image src={Addonimage} alt='about us' className='relative brightness-50'/>
     <p className='absolute md:text-3xl text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Add - Ons</p>
    </div>
    <AddOnss/>
   </main>
  )
}

export default Addonspage