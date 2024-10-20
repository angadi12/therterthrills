import React from 'react'
import mainblogs from "@/public/asset/mainblogs.png"
import Image from 'next/image'
import Recentblogs from '@/components/Blogscomponents/Recentblogs'

const page = () => {
  return (
    <main >
    <div className='relative justify-center items-center w-full '>
    <Image src={mainblogs} alt='about us' className='relative brightness-50'/>
     <p className='absolute text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Our Daily Blogs</p>
    </div>
    <Recentblogs/>
   </main>
  )
}

export default page