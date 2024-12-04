"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DatePickerWithRange } from "@/components/Dashboardcomponent/Daterangecoupon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const CouponOfferForm = () => {
  const [type, setType] = useState("coupon");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <ScrollArea>
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle>Add Coupon or Offer</CardTitle>
        <CardDescription>
          Create a new coupon for a specific theater or an offer code for the
          site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="coupon"
              onValueChange={(value) => setType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="coupon" id="coupon" />
                <Label htmlFor="coupon">Coupon (Theater-specific)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="offer" id="offer" />
                <Label htmlFor="offer">Offer (Site-wide)</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              {/* <Label htmlFor="code">Code</Label> */}
              <Input id="code" placeholder="Enter coupon or offer code" />
            </div>

            {type === "coupon" && (
              <div className="space-y-2">
                {/* <Label htmlFor="theater">Theater</Label> */}
                <Select>
                  <SelectTrigger id="theater">
                    <SelectValue placeholder="Select a theater" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theater1">Theater 1</SelectItem>
                    <SelectItem value="theater2">Theater 2</SelectItem>
                    <SelectItem value="theater3">Theater 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              {/* <Label htmlFor="description">Description</Label> */}
              <Textarea id="description" placeholder="Enter description" />
            </div>

            <div className="grid grid-cols-2 w-full items-center">
              {/* <Label htmlFor="discount">Discount</Label> */}
              <div className="flex items-center space-x-2">
                <Input
                  id="discount"
                  type="number"
                  placeholder="Enter discount amount"
                />
                <Select defaultValue="percentage">
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">%</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Valid Period</Label>
              <DatePickerWithRange/>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="px-8 py-0.5 rounded-sm   border-none hover:bg-[#004AAD] bg-[#004AAD] border-black dark:border-white uppercase text-white  transition duration-200 text-sm shadow-[1px_1px_#F30278,1px_1px_#F30278,1px_1px_#F30278,2px_2px_#F30278,2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          type="submit"
        >
          Create {type === "coupon" ? "Coupon" : "Offer"}
        </Button>
      </CardFooter>
    </Card>

    </ScrollArea>
  );
};

export default CouponOfferForm;
