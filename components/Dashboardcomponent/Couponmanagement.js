"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { fetchAllcouponsByoffer } from "@/lib/Redux/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCouponapi, UpadteCouponapi } from "@/lib/API/Coupon";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function CouponManagementDialog() {
  const [coupons, setCoupons] = useState({ offer: [], coupon: [] });
  const [editingCoupon, setEditingCoupon] = useState(null);
  const dispatch = useDispatch();
  const { Allcouponsoffer, Allcouponloading } = useSelector(
    (state) => state.coupon
  );
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllcouponsByoffer());
  }, [dispatch]);

  useEffect(() => {
    if (Allcouponsoffer) {
      const categorizedCoupons = Allcouponsoffer.reduce(
        (acc, coupon) => {
          acc[coupon?.type]?.push(coupon) || (acc[coupon?.type] = [coupon]);
          return acc;
        },
        { offer: [], coupon: [] }
      );
      setCoupons(categorizedCoupons);
    }
  }, [Allcouponsoffer]);

  const handleDelete = async (type, id) => {
    try {
      // Call the API to delete the coupon
      const response = await await DeleteCouponapi(id);

      if (response.status === "success") {
        setCoupons((prev) => ({
          ...prev,
          [type]: prev[type].filter((coupon) => coupon?._id !== id),
        }));
        toast({
          title: `deleted!.`,
          description: `Coupon with id ${id} deleted successfully.`,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        dispatch(fetchAllcouponsByoffer());
      } else {
        toast({
          title: `Failed to delete coupon.`,
          description: "Failed to delete coupon:",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "failed to delete coupon:",
        description: error,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      // Optionally show a toast notification or alert
    }
  };

  const handleEdit = (type, coupon) => {
    setEditingCoupon({ ...coupon, type });
  };

  const handleUpdate = async (type) => {
    if (!editingCoupon) return;

    try {
      const response = await UpadteCouponapi(editingCoupon, editingCoupon?._id);

      if (response.status === "success") {
        setCoupons((prev) => ({
          ...prev,
          [type]: prev[type].map((c) =>
            c?._id === editingCoupon?._id ? editingCoupon : c
          ),
        }));
        toast({
          title: `updated!.`,
          description: "Coupon updated successfully!",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
        dispatch(fetchAllcouponsByoffer());
      } else {
        toast({
          title: `Failed to update coupon.`,
          description: "Failed to update coupon:",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: `Error while updating coupon.`,
        description: "Error while updating coupon.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setEditingCoupon(null);
    }
  };

  const renderCouponTable = (type) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coupons[type].map((coupon) => (
          <TableRow key={coupon?._id}>
            <TableCell>{coupon?.code}</TableCell>
            <TableCell>
              {coupon?.discount?.amount} {coupon?.discount?.type}
            </TableCell>
            <TableCell>
              {new Date(coupon.validUntil).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                variant="light"
                isIconOnly
                onClick={() => handleEdit(type, coupon)}
              >
                <Pencil className="h-4 w-4 text-[#004AAD]" />
              </Button>
              <Button
                variant="light"
                isIconOnly
                onClick={() => handleDelete(type, coupon?._id)}
              >
                <Trash2 className="h-4 w-4 text-[#004AAD]" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[#F30278] hover:bg-pink-600 text-white"
          variant="outline"
        >
          Manage Coupons
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Coupon Management</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="offer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="offer">Offer Coupons</TabsTrigger>
            <TabsTrigger value="coupon">Theater Coupons</TabsTrigger>
          </TabsList>
          <TabsContent value="offer">{renderCouponTable("offer")}</TabsContent>
          <TabsContent value="coupon">
            {renderCouponTable("coupon")}
          </TabsContent>
        </Tabs>
        {editingCoupon && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={editingCoupon?.code}
                onChange={(e) =>
                  setEditingCoupon({ ...editingCoupon, code: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount
              </Label>
              <Input
                id="discount"
                type="number"
                value={editingCoupon?.discount?.amount}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    discount: {
                      ...editingCoupon?.discount,
                      amount: Number(e.target.value),
                    },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiryDate" className="text-right">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={editingCoupon?.validUntil.split("T")[0]}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    validUntil: new Date(e.target.value).toISOString(),
                  })
                }
                className="col-span-3"
              />
            </div>
            <Button
              onClick={() => handleUpdate(editingCoupon?.type)}
              className=" rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
            >
              Update Coupon
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
