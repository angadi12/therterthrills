"use client";
import { Button, Spinner } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchtheaterbybranchid,
  fetchtheaterbyid,
  setopentheatre,
} from "@/lib/Redux/theaterSlice";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Createtheater from "@/components/Contactuscomponents/Createtheater";
import { Setselectedtheaterid } from "@/lib/Redux/bookingSlice";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CouponOfferForm from "@/components/Dashboardcomponent/Addcoupon";
import { Users2, Camera, Clock, Monitor, Speaker, IndianRupee, Calendar } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";

export default function Managetheatre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theaterid, settheaterid] = useState("");
  const dispatch = useDispatch();
  const {
    branchtheatre,
    branchtheatreloading,
    branchtheatreerror,
    opentheatre,
    openupdatetheatre,
    theater,
    theaterloading,
    theatererror
  } = useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, [dispatch, selectedBranchId]);

  console.log(branchtheatre);

  const handleopentheatre = () => {
    dispatch(setopentheatre(!opentheatre));
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

useEffect(()=>{
  dispatch(fetchtheaterbyid(theaterid))
},[dispatch,theaterid])



  const DetailsDialog = ({theater}) => (
    <Dialog className="relative" open={isModalOpen} onOpenChange={setIsModalOpen}>
      {theaterloading?<div className="w-full   flex justify-center items-center"></div>:<DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{theater?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {/* Image Carousel */}
          <Carousel className="w-full">
            <CarouselContent>
              {theater?.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative  w-full overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${theater?.name} view ${index + 1}`}
                      height={80}
                      width={600}
                      className="object-cover h-40 w-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Price and Capacity Badges */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Badge variant="secondary" className="px-2 py-1">
                <Users2 className="mr-2 h-4 w-4" />
                {theater?.maxCapacity} Max Capacity
              </Badge>
              <Badge variant="secondary" className="px-2 py-1">
                <IndianRupee className="mr-2 h-4 w-4" />
                Decoration - {theater?.minimumDecorationAmount}/-
              </Badge>
              <Badge variant="secondary" className="px-2 py-1">
                Capacity - {theater?.groupSize}/-
              </Badge>
              <Badge variant="secondary" className="px-2 py-1">
                <IndianRupee className="mr-2 h-4 w-4" />
                ExtraPerPerson - {theater?.extraPerPerson}/-
              </Badge>
              <Badge variant="secondary" className="px-2 py-1">
                status - {theater?.status}
              </Badge>
            </div>
            <span className="text-2xl font-bold">₹{theater?.price}/-</span>
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 items-start gap-2">
          <Card>
            <CardContent className="p-4 grid gap-3">
              {theater?.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {index === 0 && <Users2 className="h-4 w-4 text-pink-500" />}
                  {index === 1 && <Camera className="h-4 w-4 text-pink-500" />}
                  {index === 2 && <Clock className="h-4 w-4 text-pink-500" />}
                  {index === 3 && <Monitor className="h-4 w-4 text-pink-500" />}
                  {index === 4 && <Speaker className="h-4 w-4 text-pink-500" />}
                  {amenity}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Time Slots */}
          <div className="space-y-3">
            <h3 className="font-semibold">Total Slots</h3>
            <div className="grid grid-cols-2 gap-3">
              {theater?.slots?.map((slot, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`justify-start gap-2 ${
                     "bg-pink-500 text-white hover:bg-pink-600"
                     
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  {slot.startTime} - {slot.endTime}
                </Button>
              ))}
            </div>
          </div>

          </div>
        </div>
      </DialogContent>}
    </Dialog>
  );

  return (
    <>
      {branchtheatreloading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="danger" />
        </div>
      ) : (
        <ScrollArea className="w-full mx-auto p-4">
          {branchtheatre?.length === 0 && (
            <div className="flex justify-center items-center h-[80vh] col-span-3">
              <p>No Theatre Founds</p>
            </div>
          )}
          {branchtheatreerror && (
            <div className="flex justify-center items-center h-[80vh] col-span-3">
              <p>Error while fetching data</p>
            </div>
          )}

          {branchtheatre?.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2">
                <h1 className="text-2xl font-bold">Manage Theatres</h1>
                <div className="flex items-center space-x-2">
                  {/* <Input type="search" placeholder="Search" className="w-64" /> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-[#F30278] hover:bg-pink-600 text-white"
                        variant="solid"
                      >
                        Add Coupon/Offer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] ">
                      <DialogHeader></DialogHeader>
                      <ScrollArea>
                        <CouponOfferForm />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onPress={handleopentheatre}
                    isIconOnly
                    className="bg-[#F30278] hover:bg-pink-600"
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-none overflow-hidden">
                <Table>
                  <TableHeader className="bg-[#004AAD]">
                    <TableRow>
                      <TableHead className="text-white font-medium">
                        Name
                      </TableHead>
                      <TableHead className="text-white font-medium">
                        Location
                      </TableHead>
                      <TableHead className="text-white font-medium">
                        Branch
                      </TableHead>
                      <TableHead className="text-white font-medium">
                        Capacity
                      </TableHead>
                      <TableHead className="text-white font-medium">
                        Price
                      </TableHead>
                      <TableHead className="text-white font-medium text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branchtheatre?.map((Theater) => (
                      <TableRow key={Theater._id}>
                        <TableCell className="font-medium">
                          {Theater.name}
                        </TableCell>
                        <TableCell>{Theater.location}</TableCell>
                        <TableCell>{Theater?.branch?.Branchname}</TableCell>
                        <TableCell>{Theater.groupSize}</TableCell>
                        <TableCell>₹{Theater.price}</TableCell>
                        <TableCell className="text-center ">
                          <Button
                            onClick={() => {setIsModalOpen(true),settheaterid(Theater?._id)}}
                            size="sm"
                            className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                          >
                         View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <DetailsDialog theater={theater}/>
                </Table>
              </div>
            </div>
          )}
        </ScrollArea>
      )}

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        size="5xl"
        isOpen={opentheatre}
        onOpenChange={handleopentheatre}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center gap-1">
                Add Theater
              </ModalHeader>
              <ModalBody>
                <Createtheater />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
