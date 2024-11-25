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
  setopentheatre,
} from "@/lib/Redux/theaterSlice";
import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Createtheater from "@/components/Contactuscomponents/Createtheater";

const expenses = [
  {
    id: 1,
    name: "Food Items",
    date: "28-10-2024",
    description: "Cost of snacks, drinks, and restocking",
    amount: "2999/-",
  },
  {
    id: 2,
    name: "Electricity Bill",
    date: "28-10-2024",
    description: "Power expenses for projectors, lighting",
    amount: "2999/-",
  },
  {
    id: 3,
    name: "Internet Bill",
    date: "28-10-2024",
    description: "Monthly charges for internet",
    amount: "2999/-",
  },
  {
    id: 4,
    name: "Decorations",
    date: "28-10-2024",
    description: "Costs for themed decorations, balloons etc",
    amount: "2999/-",
  },
  {
    id: 5,
    name: "Party Supplies",
    date: "28-10-2024",
    description: "Plates, napkins, cups, and utensils",
    amount: "2999/-",
  },
];

export default function Managetheatre() {
  const dispatch = useDispatch();
  const {
    branchtheatre,
    branchtheatreloading,
    branchtheatreerror,
    opentheatre,
    openupdatetheatre,
  } = useSelector((state) => state.theater);
  const { selectedBranchId } = useSelector((state) => state.branches);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchtheaterbybranchid(selectedBranchId));
    }
  }, []);

  console.log(branchtheatre);

  const handleopentheatre = () => {
    dispatch(setopentheatre(!opentheatre));
  };

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

         { branchtheatre?.length > 0 && <div className="space-y-4">
            <div className="flex justify-between items-center p-2">
              <h1 className="text-2xl font-bold">Manage Theatres</h1>
              <div className="flex items-center space-x-2">
                <Input type="search" placeholder="Search" className="w-64" />
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
                  {branchtheatre?.map(
                    (Theater) =>
                      (
                        <TableRow key={Theater.id}>
                          <TableCell className="font-medium">
                            {Theater.name}
                          </TableCell>
                          <TableCell>{Theater.location}</TableCell>
                          <TableCell>{Theater?.branch?.Branchname}</TableCell>
                          <TableCell>{Theater.groupSize}</TableCell>
                          <TableCell>₹{Theater.price}</TableCell>
                          <TableCell className="text-center ">
                            <Button
                              size="sm"
                              className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                            >
                              Modify
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>}
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
