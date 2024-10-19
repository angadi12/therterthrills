import React from 'react'
import Theaterbook from "@/public/asset/Theaterbook.png"
import Image from 'next/image'
import BookingHeader from '@/components/Bookingcomponents/Dateselection'
import TheatreCard from '@/components/Bookingcomponents/Theatercard'

const page = () => {
  return (
    <main >
    <div className='relative justify-center items-center w-full '>
    <Image src={Theaterbook} alt='Theatre Booking' className='relative brightness-50'/>
     <p className='absolute text-2xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Theatre Booking</p>
    </div>
    <BookingHeader/>
    <div className='w-11/12 mx-auto pb-20 grid grid-cols-3 gap-8 justify-center place-content-center items-stretch'>

    <TheatreCard/>
    </div>
    </main>
  )
}

export default page