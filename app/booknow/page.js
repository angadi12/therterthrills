import React from 'react'
import Theaterbook from "@/public/asset/Theaterbook.png"
import Image from 'next/image'
import BookingHeader from '@/components/Bookingcomponents/Dateselection'
import TheatreCard from '@/components/Bookingcomponents/Theatercard'
import Theaterimage from "@/public/asset/Theaterimage.png"
import Theaterimage2 from "@/public/asset/Theaterimage2.png"
import Cakeicon from "@/public/asset/Cakeicon.png"
import refundicon from "@/public/asset/refundicon.png"
import Groupicon2 from "@/public/asset/Groupicon2.png"
import TVicon from "@/public/asset/TVicon.png"
import Speakericon from "@/public/asset/Speakericon.png"

const page = () => {

  const theatres = [
    {
      name: "Bronze Theatre",
      price: 2372,
      rating: 5,
      reviews: 347,
      capacity: 4,
      alcoholPermitted: true,
      Theaterimage:[{images:Theaterimage}],
      overview:[
        { title:"400/- Per extra person",icon:Groupicon2},
        { title:"Add Cakes and Photography in the next step",icon:Cakeicon},
        { title:"Refund eligible if cancelled 72 hours before the slot time",icon:refundicon},
        { title:"133 inch 4k screen",icon:TVicon},
        { title:"1000W Dolby Atmos",icon:Speakericon}
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
      Theaterimage:[{images:Theaterimage}],
      isBestSeller: true,
      overview: [
        { title:"400/- Per extra person",icon:Groupicon2},
        { title:"Add Cakes and Photography in the next step",icon:Cakeicon},
        { title:"Refund eligible if cancelled 72 hours before the slot time",icon:refundicon},
        { title:"133 inch 4k screen",icon:TVicon},
        { title:"1000W Dolby Atmos",icon:Speakericon}
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
      Theaterimage:[{images:Theaterimage},{images:Theaterimage2}],
      overview: [
        { title:"400/- Per extra person",icon:Groupicon2},
        { title:"Add Cakes and Photography in the next step",icon:Cakeicon},
        { title:"Refund eligible if cancelled 72 hours before the slot time",icon:refundicon},
        { title:"133 inch 4k screen",icon:TVicon},
        { title:"1000W Dolby Atmos",icon:Speakericon}
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
    <div className='w-11/12 h-full mx-auto pb-20 grid grid-cols-3 gap-8 justify-center place-content-center items-stretch'>

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