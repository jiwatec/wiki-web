"use client"

import { Button } from "@/components/ui/button"

interface ConfirmationPopupProps {
  onClose: () => void
}

export function ConfirmationPopup({ onClose }: ConfirmationPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-card rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Purchase Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for purchasing Wiki. Your order has been confirmed and will be delivered soon.
        </p>

        <div className="bg-background rounded-lg p-4 mb-6 text-left space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Order Status:</span>
            <p className="font-medium text-foreground">Confirmed</p>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Expected Delivery:</span>
            <p className="font-medium text-foreground">5-7 Business Days</p>
          </div>
        </div>

        <Button onClick={onClose} className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold">
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}
