"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayments,
  fetchsinglePayments,
  setSelectedpaymentid,
  selectPayments,
  selectPaymentsError,
  selectPaymentsLoading,
  selectSinglePayment,
  selectSinglePaymentError,
  selectSinglePaymentLoading,
} from "@/lib/Redux/paymentSlice";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RazorpayDatePicker, {
  DateRangePicker,
} from "@/components/Dashboardcomponent/Daterange";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "bookingId",
  "whatsappNumber",
  "Occasionobject",
  "createdAt",
  "method",
  "TotalAmount",
  "actions",
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "BOOKING_ID", uid: "bookingId" },
  { name: "CONTACT", uid: "whatsappNumber" },
  { name: "OCCASION", uid: "Occasionobject" },
  { name: "RECEIVED ON", uid: "createdAt" },
  { name: "METHOD", uid: "method" },
  { name: "AMOUNT", uid: "TotalAmount" },
  { name: "ACTION", uid: "actions" },
];

export default function PaymentsTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const loading = useSelector(selectPaymentsLoading);
  const error = useSelector(selectPaymentsError);
  const date = useSelector((state) => state.payments.dateRange);
  const Selectedpaymentid = useSelector(
    (state) => state.payments.Selectedpaymentid
  );

  const singlePayment = useSelector(selectSinglePayment);
  const singleLoading = useSelector(selectSinglePaymentLoading);
  const singleError = useSelector(selectSinglePaymentError);

  useEffect(() => {
    dispatch(fetchPayments({ from: date?.from, to: date?.to }));
  }, [dispatch, date]);

  useEffect(() => {
    if (Selectedpaymentid) {
      dispatch(fetchsinglePayments(Selectedpaymentid));
    }
  }, [dispatch, Selectedpaymentid]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const formatTimestamp = (timestamp) => {
    const timestampInSeconds = Number(timestamp);
    if (isNaN(timestampInSeconds)) {
      return "Invalid timestamp";
    }
    const date = new Date(timestampInSeconds * 1000);

    if (date.toString() === "Invalid Date") {
      return "Invalid date";
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "short", // 'Mon'
      month: "short", // 'Nov'
      day: "numeric", // '25'
      hour: "numeric", // '1'
      minute: "numeric", // '59'
      hour12: true, // 12-hour format with AM/PM
    }).format(date);

    return formattedDate.toLowerCase();
  };

  const pages = Math.ceil(payments?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(payments) ? [...payments] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user?.bookingDetails?.fullName.toLowerCase().includes(filterValue)
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [payments, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <p className="text-bold text-sm capitalize text-default-500">
            {user?.bookingDetails?.fullName}
          </p>
        );
      case "bookingId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {user?.bookingDetails?.bookingId}
            </p>
          </div>
        );
      case "whatsappNumber":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {user?.bookingDetails?.whatsappNumber}
            </p>
          </div>
        );
      case "Occasionobject":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {user?.bookingDetails?.Occasionobject}
            </p>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {formatTimestamp(user?.created_at)}
            </p>
          </div>
        );
      case "method":
        return (
          <div className="flex flex-col items-start">
            <Chip color="success" size="sm" className="text-white uppercase">
              {" "}
              {user?.method}
            </Chip>
          </div>
        );
      case "TotalAmount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              ₹{(user?.amount / 100).toFixed(2)}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              onPress={() => {
                onOpenChange(!isOpen), dispatch(setSelectedpaymentid(user?.id));
              }}
              size="sm"
              className="rounded-sm text-xs  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              View Details
            </Button>{" "}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    const query = value.target.value;
    if (query.trim()) {
      setFilterValue(query);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 sticky top-0 z-50 bg-white py-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="relative w-full sm:max-w-[40%]">
            <Input
              type="text"
              placeholder="Search by name..."
              value={filterValue}
              onChange={onSearchChange}
              className="pr-8 h-12"
            />
            {filterValue && (
              <Button
                variant="light"
                isIconOnly
                size="sm"
                className="absolute inset-y-0 right-0 px-3 top-2 flex items-center"
                onClick={() => setFilterValue("")}
              >
                <X size={15} className="h-8 w-8 text-pink-700" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <RazorpayDatePicker />

            <Select onValueChange={onRowsPerPageChange}>
              <SelectTrigger className="w-24 h-12">
                <SelectValue placeholder="Rows per page:" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> Rows per page:</SelectLabel>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    payments?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          classNames={{
            wrapper: "gap-0 overflow-visible h-10 p-1 rounded ",
            item: "w-8 h-8 text-small rounded-none bg-transparent",
            cursor: " bg-gradient-to-b shadow-lg from-[#F30278] to-[#F30278]",
          }}
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-[#205093] text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onClick={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            className="bg-[#205093] text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onClick={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["h-screen", "max-w-3xl"],
      th: ["bg-[#004AAD]", "text-white", "border-b", "border-divider","sticky","top-20","z-10"],
      td: [
        "p-4",
        "border-b",
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
      {/* {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner color="danger" />
        </div>
      ) : ( */}
      <Table
        isCompact
        className="px-4"
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        //   selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={
            <div className="flex justify-center items-center ">
              <Spinner color="danger" />
            </div>
          }
          emptyContent={"No Payments found"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        size="3xl"
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
            singleLoading? <ModalBody> <div className="flex justify-center items-center h-80"><Spinner color="danger" /></div></ModalBody> : <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-semibold">
                      {" "}
                      ₹{(singlePayment?.amount / 100).toFixed(2)}
                    </span>
                    <Badge variant="secondary" className="rounded-md">
                      {singlePayment?.captured ? (
                        <Badge className={"bg-green-400"}>captured</Badge>
                      ) : (
                        <Badge className={"bg-red-400"}>not captured</Badge>

                      )}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created on: {formatTimestamp(singlePayment?.created_at)}
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-6 w-full mx-auto">
                  <div className="space-y-6">
                    <div className="rounded-lg border">
                      <div className="bg-muted px-4 py-3 font-semibold">
                        Details
                      </div>
                      <ScrollArea className="h-[400px]">
                        <div className="p-4">
                          <dl className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Payment ID
                              </dt>
                              <dd className="col-span-2 flex items-center gap-2 text-sm">
                                {singlePayment?.id}
                                
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Bank RRN
                              </dt>
                              <dd className="col-span-2 text-sm">
                                {singlePayment?.acquirer_data?.rrn}
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Order ID
                              </dt>
                              <dd className="col-span-2 flex items-center gap-2 text-sm">
                                {singlePayment?.order_id}
                               
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Payment method
                              </dt>
                              <dd className="col-span-2 text-sm">
                                {singlePayment?.method} ({singlePayment?.vpa})
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Customer details
                              </dt>
                              <dd className="col-span-2 space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  {singlePayment?.contact}
                                
                                </div>
                                <div>{singlePayment?.email}</div>
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Total Fee
                              </dt>
                              <dd className="col-span-2 space-y-1 text-sm">
                                <div>₹{(singlePayment?.fee/100).toFixed(2)}</div>
                                <div className="text-muted-foreground">
                                  Razorpay Fee +₹{((singlePayment?.fee - singlePayment?.tax)/100).toFixed(2)}
                                </div>
                                <div className="text-muted-foreground">
                                  GST +₹{(singlePayment?.tax/100).toFixed(2)}
                                </div>
                              </dd>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-muted-foreground">
                                Description
                              </dt>
                              <dd className="col-span-2 text-sm">
                                {singlePayment?.description}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </> 
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
