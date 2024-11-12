"use client";
import Image from "next/image";
import Circle1 from "@/public/asset/Circle1.png";
import Circle2 from "@/public/asset/Circle2.png";
import Circle3 from "@/public/asset/Circle3.png";
import Circle4 from "@/public/asset/Circle4.png";
import Circle5 from "@/public/asset/Circle5.png";
import Circle6 from "@/public/asset/Circle6.png";
import Circle7 from "@/public/asset/Circle7.png";
import Arrow from "@/public/asset/Arrow.png";
import Privatescreening from "@/public/asset/Privatescreening.png";
import Customdeco from "@/public/asset/Customdeco.png";
import Snacks from "@/public/asset/Snacks.png";
import Deliciouscake from "@/public/asset/Deliciouscake.png";
import gifts from "@/public/asset/gifts.png";
import Fogeffect from "@/public/asset/Fogeffect.png";
import Photoshoot from "@/public/asset/Photoshoot.png";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, closeDialog } from "@/lib/Redux/dialogSlice";
import { useRouter } from "next/navigation";


const services = [
  {
    title: "Private Movie Screening",
    description:
      "Enjoy your favorite films in an intimate setting, surrounded by friends and family.",
    image: Circle1,
    description2:
      "Enjoy a truly immersive cinema experience as you relax in the comfort of a private theatre, surrounded by friends and family. Whether it's a casual movie night or a special celebration, you can enjoy your favorite films in an intimate setting without the distractions of a public venue. With customizable options for snacks, drinks, and even decorations, you can make the space uniquely yours.",
    imageSrc: Privatescreening,
    imageAlt: "Private movie screening room",
    benefits: [
      "Watch your favorite films or OTT movies in a private setting",
      "Add personalized snacks and drinks",
      "Enjoy 4K visuals and immersive audio",
      "Choose packages for OTT, movie nights, or events",
    ],
  },
  {
    title: "Customized Event Decorations",
    description:
      "Create the perfect atmosphere with custom decorations tailored to your event theme.",
    image: Circle2,
    description2:
      "Create an enchanting atmosphere with custom decorations designed specifically for your event's theme. Whether it's a birthday celebration, movie screening, or corporate event, our expert team ensures every detail is thoughtfully arranged to match your vision. From vibrant colors and themed props to elegant lighting and seating arrangements, each element is carefully curated to enhance the overall ambiance.",
    benefits: [
      "Personalized to match your theme and preferences",
      "Professional and quality decorations for any occasion",
      "Sets the mood and elevates the overall experience",
      "Hassle-free setup and cleanup handled by our team",
    ],
    imageSrc: Customdeco,
    imageAlt: "Customized event decoration",
  },
  {
    title: "Tasty Snacks & Refreshments",
    description:
      "Delight in a variety of delicious snacks & beverages to complement your movie experience.",
    image: Circle3,
    description2:
      "Indulge in a wide assortment of delicious snacks and beverages carefully curated to enhance your movie experience. Whether you're craving savory treats like popcorn and nachos or have a sweet tooth for chocolates and candies, we offer a variety of options to suit every taste. Complement your snacks with refreshing beverages, from soft drinks to specialty mocktails.",
    benefits: [
      "Wide selection of savory and sweet options.",
      "Customizable to fit your guests' preferences.",
      "Freshly prepared for the ultimate movie experience.",
      "Available as part of personalized event packages.",
    ],
    imageSrc: Snacks,
    imageAlt: "Tasty Snacks & Refreshments",
  },
  {
    title: "Delicious Celebration Cakes",
    description:
      "Celebrate with specially crafted cakes that fit the occasion and satisfy your sweet tooth.",
    image: Circle4,
    description2:
      "Satisfy your sweet cravings. Whether you’re hosting a birthday, anniversary, or any other celebration, we offer a variety of flavors and designs to choose from, ensuring the cake is perfectly tailored to your event. Each cake is freshly baked and beautifully decorated to match the atmosphere, adding a touch of sweetness to your gathering.",
    benefits: [
      "Freshly baked and tailored to your event’s theme.",
      "Variety of flavors and designs to choose from.",
      "Ideal for birthdays, anniversaries, and other celebrations.",
      "Convenient cake delivery and setup.",
    ],
    imageSrc: Deliciouscake,
    imageAlt: "Delicious Celebration Cakes",
  },
  {
    title: "Charming Bouquets and Gifts",
    description:
      "Surprise your guests with beautiful bouquets and thoughtful gifts for special moments.",
    image: Circle5,
    description2:
      "Surprise your guests with stunning bouquets and thoughtful gifts that add a personal touch to your special moments. Each bouquet is crafted with care, featuring fresh flowers that perfectly match your event's theme and colors. Alongside the beautiful arrangements, we offer a selection of meaningful gifts to show appreciation and create lasting memories.",
    benefits: [
      "Custom floral arrangements for every occasion.",
      "Elegant and unique gifts that delight your guests.",
      "Ideal for enhancing the event's atmosphere.",
      "Easy add-ons for personalized event packages.",
    ],
    imageSrc: gifts,
    imageAlt: "Charming Bouquets and Gifts",
  },
  {
    title: "Enchanting Fog Entry Effects",
    description:
      "Add a magical touch to your event with a captivating fog entry for a grand experience.",
    image: Circle6,
    description2:
      "Add a magical touch to your event with a mesmerizing fog entry that creates an unforgettable grand entrance. This enchanting effect sets the perfect atmosphere, captivating your guests as they arrive. Whether for a wedding, birthday, or corporate celebration, the soft, swirling fog adds an element of surprise and drama, elevating the overall experience.",
    benefits: [
      "Creates a dramatic and memorable entrance.",
      "Ideal for special events like weddings or birthdays.",
      "Adds a unique flair that impresses guests.",
      "Safe and professionally operated.",
    ],
    imageSrc: Fogeffect,
    imageAlt: "Enchanting Fog Entry Effects",
  },
  {
    title: "Memorable Photoshoot Sessions",
    description:
      "Capture lasting memories with a photoshoot, ensuring your special day is remembered.",
    image: Circle7,
    description2:
      "Capture lasting memories with a professional photoshoot that ensures every special moment is beautifully documented. Our experienced photographers will work closely with you to highlight the essence of your event, whether it's a birthday, wedding, or corporate gathering. From candid shots to posed portraits, we focus on the details that make your day unique.",
    benefits: [
      "Experienced photographers to capture perfect moments.",
      "Ideal for creating keepsakes for guests.",
      "Flexible photo packages that suit your needs.",
      "High-quality edited photos provided post-event.",
    ],
    imageSrc: Photoshoot,
    imageAlt: "Memorable Photoshoot Sessions",
  },
];

export default function CustomServices() {
  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#004AAD] to-[#F30278] ">
            Custom Services
          </span>{" "}
          for an Unforgettable Experience!
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          At The Theatre Thrills, we offer customized services to enhance your
          experience. From private screenings to unique decorations, we ensure
          every celebration is special and memorable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {services.slice(4).map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

const BenefitsList = ({ benefits }) => (
  <div className="bg-pink-100 ring-1 ring-[#F30278] p-2 rounded-lg">
    <h3 className="text-[#F30278] font-semibold ">Benefits & Features</h3>
    <ul className="list-disc list-inside text-[#F30278]  text-sm">
      {benefits.map((benefit, index) => (
        <li className="m-1 text-xs" key={index}>
          {benefit}
        </li>
      ))}
    </ul>
  </div>
);

function ServiceCard({
  title,
  description,
  image,
  benefits,
  description2,
  imageSrc,
  imageAlt,
}) {

  const router=useRouter()




  return (
    <Dialog>
      <DialogTrigger asChild>
        <div   className="flex flex-col items-center text-center max-w-xs cursor-pointer">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4 relative group">
            <Image
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
            <div className="w-full h-full left-0 top-0 rounded-full transition-colors duration-300 flex justify-center items-center overflow-hidden absolute bg-transparent group-hover:bg-[#F302788C]">
              <Image
                src={Arrow}
                alt="Arrow"
                className="object-contain transition-all duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
          <h3 className="text-sm font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-xs">{description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <div
          className={`grid grid-cols-1 justify-center items-stretch md:grid-cols-2  px-4 w-full gap-12  `}
        >
          <div className="flex items-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="mb-4 text-sm  text-[#595959]">{description2}</p>
            <BenefitsList benefits={benefits} />
            <Button
              onPress={() => router.push("/booknow")}
              className="px-8 mt-4 py-0.5 rounded-sm w-48 h-10 border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Book Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
