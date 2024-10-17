import React from 'react'
import mainblogs from "@/public/asset/mainblogs.png"
import Image from 'next/image'

const page = () => {
  return (
    <main >
    <div className=' justify-center items-center w-full '>
    <Image src={mainblogs} alt='about us' className='relative brightness-50'/>
     <p className='absolute text-2xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Our Daily Blogs</p>
    </div>
   </main>
  )
}

export default page