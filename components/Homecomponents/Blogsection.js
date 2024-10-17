import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@nextui-org/react"
import Blog3 from "@/public/asset/Blog3.png"
import Blog2 from "@/public/asset/Blog2.png"
import Blog1 from "@/public/asset/Blog1.png"
import Image from "next/image"

const blogPosts = [
  {
    image: Blog1,
    title: "This is a Demo Title",
    description: "This a filler for this blog, real content will be added during development process Read More",
  },
  {
    image: Blog2,
    title: "This is a Demo Title",
    description: "This a filler for this blog, real content will be added during development process Read More",
  },
  {
    image: Blog3,
    title: "This is a Demo Title",
    description: "This a filler for this blog, real content will be added during development process Read More",
  },
]

export default function BlogGrid() {
  return (
    <div className="w-11/12 mx-auto  py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Our <span className="bg-clip-text inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">Daily Blogs!</span> 
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden shadow-none border-none">
            <CardHeader className="p-0">
              <Image src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </CardHeader>
            <CardContent className="py-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
      <Button size="sm" className="px-8 py-0.5 w-60 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
         View All
</Button>
      </div>
    </div>
  )
}