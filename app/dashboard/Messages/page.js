"use client";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import Contactdaterange from "@/components/Contactuscomponents/Contactdaterange";
import { fetchContactsByDateRange } from "@/lib/Redux/contactSlice";
import { Spinner } from "@nextui-org/react";
import { Send,Trash2} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BaseUrl } from "@/lib/API/Baseurl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import {Deleteticket} from "@/lib/API/Contact"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import moment from "moment";

export default function MessagesSection() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(""); // Added state for recipient email
  const [ticketId, setRticketId] = useState(""); // Added state for recipient email
  const [loadingstate, Setloadingstate] = useState(false);
const [isDelete,setIsDelete]=useState(false)
const [delteloading, setDeleteloading] = useState(false);

  const defaultFromDate = moment().subtract(7, "days");
  const defaultToDate = moment();

 const [startDate, setStartDate] = useState(defaultFromDate);
  const [endDate, setEndDate] = useState(defaultToDate);


  const handleFetch = () => {
    const from = startDate ? moment(startDate).format("YYYY-MM-DD") : null;
    const to = endDate ? moment(endDate).format("YYYY-MM-DD") : null;
    dispatch(fetchContactsByDateRange({ from, to }));
  };

  // useEffect(() => {
  //   dispatch(fetchContactsByDateRange({ from: null, to: null }));
  // }, [dispatch]);
  useEffect(() => {
    handleFetch(); 
  }, []);
  // const filteredContacts = contacts.filter((contact) =>
  //   `${contact.firstName} ${contact.lastName}`
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase())
  // );

  // const EmailDialog = () => (
  //   <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
  //     <ModalContent className="sm:max-w-[525px]">
  //       <ModalHeader>
  //         <p>Send Email</p>
  //       </ModalHeader>
  //       <div className="grid gap-4 py-4">
  //         <div className="grid gap-2">
  //           <Label htmlFor="recipient">To</Label>
  //           <Input
  //             id="recipient"
  //             value={recipientEmail} // Set recipient email
  //             className="bg-muted"
  //           />
  //         </div>
  //         <div className="grid gap-2">
  //           <Label htmlFor="subject">Subject</Label>
  //           <Input
  //             id="subject"
  //             value={subject}
  //             onChange={(e) => setSubject(e.target.value)}
  //             placeholder="Enter email subject"
  //           />
  //         </div>
  //         <div className="grid gap-2">
  //           <Label htmlFor="message">Message</Label>
  //           <Textarea
  //             id="message"
  //             value={message}
  //             onChange={(e) => setMessage(e.target.value)}
  //             placeholder="Type your message here"
  //             className="h-32"
  //           />
  //         </div>
  //       </div>
  //       <div className="flex justify-end gap-3">
  //           <Button onPress={()=>setIsModalOpen(!isModalOpen)} variant="solid" color="danger">
  //             Cancel
  //           </Button>
  //         <Button
  //         isLoading={loadingstate}
  //           onClick={handleSendEmail}
  //           className="px-8 py-0.5 rounded-sm w-48 border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
  //         >
  //           <Send className="w-4 h-4 mr-2" />
  //           Send Email
  //         </Button>
  //       </div>
  //     </ModalContent>
  //   </Modal>
  // );

  const handleSendEmail = async () => {
    Setloadingstate(true);
    // Construct the email data to send to the backend
    const emailData = {
      recipientEmail,
      subject,
      message,
      ticketId,
    };

    try {
      // Send the email data to the backend API
      const response = await fetch(`${BaseUrl}/Contact/send-ticket-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Email sent successfully!",
          description: "Email sent successfully!",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setIsModalOpen(false);
        setSubject("");
        setMessage("");
        Setloadingstate(false);
      } else {
        toast({
          title: "Error sending email",
          description:  result.message,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        Setloadingstate(false);
      }
    } catch (error) {
      toast({
        title: "Error sending email",
        description:  error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });      Setloadingstate(false);
    }
  };

  const handleReplyClick = (contactEmail, id) => {
    setRecipientEmail(contactEmail); // Set recipient email when the "Reply" button is clicked
    setRticketId(id);
    setIsModalOpen(true); // Open the modal
  };



  const Deletehandle = async (Branchid) => {
    setDeleteloading(true);
    try {
      const response = await Deleteticket(Branchid);
      if (response.status === "success") {
        toast({
          title: "Deleted!",
          description: "message has been deleted",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        setDeleteloading(false);
        setIsDelete(!isDelete);
        dispatch(fetchContactsByDateRange({ from: null, to: null }));
      }
    } catch (error) {
      toast({
        title: "Failed to delete message",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setDeleteloading(false);
    }
  };



  return (
    <>
      <section className="w-full mx-auto bg-white h-screen">
        <div className="flex justify-between items-center py-4 sticky top-0 bg-white z-50 p-4">
          <h1 className="text-2xl font-bold">
            Messages <span className="text-pink-500">({contacts?.length})</span>
          </h1>
          <div className="flex space-x-2">
            <Contactdaterange />
          </div>
        </div>

        <div className="space-y-4 p-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner color="danger" />
            </div>
          ) : contacts?.length === 0 ? (
            <p className="text-center text-gray-500">No messages found.</p>
          ) : (
            <Accordion className="space-y-4" type="single" collapsible>
              {contacts?.map((contact) => (
                <AccordionItem
                  key={contact?._id}
                  value={contact?._id}
                  className="bg-white ring-1 ring-gray-200 rounded-lg shadow"
                >
                  <AccordionTrigger className="hover:no-underline [&[data-state=open]]:border-b">
                    <div className="flex items-center justify-between w-full px-4 py-2">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            alt={contact?.firstName}
                          />
                          <AvatarFallback>
                            {contact?.firstName?.charAt(0)}
                            {contact?.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="font-semibold">
                            {contact?.firstName} {contact?.lastName}
                          </h2>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />+
                            {contact?.mobileNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-[#F30278]">
                          <Mail className="h-4 w-4 inline mr-1" />
                          {contact?.email}
                        </div>
                        <div className="text-sm text-[#F30278]">
                          {contact?.occasion}
                        </div>
                        <div className="text-sm text-[#F30278]">
                           <Button onClick={()=>{setIsDelete(!isDelete),setRticketId(contact?._id)}} isIconOnly className="text-[#F30278] bg-white ring-1 ring-[#F30278] rounded-sm">
                           <Trash2 />
                           </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 pb-4">
                      <p className="text-gray-700 py-4">
                        {contact?.details || "No message provided"}
                      </p>
                      <Button
                        onClick={() =>
                          handleReplyClick(contact?.email, contact?._id)
                        } // Pass the contact's email
                        className="px-8 py-0.5 rounded-sm w-48 border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_ rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                      >
                        Reply
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">To</Label>
              <Input
                id="recipient"
                value={recipientEmail} // Set recipient email
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
                className="h-32"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <DialogTrigger asChild>
              <Button variant="solid" color="danger">
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              isLoading={loadingstate}
              onClick={handleSendEmail}
              className="px-8 py-0.5 rounded-sm w-48 border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                    Deletehandle(ticketId);
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
