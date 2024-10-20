import React from 'react'
import Theaterbook from "@/public/asset/Theaterbook.png"
import Image from 'next/image'
import BookingHeader from '@/components/Bookingcomponents/Dateselection'
import TheatreCard from '@/components/Bookingcomponents/Theatercard'
import Theaterimage from "@/public/asset/Theaterimage.png"

const page = () => {

  const theatres = [
    {
      name: "Bronze Theatre",
      price: 2372,
      rating: 5,
      reviews: 347,
      capacity: 4,
      alcoholPermitted: true,
      Theaterimage: Theaterimage,
      overview: [
        "The Customer Has To Pay 300/- Extra Per Person",
        "133 Inch 4k Screen & 1000W Dolby Atmos",
      ],
      slots: ["9:00 AM - 12:00 PM", "12:30 PM - 3:30 PM"],
    },
    {
      name: "Silver Theatre",
      price: 2372,
      rating: 5,
      reviews: 347,
      capacity: 4,
      alcoholPermitted: true,
      Theaterimage: Theaterimage,
      isBestSeller: true,
      overview: [
        "The Customer Has To Pay 300/- Extra Per Person",
        "133 Inch 4k Screen & 1000W Dolby Atmos",
      ],
      slots: ["9:00 AM - 12:00 PM", "12:30 PM - 3:30 PM"],
    },
    {
      name: "Gold Theatre",
      price: 2372,
      rating: 5,
      reviews: 347,
      capacity: 4,
      alcoholPermitted: true,
      Theaterimage: Theaterimage,
      overview: [
        "The Customer Has To Pay 300/- Extra Per Person",
        "133 Inch 4k Screen & 1000W Dolby Atmos",
      ],
      slots: ["9:00 AM - 12:00 PM", "12:30 PM - 3:30 PM"],
    },
  ]




  return (
    <main >
    <div className='relative justify-center items-center w-full '>
    <Image src={Theaterbook} alt='Theatre Booking' className='relative brightness-50'/>
     <p className='absolute text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Theatre Booking</p>
    </div>
    <BookingHeader/>
    <div className='w-11/12 mx-auto pb-20 grid grid-cols-3 gap-8 justify-center place-content-center items-stretch'>

    {theatres.map((theatre, index) => (
        <TheatreCard
          key={index}
          name={theatre.name}
          price={theatre.price}
          rating={theatre.rating}
          reviews={theatre.reviews}
          capacity={theatre.capacity}
          alcoholPermitted={theatre.alcoholPermitted}
          Theaterimage={theatre.Theaterimage}
          isBestSeller={theatre.isBestSeller}
          overview={theatre.overview}
          slots={theatre.slots}
        />
      ))}
    </div>
    </main>
  )
}

export default page