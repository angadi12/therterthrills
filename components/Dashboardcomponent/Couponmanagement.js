"use client";

import { useState } from "react";
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

const initialCoupons = {
  offer: [
    { id: "1", code: "OFFER10", discount: 10, expiryDate: "2023-12-31" },
    { id: "2", code: "OFFER20", discount: 20, expiryDate: "2023-12-31" },
  ],
  theater: [
    { id: "3", code: "THEATER15", discount: 15, expiryDate: "2023-12-31" },
    { id: "4", code: "THEATER25", discount: 25, expiryDate: "2023-12-31" },
  ],
};

export function CouponManagementDialog() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleDelete = (type, id) => {
    setCoupons((prev) => ({
      ...prev,
      [type]: prev[type].filter((coupon) => coupon.id !== id),
    }));
  };

  const handleEdit = (type, coupon) => {
    setEditingCoupon(coupon);
  };

  const handleUpdate = (type) => {
    if (editingCoupon) {
      setCoupons((prev) => ({
        ...prev,
        [type]: prev[type].map((c) =>
          c.id === editingCoupon.id ? editingCoupon : c
        ),
      }));
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
          <TableRow key={coupon.id}>
            <TableCell>{coupon.code}</TableCell>
            <TableCell>{coupon.discount}%</TableCell>
            <TableCell>{coupon.expiryDate}</TableCell>
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
                onClick={() => handleDelete(type, coupon.id)}
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
        <Button className="bg-[#F30278] hover:bg-pink-600 text-white" variant="outline">
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
            <TabsTrigger value="theater">Theater Coupons</TabsTrigger>
          </TabsList>
          <TabsContent value="offer">{renderCouponTable("offer")}</TabsContent>
          <TabsContent value="theater">
            {renderCouponTable("theater")}
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
                value={editingCoupon.code}
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
                value={editingCoupon.discount}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    discount: Number(e.target.value),
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
                value={editingCoupon.expiryDate}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    expiryDate: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <Button
              onClick={() =>
                handleUpdate(
                  editingCoupon.id.startsWith("1") ||
                    editingCoupon.id.startsWith("2")
                    ? "offer"
                    : "theater"
                )
              }
            >
              Update Coupon
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
