import { Star, Users, Wine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"



export default function TheatreCard({
  name,
  price,
  rating,
  reviews,
  capacity,
  alcoholPermitted,
  image,
  isBestSeller = false,
  overview,
  slots,
}) {
  return (
    <Card className="w-full ">
      <CardHeader className="p-0">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-48 object-cover" />
          {isBestSeller && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{reviews} Reviews</span>
          </div>
          <span className="font-bold">{price}/-</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="flex gap-2 mb-4">
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded flex items-center">
            <Users className="w-3 h-3 mr-1" /> {capacity} People Capacity
          </span>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded flex items-center">
            <Wine className="w-3 h-3 mr-1" /> Alcohol Permitted
          </span>
        </div>
        {overview && overview.length > 0 && (
          <div className="mb-4">
            <h4 className="font-bold mb-2">Theatre Overview</h4>
            <ul className="list-disc list-inside text-sm">
              {(overview ?? []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {slots && slots.length > 0 && (
          <div>
            <h4 className="font-bold mb-2">Choose Slot</h4>
            <div className="grid grid-cols-2 gap-2">
              {(slots ?? []).map((slot, index) => (
                <Button
                  key={index}
                  variant={index === (slots?.length ?? 0) - 1 ? "default" : "outline"}
                  className="w-full"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Proceed
        </Button>
      </CardFooter>
    </Card>
  )
}