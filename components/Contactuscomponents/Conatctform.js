import { Button } from "@nextui-org/react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Contactform() {
  return (
    <main className="w-11/12 mx-auto py-16">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Let's Plan Something Epic?</h1>
            <h2 className="text-2xl font-semibold">
              <span className="text-purple-600">Contact</span>{" "}
              <span className="text-pink-500">Us</span>{" "}
              <span className="text-yellow-500">Today!</span>
            </h2>
            <p className="text-gray-600">
              We're excited to help bring your event to life. Whether you're booking a private screening or planning a
              celebration, contact us today for all the details. Our team is here to make sure your experience is smooth and
              unforgettable.
            </p>
            <div className="relative h-48 rounded-lg overflow-hidden">
              <img
                alt="Team member"
                className="absolute inset-0 w-full h-full object-cover"
                height="200"
                src="/placeholder.svg?height=200&width=300"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
            </div>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Mobile Number" type="tel" />
              <Input placeholder="E-Mail Address" type="email" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Add-Ons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="decoration">Decoration</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea className="min-h-[100px]" placeholder="Details (Optional)" />
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}