import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@nextui-org/react";
import { MapPin, Star, Utensils } from "lucide-react";
import Image from "next/image";
import { Setselectedproccedbranchid } from "@/lib/Redux/bookingSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Branchcard({ branch }) {
    const dispatch=useDispatch()
    const router = useRouter();

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardContent className="space-y-4 pt-6">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/awt-website-769f8.appspot.com/o/Theaterimage2.png?alt=media&token=0c87c008-386c-46ea-996b-368beb3aa980"
            }
            width={200}
            height={200}
            className={`w-full h-48 object-fill rounded-t-l transition-opacity duration-1000`}
          />
          <Button
            variant="solid"
            onClick={() =>router.push(branch?.Locationlink)}

            className="absolute rounded-full bottom-4 right-4 bg-[#F30278] hover:bg-[#F30278]/90 text-white space-x-2"
            size="sm"
          >
            <MapPin className="w-4 h-4 text-white font-semibold" />
            <span>View on Map</span>
          </Button>
        </div>
        <div className="space-y-2 flex flex-col justify-start items-start gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{branch?.Branchname} - <span className="text-xs text-[#F30278]">({branch?.location})</span></h3>
            <div className="flex items-center space-x-1">
              <span className="font-semibold">4.9</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <div className="flex  justify-center rounded-sm gap-2 items-center md:w-60 text-[#F30278] bg-[#F30278]/10 ring-1 ring-[#F30278] p-2 font-semibold text-xs">
            <Utensils className="w-4 h-4" />
            <span>Food & Snacks Available</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>{router.push("/booknow"), dispatch(Setselectedproccedbranchid(branch?._id))}}
          className="px-8 py-0.5 rounded-sm w-full  border-none bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Book Online
        </Button>
      </CardFooter>
    </Card>
  );
}
