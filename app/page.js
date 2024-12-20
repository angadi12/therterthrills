import BlogGrid from "@/components/Homecomponents/Blogsection";
import ChatWidget from "@/components/Homecomponents/Chatwidget";
import ExperienceSection from "@/components/Homecomponents/Experiencesection";
import FeaturesSection from "@/components/Homecomponents/Featuressection";
import Hero from "@/components/Homecomponents/Herosection";
import CustomServices from "@/components/Homecomponents/Servicecard";
import Slidingoffer from "@/components/Homecomponents/Slidingoffer";
import TestimonialGrid from "@/components/Homecomponents/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pb-10 md:pb-0">
      <Hero />
      {/* <ChatWidget/> */}
      <FeaturesSection />
      <ExperienceSection />
      <CustomServices/>
      <TestimonialGrid />
      <BlogGrid />
    </main>
  );
}
