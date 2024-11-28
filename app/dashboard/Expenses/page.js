"use client";
import { Button } from "@nextui-org/react";
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
import { Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setOpenexpense } from "@/lib/Redux/expensesSlice";
import { fetchBranches, setSelectedBranch } from "@/lib/Redux/BranchSlice";
import { fetchtheaterbybranchid } from "@/lib/Redux/theaterSlice";
import { Spinner } from "@nextui-org/react";
import { CreateExpanseapi, UpadteExpenseapi } from "@/lib/API/Expenses";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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

export default function ExpensesTable() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { selectedBranchId } = useSelector((state) => state.branches);
  const setopenexpense = useSelector((state) => state.expenses.setopenexpense);
  const [open, setOpen] = useState(false);
  const branches = useSelector((state) => state.branches.branches);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    branch: "",
    theater: "",
    category: "",
    role: "admin",
  });
  const { branchtheatre, branchtheatreloading, branchtheatreerror } =
    useSelector((state) => state.theater);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const Handleopenexpense = () => {
    dispatch(setOpenexpense(!setopenexpense));
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "branch") {
      dispatch(setSelectedBranch(value));
    }
  };

  useEffect(() => {
    if (formData?.branch) {
      dispatch(fetchtheaterbybranchid(formData?.branch));
    }
  }, [formData?.branch, dispatch]);

  const validateForm = () => {
    const errors = [];
    if (!formData.name) errors.push("Expense name is required.");
    if (!formData.description) errors.push("Description is required.");
    if (!formData.amount || isNaN(Number(formData.amount)))
      errors.push("A valid amount is required.");
    if (!formData.theater) errors.push("Please select a theater.");
    if (!formData.branch) errors.push("Please select a branch.");
    if (!formData.category) errors.push("Please select a category.");

    // Show errors via toast
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      });
      return false;
    }
    return true; // Form is valid
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call the Create Expense API
      const result = await CreateExpanseapi(formData);
      if (result.status === true) {
        toast({
          title: "Success!",
          description: "Expense created successfully!",
          action: <ToastAction altText="Dismiss">Okay</ToastAction>,
        });
        setFormData({
          name: "",
          description: "",
          amount: "",
          branch: "",
          theater: "",
          category: "",
        });
        setLoading(false);
        dispatch(setOpenexpense(!setopenexpense));
      }
    } catch (error) {
      toast({
        title: "Failed to create expense.",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full mx-auto p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Expenses</h1>
            <div className="flex space-x-2">
              <Input type="search" placeholder="Search" className="w-64" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                onClick={Handleopenexpense}
                isIconOnly
                className="bg-[#F30278] hover:bg-pink-600"
              >
                <Plus className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-[#004AAD]">
                <TableRow>
                  <TableHead className="text-white font-medium">Name</TableHead>
                  <TableHead className="text-white font-medium">Date</TableHead>
                  <TableHead className="text-white font-medium">
                    Description
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    Amount
                  </TableHead>
                  <TableHead className="text-white font-medium text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.name}
                    </TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className=" rounded-sm  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
                      >
                        Modify
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <Dialog open={setopenexpense} onOpenChange={Handleopenexpense}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create New Expense
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Fill Expense Details</h3>
            </div>
            <div className="grid gap-4">
              <Input
                placeholder="Expense Name"
                className="border rounded-md"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
                value={formData.category}
              >
                <SelectTrigger className="border rounded-md">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  className="h-12"
                  onValueChange={(value) => handleSelectChange("branch", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches?.map((branch) => (
                      <SelectItem
                        color="primary"
                        variant="flat"
                        key={branch?._id}
                        value={branch?._id}
                      >
                        {branch?.Branchname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) =>
                    handleSelectChange("theater", value)
                  }
                  value={formData.theater}
                >
                  <SelectTrigger
                    id="location-select"
                    className="w-full  h-10 flex items-center gap-2"
                  >
                    <SelectValue placeholder="Select Theater">
                      {branchtheatreloading ? (
                        <Spinner color="danger" size="sm" />
                      ) : (
                        <div className="flex items-center gap-2">
                          {branchtheatre?.find(
                            (theater) => theater?._id === formData?.theater
                          )?.name || "Select Theater"}
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {branchtheatre?.map((theater) => (
                      <SelectItem key={theater?._id} value={theater?._id}>
                        {theater?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
                className="min-h-[100px] border rounded-md"
              />
              <div className="relative">
                <Input
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="Expense Amount"
                  className="border rounded-md pr-6"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  /
                </span>
              </div>
            </div>
            <Button
              onPress={handleSubmit}
              isLoading={loading}
              className="px-8 py-0.5 rounded-sm w-48  border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Add Expense
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
