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
import { fetchContactsByDateRange } from "@/lib/Redux/contactSlice"; // Adjust this import based on your redux slice location
import { Spinner } from "@nextui-org/react"; // Replace with your spinner component

export default function MessagesSection() {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contacts); // Access contacts and loading state
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch contacts when the component mounts
  useEffect(() => {
    dispatch(fetchContactsByDateRange({ from: null, to: null })); // Fetch all contacts initially
  }, [dispatch]);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full mx-auto bg-white h-screen">
      <div className="flex justify-between items-center py-4 sticky top-0 bg-white z-50 p-4">
        <h1 className="text-2xl font-bold">
          Messages{" "}
          <span className="text-pink-500">({filteredContacts?.length})</span>
        </h1>
        <div className="flex space-x-2">
          <Contactdaterange />
          {/* <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2"
          /> */}
        </div>
      </div>

      <div className="space-y-4 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spinner color="danger" />
          </div>
        ) : filteredContacts?.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          <Accordion className="space-y-4" type="single" collapsible>
            {filteredContacts?.map((contact) => (
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
                          src="/placeholder.svg"
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
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-4">
                    <p className="text-gray-700 py-4">
                      {contact?.details || "No message provided"}
                    </p>
                    <Button className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
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
  );
}
