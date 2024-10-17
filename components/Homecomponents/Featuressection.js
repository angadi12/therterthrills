import { Clapperboard, Tv, Calendar, Gift, Users } from 'lucide-react'
import Calender from "@/public/asset/Calender.png"
import Cinematic from "@/public/asset/Cinematic.png"
import Packages from "@/public/asset/Packages.png"
import Privatespace from "@/public/asset/Privatespace.png"
import Hall from "@/public/asset/Hall.png"
import Image from 'next/image'

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-11/12  mx-auto ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <Image src={Hall} alt='cinemaHall'/>
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-4">
              We make your celebration{' '}
              <span className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
              a Blockbuster!</span>
            </h2>
            <p className="text-gray-600 leading-7 mb-6">
{`At The Theatre Thrills, we provide private theatre space for a personalized entertainment experience. Whether you're hosting a movie night, birthday, or party, we make it unforgettable with our state-of-the-art theatres and event customization.`}            </p>
            <div className="grid grid-cols-2 gap-6">
              <FeatureItem
                icon={Cinematic}
                title="4K Cinematic Experience"
              />
              <FeatureItem
                icon={Calender}
                title="Flexible Booking Options"
              />
              <FeatureItem
                icon={Packages}
                title="Custom Event Packages"
              />
              <FeatureItem
                icon={Privatespace}
                title="Exclusive Private Space"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ icon, title }) {
  return (
    <div className="flex gap-2 items-center">
      <Image src={icon} alt='icon' className="mr-4 object-contain"/>
      <span className="text-lg font-bold">{title}</span>
    </div>
  )
}