"use client"
import { Button } from "@nextui-org/react"
import { Card, CardContent } from "@/components/ui/card"
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function BranchInfo() {
  const router=useRouter()
  return (
    <div className="max-w-lg mx-auto md:py-16 py-8">
      <h1 className="text-3xl font-medium text-center mb-6">
        Our Branches in <span className="bg-clip-text font-semibold inline-block text-transparent bg-gradient-to-r from-[#004AAD] via-[#F30278] to-[#E2B600]">Hyderabad!</span>
      </h1>
      <Card className="w-full rounded-sm ">
        <CardContent className="p-6 flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col  justify-center items-center">

          <h2 className="text-xl font-semibold mb-2">Lingampally</h2>
          <p className="text-sm text-gray-600 mb-4">
            3rd Floor, Sai Sadan Enclave , Near Jyothi Theatre,
            <br />
            Lingampally, Hyderabad Telangana - 502032
          </p>
          </div>
          <Button onClick={()=>router.push("https://www.google.com/maps/search/3rd+Floor,+Sai+Sadan+Enclave+Near+Jyothi+Theatre,+Lingampally,+Hyderabad+Telangana+-+502032/@17.4970848,78.3126108,15z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D")} className="px-8 py-0.5 w-48 rounded-none  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
           <FaLocationDot/> View on Map
</Button>
        </CardContent>
      </Card>
    </div>
  )
}