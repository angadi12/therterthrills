import Image from 'next/image'
import Circle1 from "@/public/asset/Circle1.png"
import Circle2 from "@/public/asset/Circle2.png"
import Circle3 from "@/public/asset/Circle3.png"
import Circle4 from "@/public/asset/Circle4.png"
import Circle5 from "@/public/asset/Circle5.png"
import Circle6 from "@/public/asset/Circle6.png"
import Circle7 from "@/public/asset/Circle7.png"

const services = [
  {
    title: "Private Movie Screening",
    description: "Enjoy your favorite films in an intimate setting, surrounded by friends and family.",
    image:Circle1
  },
  {
    title: "Customized Event Decorations",
    description: "Create the perfect atmosphere with custom decorations tailored to your event theme.",
    image:Circle2
  },
  {
    title: "Tasty Snacks & Refreshments",
    description: "Delight in a variety of delicious snacks & beverages to complement your movie experience.",
    image:Circle3
  },
  {
    title: "Delicious Celebration Cakes",
    description: "Celebrate with specially crafted cakes that fit the occasion and satisfy your sweet tooth.",
    image:Circle4
  },
  {
    title: "Charming Bouquets and Gifts",
    description: "Surprise your guests with beautiful bouquets and thoughtful gifts for special moments.",
    image:Circle5
  },
  {
    title: "Enchanting Fog Entry Effects",
    description: "Add a magical touch to your event with a captivating fog entry for a grand experience.",
    image:Circle6
  },
  {
    title: "Memorable Photoshoot Sessions",
    description: "Capture lasting memories with a photoshoot, ensuring your special day is remembered.",
    image:Circle7
  }
]

export default function CustomServices() {
  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#004AAD] to-[#F30278] ">
            Custom Services
          </span>{' '}
          for an Unforgettable Experience!
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          At The Theatre Thrills, we offer customized services to enhance your experience. From private screenings to
          unique decorations, we ensure every celebration is special and memorable.
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
  )
}

function ServiceCard({ title, description, image }) {
  return (
    <div className="flex  flex-col items-center text-center max-w-xs">
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4 ">
        <Image
          src={image}
          alt={title}
          className="object-fill w-40 h-40"
        />
      </div>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-xs">{description}</p>
    </div>
  )
}