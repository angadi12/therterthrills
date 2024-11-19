'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, Star } from 'lucide-react'
import { Button } from "@nextui-org/react"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  },
  {
    name: "Sarah T",
    image: Test3,
    text: "A fantastic venue for our corporate event. The fog entry was a hit, and everyone loved the snacks!"
  },
  {
    name: "Sarah T",
    image: Test3,
    text: "A fantastic venue for our corporate event. The fog entry was a hit, and everyone loved the snacks!"
  },
  {
    name: "Sarah T",
    image: Test3,
    text: "A fantastic venue for our corporate event. The fog entry was a hit, and everyone loved the snacks!"
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(1) // Start with the middle slide active

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const getSlideIndex = (index) => {
    return (index + testimonials.length) % testimonials.length
  }

  return (
    <div className="w-11/12 mx-auto md:py-24 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center place-content-center items-stretch">
        <div className=''>
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">Wonderful Feedbacks</span>{" "}
          </h2>
          <h3 className="md:text-3xl text-2xl font-bold md:mb-6 mb-3">from our customers!</h3>
          <p className="text-gray-600 md:mb-8 mb-4">
{`            We take pride in delivering exceptional experiences tailored to your needs. Here's what some of our satisfied clients have to say about their time at The Theatre Thrills
`}          </p>
          <div className=" space-x-2 hidden md:flex">
            <Button variant="outline" isIconOnly className="rounded-full text-blue-600 ring-1 ring-blue-600" onClick={prevSlide}>
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button variant="solid" isIconOnly className="rounded-full bg-blue-600 text-white" onClick={nextSlide}>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="relative md:h-auto h-[60vh] flex justify-center  items-center ">
          <AnimatePresence initial={false}>
            {[-1, 0, 1].map((offset) => {
              const index = getSlideIndex(activeIndex + offset)
              const testimonial = testimonials[index]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: offset * 100 }}
                  animate={{
                    opacity: offset === 0 ? 1 : 0.7,
                    y: offset * 120,
                    scale: offset === 0 ? 1 : 0.9,
                    zIndex: 2 - Math.abs(offset)
                  }}
                  exit={{ opacity: 0, y: offset * -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full"
                >
                  <Card className={`bg-white shadow-md rounded-none border-l-4 ${offset === 0 ? 'border-blue-600' : 'border-gray-400'}`}>
                    <CardContent className="md:p-4 p-2 flex items-start">
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
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        <div className=" space-x-2 flex md:hidden justify-center items-center mx-auto">
            <Button variant="outline" isIconOnly className="rounded-full text-blue-600 ring-1 ring-blue-600" onClick={prevSlide}>
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button variant="solid" isIconOnly className="rounded-full bg-blue-600 text-white" onClick={nextSlide}>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
      </div>
    </div>
  )
}