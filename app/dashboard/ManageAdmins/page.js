"use client";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, Mail, Phone, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  setFilterQuery as setAdminFilterQuery,
  Setopenadmin,
  Setopenupdateadmin,
} from "@/lib/Redux/BranchSlice";
import { fetchAdminsByBranchId, Setselectedadminid } from "@/lib/Redux/AdminSlice";
import { useSelector, useDispatch } from "react-redux";
import Createadmin from "@/components/Dashboardcomponent/Createadmin";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Updateadmin from "@/components/Dashboardcomponent/Updateadmin";

const admins = [
  {
    id: 1,
    name: "Steve Smith",
    status: "Active",
    location: "Lingampally",
    email: "stevesmiththrills@gmail.com",
    phone: "+91-7839387483/8372987289",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Steve Smith",
    status: "Active",
    location: "Lingampally",
    email: "stevesmiththrills@gmail.com",
    phone: "+91-7839387483/8372987289",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Steve Smith",
    status: "Active",
    location: "Lingampally",
    email: "stevesmiththrills@gmail.com",
    phone: "+91-7839387483/8372987289",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Steve Smith",
    status: "Active",
    location: "Lingampally",
    email: "stevesmiththrills@gmail.com",
    phone: "+91-7839387483/8372987289",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Steve Smith",
    status: "Active",
    location: "Lingampally",
    email: "stevesmiththrills@gmail.com",
    phone: "+91-7839387483/8372987289",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Steve Smith",
    status: "Active",
    location: "Lingampally",
    email: "stevesmiththrills@gmail.com",
    phone: "+91-7839387483/8372987289",
    avatarUrl: "/placeholder.svg?height=100&width=100",
  },
];

export default function ManageAdmins() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { selectedBranchId, filterQuery, openadmin, openupdateadmin } =
    useSelector((state) => state.branches);
  const { admins, adminsStatus, error } = useSelector((state) => state.admin);
  const [filteredAdmins, setFilteredAdmins] = useState(admins);

  useEffect(() => {
    if (selectedBranchId) {
      dispatch(fetchAdminsByBranchId(selectedBranchId));
    }
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    setFilteredAdmins(
      admins?.filter(
        (admin) =>
          typeof admin.fullName === "string" &&
          admin.fullName.toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [filterQuery, admins]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (query.trim()) {
      dispatch(setAdminFilterQuery(query));
    } else {
      dispatch(setAdminFilterQuery(""));
    }
  };

  const setopenmodel = () => {
    dispatch(Setopenadmin(!openadmin));
  };

  const openupdateadminhandle = () => {
    dispatch(Setopenupdateadmin(!openupdateadmin));
  };

  return (
    <>
      {adminsStatus === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="danger" />
        </div>
      ) : (
        <section className="w-full mx-auto bg-white">
          <div className="flex justify-between  items-center py-4  sticky top-0 bg-white z-50 p-4">
            <h1 className="text-2xl font-bold">
              Manage Admins{" "}
              <span className="text-[#F30278] ">({admins?.length})</span>
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
                onPress={() => dispatch(Setopenadmin(!openadmin))}
                isIconOnly
                className="bg-[#F30278]  hover:bg-pink-600"
              >
                <Plus className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
          <Separator className="space-x-2 mx-auto w-[98%]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {adminsStatus === "succeeded" && filteredAdmins?.length === 0 && (
              <div className="flex justify-center items-center h-[80vh] col-span-3">
                <p>No admins Found</p>
              </div>
            )}

            {filteredAdmins?.map(
              (admin) =>
                adminsStatus === "succeeded" && (
                  <Card
                    key={admin._id}
                    className="overflow-hidden shadow-none rounded-none ring-1 ring-gray-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={"/"} alt={admin?.fullName} />
                            <AvatarFallback>{admin?.fullName}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="text-xl font-semibold">
                              {admin.fullName}
                            </h2>
                            <p className="text-green-500">{admin.activate}</p>
                          </div>
                        </div>
                        <Badge className="bg-[#F30278]">
                          {admin?.branch?.location}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{admin.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{admin.phoneNumber}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-6">
                      <Button
                        onPress={() =>
                          {dispatch(Setopenupdateadmin(!openupdateadmin)),dispatch(Setselectedadminid(admin?._id))}
                        }
                        className="px-8 py-0.5 rounded-sm w-full  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                      >
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
        isOpen={openadmin}
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
                Create New Admin
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-auto">
                  <Createadmin />
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
        isOpen={openupdateadmin}
        onOpenChange={openupdateadminhandle}
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
                Update Admin Details
              </ModalHeader>
              <ModalBody>
                <Updateadmin/>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* <Modal
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
      </Modal> */}
    </>
  );
}
