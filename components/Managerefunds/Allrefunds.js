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
  User,
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
import { fetchAllRefunds, fetchRefundDetails } from "@/lib/Redux/RefundSlice";
import { selectDateRange } from "@/lib/Redux/BookingdateSlice";
import { fetchBranches } from "@/lib/Redux/BranchSlice";
import { CheckCircle2, Hourglass } from "lucide-react";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "bookingId",
  "whatsappNumber",
  "Occasionobject",
  "createdAt",
  "payment",
  "TotalAmount",
  "actions",
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: "ID", uid: "id" },
  { name: "OCCASION", uid: "Occasionobject" },
  { name: "BOOKING_ID", uid: "bookingId" },
  { name: "CONTACT", uid: "whatsappNumber" },
  { name: "RECEIVED ON", uid: "createdAt" },
  { name: "PAYMENT ID", uid: "payment" },
  { name: "AMOUNT", uid: "TotalAmount" },
  { name: "ACTION", uid: "actions" },
];

export default function Allrefunds() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const Selectedpaymentid = useSelector(
    (state) => state.payments.Selectedpaymentid
  );
  const { refunds, refundDetails, loading, error } = useSelector(
    (state) => state.refunds
  );
  const singlePayment = useSelector(selectSinglePayment);
  const singleLoading = useSelector(selectSinglePaymentLoading);
  const singleError = useSelector(selectSinglePaymentError);
  const { startDate: reduxStartDate, endDate: reduxEndDate } =
    useSelector(selectDateRange);
  const { selectedBranchId } = useSelector((state) => state.branches);

  console.log("Selectedpaymentid", Selectedpaymentid);
  console.log(refundDetails);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllRefunds({
        BranchId: selectedBranchId,
        startDate: reduxStartDate,
        endDate: reduxEndDate,
      })
    );
  }, [dispatch, selectedBranchId, reduxStartDate, reduxEndDate]);

  useEffect(() => {
    if (Selectedpaymentid) {
      dispatch(fetchRefundDetails(Selectedpaymentid));
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
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    return formattedDate.toLowerCase();
  };

  const pages = Math.ceil(refunds?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(refunds) ? [...refunds] : [];

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
  }, [refunds, filterValue, statusFilter]);

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
      case "Occasionobject":
        return (
          <User
            avatarProps={{
              radius: "sm",
              src: user?.booking?.theater?.images[0],
            }}
            description={user?.booking?.theater?.name}
            name={user?.booking?.Occasionobject}
          >
            {user.email}
          </User>
        );
      case "bookingId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {user?.booking?.bookingId}
            </p>
          </div>
        );
      case "whatsappNumber":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {user?.booking?.whatsappNumber}
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
              {formatTimestamp(user?.refund?.created_at)}
            </p>
          </div>
        );
      case "TotalAmount":
        return (
          <div className="flex flex-col items-start">
            <Chip color="success" size="sm" className="text-white uppercase">
              {" "}
              ₹{(user?.refund?.amount / 100).toFixed(2)}
            </Chip>
          </div>
        );
      case "payment":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-500">
              {user?.refund?.payment_id}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              onPress={() => {
                onOpenChange(!isOpen),
                  dispatch(setSelectedpaymentid(user?.refund?.id));
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
          {/* <div className="flex items-center gap-2">

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
          </div> */}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    refunds?.length,
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
            wrapper: "gap-0 overflow-visible h-10 p-1 rounded z-0 ",
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
      wrapper: ["h-[90vh]", "max-w-3xl"],
      th: [
        "bg-[#004AAD]",
        "text-white",
        "border-b",
        "border-divider",
       
      ],
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

  function StepItem({ title, description, status }) {
    return (
      <div className="flex items-start space-x-3">
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
            status === "complete"
              ? "border-reen-600  bg-green-600 text-primary-foreground"
              : "border-muted-foreground bg-yellow-600 text-primary-foreground border-yellow-500"
          )}
        >
          {status === "complete" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Hourglass className="h-4 w-4" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }

  function InfoRow({ label, value, copyable = false, className }) {
    return (
      <div className={cn("flex items-center justify-between py-2", className)}>
        <div className="flex items-center text-sm gap-1 text-muted-foreground">
          {label}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{value}</span>
          {copyable && (
            <Button
              variant="light"
              isIconOnly
              className="h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => navigator.clipboard.writeText(value)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  const statusMapping = {
    pending: {
      title: "Refund Initiated",
      description: "Refund request has been received and is being processed.",
      icon: "⏳",
      badgeColor: "bg-yellow-400",
    },
    processed: {
      title: "Refund processed",
      description: "Amount will be credited to customer’s bank account within 5-7 working days after the refund has processed.",
      icon: "✅",
      badgeColor: "bg-green-400",
    },
    failed: {
      title: "Refund Failed",
      description:
        "The refund could not be processed. Possible reasons include customer or bank-related issues.",
      icon: "❌",
      badgeColor: "bg-red-400",
    },
  };

  <StepItem
    title={statusMapping[refundDetails?.status]?.title}
    description={statusMapping[refundDetails?.status]?.description}
    status={statusMapping[refundDetails?.status]?.status}
  />;

  const refundSteps = [
    {
      status: "pending",
      title: "Refund Initiated",
      description: "Refund request has been received and is being processed.",
    },
    {
      status: "processing",
      title: "Refund Processing",
      description: "Takes 3-5 working days.",
    },
    {
      status: "processed",
      title: "Refund Completed",
      description: "Amount will be credited to customer’s bank account within 5-7 working days after the refund has processed.",
    },
  ];

  refundSteps.map((step) => (
    <StepItem
      key={step.status}
      title={step.title}
      description={step.description}
      status={refundDetails?.status === step.status ? "current" : "complete"}
    />
  ));

  return (
    <>
      {/* {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner color="danger" />
        </div>
      ) : ( */}
      <Table
        isCompact
        className="px-4 h-[90vh]"
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        //   selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        // topContent={topContent}
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
            <TableRow key={item?.refund?.id}>
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
          {(onClose) =>
            loading ? (
              <ModalBody>
                {" "}
                <div className="flex justify-center items-center h-80">
                  <Spinner color="danger" />
                </div>
              </ModalBody>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold">
                        ₹{(refundDetails?.amount / 100).toFixed(2)}
                      </span>
                      <Badge
                        className={
                          statusMapping[refundDetails?.status]?.badgeColor
                        }
                      >
                        {refundDetails?.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Created on: {formatTimestamp(refundDetails?.created_at)}
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-6">
                    <div className="space-y-0 divide-y">
                      <InfoRow
                        label="Refund ID"
                        value={refundDetails?.id}
                        copyable
                      />
                      <InfoRow
                        label="ARN/RRN"
                        value={refundDetails?.acquirer_data.rrn}
                        copyable
                      />
                      <InfoRow
                        label="Amount"
                        value={(refundDetails?.amount / 100).toFixed(2)}
                      />
                      <InfoRow
                        label="Refund speed"
                        value={refundDetails?.speed_requested}
                      />
                      <InfoRow
                        label="Issued on"
                        value={formatTimestamp(refundDetails?.created_at)}
                      />
                      <InfoRow
                        label="Notes"
                        value={refundDetails?.notes?.reason}
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Refund Status</h4>
                      <div className="space-y-4">
                        {Object.entries(statusMapping).map(
                          ([key, { title, description, icon }]) => (
                            <div
                              key={key}
                              className={`flex items-start gap-3 ${
                                refundDetails?.status === key
                                  ? "text-black"
                                  : "text-gray-400"
                              }`}
                            >
                              <span className="text-lg">{icon}</span>
                              <div>
                                <h5 className="font-medium">{title}</h5>
                                <p className="text-sm">{description}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
}
