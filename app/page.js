import BlogGrid from "@/components/Homecomponents/Blogsection";
import ExperienceSection from "@/components/Homecomponents/Experiencesection";
import FeaturesSection from "@/components/Homecomponents/Featuressection";
import Hero from "@/components/Homecomponents/Herosection";
import CustomServices from "@/components/Homecomponents/Servicecard";
import TestimonialGrid from "@/components/Homecomponents/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
   <main>
   <Hero/> 
   <FeaturesSection/>
   <ExperienceSection/>
   <CustomServices/>
   <TestimonialGrid/>
   <BlogGrid/>
    
   </main>
  );
}
