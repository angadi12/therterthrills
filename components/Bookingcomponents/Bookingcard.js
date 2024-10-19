import Image from "next/image"
import { Button, Divider } from "@nextui-org/react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Users } from "lucide-react"
import Bookingimage from "@/public/asset/Bookingimage.png"


export default function Bookingcard({
  type = "Birthday Party",
  price = "3479/-",
  image = Bookingimage,
  location = "Lingampally",
  date = "17-10-2024",
  time = "7:30 PM - 10:30 PM",
  members = 4,
  addOns = ["Party Props x 1","LED Lights x 1","Photo Clippings (4 photos) x 1"]
}) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={`${type} image`}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{type}</h2>
          <span className="text-xl font-bold text-[#F30278]">{price}</span>
        </div>
        <Divider className="my-2 w-11/12 mx-auto"/>
        <div className="bg-[#F30278] text-white p-3 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{time}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{members} Members</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Add - Ons</h3>
          <div className="grid grid-cols-2 gap-2">
            {Array.isArray(addOns) && addOns.length > 0 ? (
              addOns.map((addon, index) => (
                <div key={index} className="border-1 border-[#F30278] rounded bg-[#F30278]/10 p-2 text-sm text-center font-medium text-[#F30278]">
                  {addon}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">No add-ons available</div>
            )}
          </div>
        </div>
      </CardContent>
      <Divider className="my-2 w-11/12 mx-auto"/>
      <CardFooter>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-none text-white">Modify</Button>
      </CardFooter>
    </Card>
  )
}