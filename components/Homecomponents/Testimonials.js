import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@nextui-org/react"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Test1 from "@/public/asset/Test1.png"
import Test2 from "@/public/asset/Test2.png"
import Test3 from "@/public/asset/Test3.png"



const testimonials = [
  {
    name: "Emily R",
    image: Test1,
    text: "An unforgettable experience! The private screening felt so special, and the service was impeccable."
  },
  {
    name: "Mark J",
    image: Test2,
    text: "The decorations were stunning, and the team went above and beyond to make my birthday celebration perfect!"
  },
  {
    name: "Sarah T",
    image: Test3,
    text: "A fantastic venue for our corporate event. The fog entry was a hit, and everyone loved the snacks!"
  }
]

export default function TestimonialGrid() {
  return (
    <div className="w-11/12 mx-auto  py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center place-content-center items-center ">
        <div>
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">Wonderful Feedbacks</span>{" "}
          </h2>
          <h3 className="text-3xl font-bold mb-6">from our customers!</h3>
          <p className="text-gray-600 mb-8">
{`            We take pride in delivering exceptional experiences tailored to your needs. Here's what some of our satisfied clients have to say about their time at The Theatre Thrills
`}          </p>
          <div className="flex space-x-2">
            <Button variant="outline" isIconOnly className="rounded-full text-blue-600 ring-1 ring-blue-600">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button  variant="solid" isIconOnly  className="rounded-full bg-blue-600 text-white">
              <ChevronRight className="w-4 h-4 " />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`bg-white shadow-md   rounded-none border-l-4 border-gray-400 ${index === 1 ? 'border-l-4  border-blue-600 -ml-6' : ''}`}>
              <CardContent className="p-4 flex items-start">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={40}
                  width={40}
                  className="w-16 h-16 rounded-full mr-4 flex-shrink-0"
                />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{testimonial.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}