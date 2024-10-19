import React from 'react'
import Image from "next/image"

const Partycategory = ({ title, images }) => {
  return (
    <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-3 gap-4 w-full">
      {images.map((src, index) => (
        <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
          <Image
            src={src}
            alt={`${title} image ${index + 1}`}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  </div>
  )
}

export default Partycategory