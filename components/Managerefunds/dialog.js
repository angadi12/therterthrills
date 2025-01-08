"use client"

import { Copy, CheckCircle2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function StepItem({ title, description, status }) {
  return (
    <div className="flex items-start space-x-3">
      <div className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
        status === "complete" ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
      )}>
        {status === "complete" ? <CheckCircle2 className="h-4 w-4" /> : "2"}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, copyable = false, className }) {
  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className="flex items-center gap-1 text-muted-foreground">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        {copyable && (
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 text-muted-foreground hover:text-foreground"
            onClick={() => navigator.clipboard.writeText(value)}
          >
            <Copy className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}

export function RefundDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Refund</DialogTitle>
            <Button variant="outline" size="sm">
              Issue refund
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-0 divide-y">
            <InfoRow
              label="Refund ID"
              value="rfnd_PfTb1oXm8SEdDZ"
              copyable
            />
            <InfoRow
              label="ARN/RRN"
              value="10000000000000"
              copyable
            />
            <InfoRow
              label="Amount"
              value="₹ 750.00"
            />
            <InfoRow
              label="Currency"
              value="INR"
            />
            <InfoRow
              label="Refund speed"
              value="Normal"
            />
            <InfoRow
              label="Issued on"
              value="Sun Jan 5, 12:38am"
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Refund Status</h4>
            <div className="space-y-4">
              <StepItem
                title="Refund Initiated"
                description="Refund request has been received and is being processed"
                status="complete"
              />
              <StepItem
                title="Refund Processing"
                description="Takes 3-5 working days"
                status="current"
              />
              <div className="pl-10 text-sm text-muted-foreground">
                Amount will be credited to customer's bank account within 5-7 working days after the refund has processed
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Notes</h4>
            <div className="flex items-center gap-2">
              <span className="font-medium">comment :</span>
              <span>--</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            *Refund amount is deducted from your Razorpay current balance after getting processed
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

