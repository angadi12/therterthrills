import React from 'react'

const BenefitsList = ({ benefits }) => (
  <div className="bg-pink-100 p-4 rounded-lg">
    <h3 className="text-pink-600 font-semibold mb-2">Benefits & Features</h3>
    <ul className="list-disc list-inside text-pink-600 text-sm">
      {benefits.map((benefit, index) => (
        <li key={index}>{benefit}</li>
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
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 ${reverse ? 'md:[&>*:first-child]:order-last' : ''}`}>
    <div className="flex items-center">
      <img src={imageSrc} alt={imageAlt} className="w-full h-auto rounded-lg shadow-lg" />
    </div>
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4 text-sm leading-relaxed">{description}</p>
      <BenefitsList benefits={benefits} />
    </div>
  </div>
)

export default function EventServices() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-8">
        <ServiceSection
          title="Private Movie Screening"
          description="Enjoy a truly immersive cinema experience as you relax in the comfort of a private theatre, surrounded by friends and family. Whether it's a casual movie night or a special celebration, you can enjoy your favorite films in an intimate setting without the distractions of a public venue. With customizable options for snacks, drinks, and even decorations, you can make the space uniquely yours."
          benefits={[
            "Watch your favorite films or OTT movies in a private setting",
            "Add personalized snacks and drinks",
            "Enjoy 4K visuals and immersive audio",
            "Choose packages for OTT, movie nights, or events",
          ]}
          imageSrc="/placeholder.svg?height=300&width=400"
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
          imageSrc="/placeholder.svg?height=300&width=400"
          imageAlt="Customized event decoration"
          reverse
        />
      </div>
    </div>
  )
}