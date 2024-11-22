"use client";
import { useEffect, useState } from "react";
import { Button, Divider, Spinner } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, MapPin, Plus, Users, Monitor } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterQuery as setBranchFilterQuery,
  Setopenbranch,
} from "@/lib/Redux/BranchSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Createbranch from "@/components/Dashboardcomponent/Createbranch";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import { Separator } from "@/components/ui/separator";
import Updatebranch from "@/components/Dashboardcomponent/Updatebranch";

export default function ManageBranches() {
  const dispatch = useDispatch();
  const openbranch = useSelector((state) => state.branches.openbranch);
  const { branches } = useSelector((state) => state.branches);
  const [filteredBranches, setFilteredBranches] = useState(branches);
  const filterQuery = useSelector((state) => state.branches.filterQuery);
  const status = useSelector((state) => state.branches.status);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBranches(
      branches?.filter(
        (branch) =>
          typeof branch.Branchname === "string" &&
          branch.Branchname.toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [filterQuery, branches]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (query.trim()) {
      dispatch(setBranchFilterQuery(query));
    } else {
      dispatch(setBranchFilterQuery(""));
    }
  };

  const setopenmodel = () => {
    dispatch(Setopenbranch(!openbranch));
  };

  if (filteredBranches === undefined) {
    return (
      <div className="w-full  h-[60vh] flex justify-center items-center p-3 rounded-md">
        <p>Error while fetching branch details</p>
      </div>
    );
  }

  return (
    <>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="danger" />
        </div>
      ) : (
        <section className="w-full mx-auto bg-white">
          <div className="flex justify-between  items-center py-4  sticky top-0 bg-white z-50 p-4">
            <h1 className="text-2xl font-bold">
              Manage Branches{" "}
              <span className="text-[#F30278]">({branches?.length})</span>
            </h1>
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search"
                className="w-64"
                onChange={handleSearchChange}
              />
              {/* <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button> */}
              <Button
                onPress={setopenmodel}
                isIconOnly
                className="bg-[#F30278]  hover:bg-pink-600"
              >
                <Plus className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
           <Separator className="space-x-2 mx-auto w-[98%]"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 p-5 ">
            {status === "succeeded" && filteredBranches?.length === 0 && (
              <div className="flex justify-center items-center h-[80vh] col-span-3">
              <p>No branches Found</p>
              </div>
            )}

            {filteredBranches?.map(
              (branch) =>
                status === "succeeded" && (
                  <Card
                    key={branch?._id}
                    className="overflow-hidden rounded-none ring-1 ring-gray-200"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {branch?.location}
                        </span>
                      </div>
                      <CardTitle className="">
                        {branch?.Branchname}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Separator className="my-2" />
                      <div className="flex space-x-2 ">
                        <Badge
                          variant="secondary"
                          className="flex items-center  bg-slate-200 space-x-1"
                        >
                          <Users className="h-3 w-3 text-[#434343]" />
                          <span className="text-[#434343]">1 Admin</span>
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center bg-slate-200 space-x-1"
                        >
                          <Monitor className="h-3 w-3 text-[#434343]" />
                          <span className="text-[#434343]">3 Theatres</span>
                        </Badge>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt={branch.Branchname}
                          />
                          <AvatarFallback>
                            {branch.Branchname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {/* <p className="text-sm font-medium">{branch.adminName}</p> */}
                          <p className="text-sm text-pink-500">
                            {branch?.Number}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="ml-auto text-green-500 border-green-500"
                        >
                          {/* {branch.adminStatus} */}Active
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 mt-2">
                      <Button className="px-8 py-0.5 rounded-sm w-full  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                        Modify
                      </Button>
                    </CardFooter>
                  </Card>
                )
            )}
          </div>
        </section>
      )}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={openbranch}
        onOpenChange={setopenmodel}
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
              <ModalHeader className="flex flex-col text-center">
                Create New Branch
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-auto">
                  <Createbranch />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
              <ModalHeader className="flex flex-col text-center">
                Update Branch Details 
              </ModalHeader>
              <ModalBody>
               <Updatebranch id={Branchid}/>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
