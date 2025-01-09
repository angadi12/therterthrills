import React from "react";
import Image from "next/image";

const Partycategory = ({ title, images, video }) => {
  return (
    <div className="mb-8">
      <h2 className="md:text-2xl md:py-4 py-2 text-lg font-bold mb-4">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-4 w-full">
        {images.map((src, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`${title} image ${index + 1}`}
              fill
              className="object-fill "
            />
          </div>
        ))}
       {video && <video
          src={video}
          controls
          className="w-full aspect-square rounded-lg h-full object-fill"
        >
          Your browser does not support the video tag.
        </video>}
      </div>
    </div>
  );
};

export default Partycategory;
