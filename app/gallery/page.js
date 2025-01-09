import React from 'react'
import Gallary from "@/public/asset/Gallary.png"
import Image from 'next/image'
import Branchselect from '@/components/Gallerycomponents/Branchselect'
import Partycategory from '@/components/Gallerycomponents/Partycategory'


const page = () => {

  const partyCategories = [
    {
      title: "Jasmine Theatre",
      images: [
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346851/Jasmine_1_ruhcya.jpg",
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346682/Jasmine_2_fg1owz.jpg",
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346699/Jasmine_3_ktdh24.jpg",
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346688/Jasmine_4_uapcb7.jpg"
      ],
      Videourl:"https://res.cloudinary.com/dladopmsn/video/upload/v1736346980/Jasmine_dc4edh.mp4"
    },
    {
      title: "Rose Theatre",
      images: [
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346899/rose_1_krmbkb.jpg",
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346711/rose_2_ukgaoj.jpg",
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346699/rose_3_b1aewn.jpg",
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346695/rose_4_nwulps.jpg"
      ],
      Videourl:"https://res.cloudinary.com/dladopmsn/video/upload/v1736347007/Rose_yw83sf.mp4"

    },
    {
      title: "Lily Theatre",
      images: [
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346903/Lily_1_ud3cam.jpg",
    "https://res.cloudinary.com/dladopmsn/image/upload/v1736346730/Lily2_uhhghf.jpg",
    "https://res.cloudinary.com/dladopmsn/image/upload/v1736346725/Lily_3_yeknnq.jpg",
    "https://res.cloudinary.com/dladopmsn/image/upload/v1736346708/Lily_4_ohmeiq.jpg"
      ],
      Videourl:"https://res.cloudinary.com/dladopmsn/video/upload/v1736346997/lily_tjey7h.mp4"

    },
    {
      title: "Iris Theatre",
      images: [
        "https://res.cloudinary.com/dladopmsn/image/upload/v1736346842/iris_1_yo4he2.jpg",
    "https://res.cloudinary.com/dladopmsn/image/upload/v1736346662/iris_2_jekswd.jpg",
    "https://res.cloudinary.com/dladopmsn/image/upload/v1736346709/iris_3_j9ihem.jpg",
    "https://res.cloudinary.com/dladopmsn/image/upload/v1736346665/iris_4_bal2ab.jpg"
      ],
      Videourl:"https://res.cloudinary.com/dladopmsn/video/upload/v1736346964/Iris_c3ef0n.mp4"

    },
  ]

  return (
    <main className='pb-10'>
    <div className='relative justify-center items-center w-full '>
    <Image src={Gallary} alt='about us' className='relative brightness-50'/>
     <p className='absolute md:text-3xl text-lg w-full text-center font-bold transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-[#FFCE00] top-1/2'>Gallery of Memories</p>
    </div>
    {/* <Branchselect/> */}
    <div className="w-11/12 mx-auto  md:py-8 py-4">
      {partyCategories.map((category, index) => (
        <Partycategory key={index} title={category.title} video={category.Videourl} images={category.images} />
      ))}
    </div>
   </main>
  )
}

export default page