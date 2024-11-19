import Image from 'next/image'
import React from 'react'
import Privatescreening from "@/public/asset/Privatescreening.png"
import Customdeco from "@/public/asset/Customdeco.png"
import Snacks from "@/public/asset/Snacks.png"
import Deliciouscake from "@/public/asset/Deliciouscake.png"
import gifts from "@/public/asset/gifts.png"
import Fogeffect from "@/public/asset/Fogeffect.png"
import Photoshoot from "@/public/asset/Photoshoot.png"

const BenefitsList = ({ benefits }) => (
  <div className="bg-pink-100 ring-1 ring-[#F30278] p-4 rounded-lg">
    <h3 className="text-[#F30278] font-semibold mb-2">Benefits & Features</h3>
    <ul className="list-disc list-inside text-[#F30278]  md:text-sm text-xs">
      {benefits.map((benefit, index) => (
        <li className='md:m-2' key={index}>{benefit}</li>
      ))}
    </ul>
  </div>
)

const ServiceSection = ({
  title,
  description,
  benefits,
  imageSrc,
  imageAlt,
  reverse = false,
}) => (
  <div className={`grid grid-cols-1 justify-center items-stretch md:grid-cols-2 py-8 md:px-12 px-2 w-full md:gap-12 gap-6 md:mb-12 ${reverse ? 'md:[&>*:first-child]:order-last bg-[#F7F7F7]' : ''}`}>
    <div className="flex items-center">
      <Image src={imageSrc} alt={imageAlt} className="w-full h-auto object-contain rounded-lg shadow-lg" />
    </div>
    <div className="flex flex-col justify-center">
      <h2 className="md:text-2xl text-xl font-bold mb-4">{title}</h2>
      <p className="mb-4 md:text-sm text-xs leading-7 text-[#595959]">{description}</p>
      <BenefitsList benefits={benefits} />
    </div>
  </div>
)

export default function EventServices() {
  return (
    <div className="w-full mx-auto  py-8">
      <div className="grid gap-8 ">
        <ServiceSection
          title="Private Movie Screening"
          description="Enjoy a truly immersive cinema experience as you relax in the comfort of a private theatre, surrounded by friends and family. Whether it's a casual movie night or a special celebration, you can enjoy your favorite films in an intimate setting without the distractions of a public venue. With customizable options for snacks, drinks, and even decorations, you can make the space uniquely yours."
          benefits={[
            "Watch your favorite films or OTT movies in a private setting",
            "Add personalized snacks and drinks",
            "Enjoy 4K visuals and immersive audio",
            "Choose packages for OTT, movie nights, or events",
          ]}
          imageSrc={Privatescreening}
          imageAlt="Private movie screening room"
        />
        <ServiceSection
          title="Customized Event Decorations"
          description="Create an enchanting atmosphere with custom decorations designed specifically for your event's theme. Whether it's a birthday celebration, movie screening, or corporate event, our expert team ensures every detail is thoughtfully arranged to match your vision. From vibrant colors and themed props to elegant lighting and seating arrangements, each element is carefully curated to enhance the overall ambiance."
          benefits={[
            "Personalized to match your theme and preferences",
            "Professional and quality decorations for any occasion",
            "Sets the mood and elevates the overall experience",
            "Hassle-free setup and cleanup handled by our team",
          ]}
          imageSrc={Customdeco}
          imageAlt="Customized event decoration"
          reverse
        />
        <ServiceSection
          title="Tasty Snacks & Refreshments"
          description="Indulge in a wide assortment of delicious snacks and beverages carefully curated to enhance your movie experience. Whether you're craving savory treats like popcorn and nachos or have a sweet tooth for chocolates and candies, we offer a variety of options to suit every taste. Complement your snacks with refreshing beverages, from soft drinks to specialty mocktails."
          benefits={[
            "Wide selection of savory and sweet options.",
            "Customizable to fit your guests' preferences.",
            "Freshly prepared for the ultimate movie experience.",
            "Available as part of personalized event packages.",
          ]}
          imageSrc={Snacks}
          imageAlt="Tasty Snacks & Refreshments"
        />
         <ServiceSection
          title="Delicious Celebration Cakes"
          description="Satisfy your sweet cravings. Whether you’re hosting a birthday, anniversary, or any other celebration, we offer a variety of flavors and designs to choose from, ensuring the cake is perfectly tailored to your event. Each cake is freshly baked and beautifully decorated to match the atmosphere, adding a touch of sweetness to your gathering."
          benefits={[
            "Freshly baked and tailored to your event’s theme.",
            "Variety of flavors and designs to choose from.",
            "Ideal for birthdays, anniversaries, and other celebrations.",
            "Convenient cake delivery and setup.",
          ]}
          imageSrc={Deliciouscake}
          imageAlt="Delicious Celebration Cakes"
          reverse
        />
         <ServiceSection
          title="Charming Bouquets and Gifts"
          description="Surprise your guests with stunning bouquets and thoughtful gifts that add a personal touch to your special moments. Each bouquet is crafted with care, featuring fresh flowers that perfectly match your event's theme and colors. Alongside the beautiful arrangements, we offer a selection of meaningful gifts to show appreciation and create lasting memories."
          benefits={[
            "Custom floral arrangements for every occasion.",
            "Elegant and unique gifts that delight your guests.",
            "Ideal for enhancing the event's atmosphere.",
            "Easy add-ons for personalized event packages.",
          ]}
          imageSrc={gifts}
          imageAlt="Charming Bouquets and Gifts"
        />
         <ServiceSection
          title="Enchanting Fog Entry Effects"
          description="Add a magical touch to your event with a mesmerizing fog entry that creates an unforgettable grand entrance. This enchanting effect sets the perfect atmosphere, captivating your guests as they arrive. Whether for a wedding, birthday, or corporate celebration, the soft, swirling fog adds an element of surprise and drama, elevating the overall experience."
          benefits={[
            "Creates a dramatic and memorable entrance.",
            "Ideal for special events like weddings or birthdays.",
            "Adds a unique flair that impresses guests.",
            "Safe and professionally operated.",
          ]}
          imageSrc={Fogeffect}
          imageAlt="Enchanting Fog Entry Effects"
          reverse
        />
         <ServiceSection
          title="Memorable Photoshoot Sessions"
          description="Capture lasting memories with a professional photoshoot that ensures every special moment is beautifully documented. Our experienced photographers will work closely with you to highlight the essence of your event, whether it's a birthday, wedding, or corporate gathering. From candid shots to posed portraits, we focus on the details that make your day unique."
          benefits={[
            "Experienced photographers to capture perfect moments.",
            "Ideal for creating keepsakes for guests.",
            "Flexible photo packages that suit your needs.",
            "High-quality edited photos provided post-event.",
          ]}
          imageSrc={Photoshoot}
          imageAlt="Memorable Photoshoot Sessions"
        />
      </div>
    </div>
  )
}