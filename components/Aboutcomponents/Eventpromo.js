import Image from "next/image";
import Aboutusevent from "@/public/asset/Aboutusevent.png";
import Star from "@/public/asset/Star.png";
import Groupicon from "@/public/asset/Groupicon.png";
import { Card, CardContent } from "@/components/ui/card";

export default function Eventpromo() {
  return (
    <div className="w-11/12 mx-auto py-12">
      <div className="grid grid-cols-2 justify-center place-content-center gap-12 items-stretch">
        <div className="w-full mx-auto ">
          <div className="rounded-xl overflow-hidden mb-4">
            <Image
              src={Aboutusevent}
              width={400}
              height={150}
              alt="Celebratory scene with wine glasses and confetti"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1  bg-[#F30278]/20 ring-1 ring-[#F30278] rounded-lg p-3 text-white flex gap-2 items-center">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-[#F30278]">
                <Image
                  src={Groupicon}
                  alt="Groupicon"
                  className="object-contain h-10 w-10"
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#F30278]">100+</div>
                <div className="text-lg text-[#F30278]">Happy Customers</div>
              </div>
            </div>
            <div className="flex-1 bg-[#004AAD]/20 ring-1 ring-[#004AAD] rounded-lg p-3 text-white flex gap-2 items-center">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-[#004AAD]">
                <Image
                  src={Star}
                  alt="Star"
                  className="object-contain h-10 w-10"
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#004AAD]">95%</div>
                <div className="text-lg text-[#004AAD]">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  space-y-6">
          <h1 className="text-3xl font-medium">
            We help you create a{" "}
            <span className="bg-clip-text font-semibold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">
              Memorable Experience!
            </span>{" "}
          </h1>
          <p className="text-gray-600 leading-7 text-justify">
            {` At The Theatre Thrills, we are passionate about creating unforgettable experiences through private cinema and personalized events. Our mission is to transform your gatherings into extraordinary occasions, whether it's a cozy movie night or a lavish celebration. With a dedicated team that takes care of every detail, we ensure that your event is uniquely tailored to your preferences. From custom decorations to delicious refreshments, we offer a range of services designed to enhance your experience and create lasting memories. Join us for a magical journey where every moment is cherished!`}
          </p>
        </div>
      </div>
    </div>
  );
}
