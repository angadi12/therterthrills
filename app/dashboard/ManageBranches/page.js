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
import { Filter, MapPin, Plus, Users, Monitor, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterQuery as setBranchFilterQuery,
  Setopenbranch,
  Setopenupdatebranch,
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
import { fetchBranches, Setbranchid } from "@/lib/Redux/BranchSlice";
import { Separator } from "@/components/ui/separator";
import Updatebranch from "@/components/Dashboardcomponent/Updatebranch";
import { Deletebranchapi } from "@/lib/API/Branch";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Fetchadminandtheater from "@/components/Dashboardcomponent/Fetchadminandtheater";

export default function ManageBranches() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const openbranch = useSelector((state) => state.branches.openbranch);
  const { branches, openupdatebranch, Branchid } = useSelector(
    (state) => state.branches
  );
  const [filteredBranches, setFilteredBranches] = useState(branches);
  const filterQuery = useSelector((state) => state.branches.filterQuery);
  const status = useSelector((state) => state.branches.status);
  const [delteloading, setDeleteloading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);



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

  const Openupdatebranchhandle = () => {
    dispatch(Setopenupdatebranch(!openupdatebranch));
  };

  if (filteredBranches === undefined) {
    return (
      <div className="w-full  h-[60vh] flex justify-center items-center p-3 rounded-md">
        <p>Error while fetching branch details</p>
      </div>
    );
  }

  const Deletehandle = async (Branchid) => {
    setDeleteloading(true);
    try {
      const response = await Deletebranchapi(Branchid);
      if (response.success === true) {
        toast({
          title: "Deleted!",
          description: "Branch has been deleted",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setDeleteloading(false);
        setIsDelete(!isDelete);
        dispatch(fetchBranches());
      }
    } catch (error) {
      toast({
        title: "Failed to delete branch",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setDeleteloading(false);
    }
  };

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
          <Separator className="space-x-2 mx-auto w-[98%]" />
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
                    className="overflow-hidden relative rounded-none ring-1 ring-gray-200"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {branch?.location}
                        </span>
                      </div>
                      <CardTitle className="">{branch?.Branchname}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Separator className="my-2" />
                     <Fetchadminandtheater branchi={branch?._id}/>
                      <Separator className="my-2" />
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            alt={branch?.Branchname}
                          />
                          <AvatarFallback>
                            {branch.Branchname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {/* <p className="text-sm font-medium">{branch.adminName}</p> */}
                          <p className="text-sm text-[#F30278]">
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
                    <CardFooter className="bg-muted/50 mt-2 flex justify-between gap-2 ">
                      <Button
                        onPress={() => {
                          dispatch(Setbranchid(branch?._id)),
                            Openupdatebranchhandle();
                        }}
                        className="px-8 py-0.5 rounded-sm w-full  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                      >
                        Modify
                      </Button>
                      <Button
                        onPress={() => {
                          dispatch(Setbranchid(branch?._id)),
                            setIsDelete(!isDelete);
                        }}
                        isIconOnly
                        variant="bordered"
                        className="px-2 absolute top-2 right-2 bg-white"
                        radius="sm"
                      >
                        <Trash className="text-[#F30278]" />
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
        isOpen={openupdatebranch}
        onOpenChange={Openupdatebranchhandle}
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
                <Updatebranch />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isDelete}
        onOpenChange={setIsDelete}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to Delete?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  isLoading={delteloading}
                  onPress={() => {
                    Deletehandle(Branchid);
                  }}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#F30278] text-white"
                >
                  Yes
                </Button>
                <Button
                  size="md"
                  onPress={() => setIsDelete(false)}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#004AAD] text-white"
                >
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
