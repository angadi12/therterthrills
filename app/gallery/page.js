import React from 'react'
import Gallary from "@/public/asset/Gallary.png"
import Image from 'next/image'
import Branchselect from '@/components/Gallerycomponents/Branchselect'
import Partycategory from '@/components/Gallerycomponents/Partycategory'
import Reunion1 from "@/public/asset/Reunion1.png"
import Reunion2 from "@/public/asset/Reunion2.png"
import Reunion3 from "@/public/asset/Reunion3.png"
import Annie1 from "@/public/asset/Annie1.png"
import Annie2 from "@/public/asset/Annie2.png"
import Annie3 from "@/public/asset/Annie3.png"
import Birth1 from "@/public/asset/Birth1.png"
import Birth2 from "@/public/asset/Birth2.png"
import Birth3 from "@/public/asset/Birth3.png"

const page = () => {

  const partyCategories = [
    {
      title: "Reunion Party",
      images: [
        Reunion1,
        Reunion2,
        Reunion3,
      ],
    },
    {
      title: "Anniversary Party",
      images: [
       Annie1,
       Annie2,
       Annie3,
      ],
    },
    {
      title: "Birthday Party",
      images: [
        Birth1,
        Birth2,
        Birth3,
      ],
    },
  ]

  return (
    <main >
    <div className='relative justify-center items-center w-full '>
    <Image src={Gallary} alt='about us' className='relative brightness-50'/>
     <p className='absolute text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Gallery of Memories</p>
    </div>
    <Branchselect/>
    <div className="w-11/12 mx-auto  py-8">
      {partyCategories.map((category, index) => (
        <Partycategory key={index} title={category.title} images={category.images} />
      ))}
    </div>
   </main>
  )
}

export default page