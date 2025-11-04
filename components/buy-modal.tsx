"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BuyModalProps {
  onClose: () => void
  onProceed: (battery: string, color: string) => void
}

export function BuyModal({ onClose, onProceed }: BuyModalProps) {
  const [selectedBattery, setSelectedBattery] = useState("3600mAh")
  const [selectedColor, setSelectedColor] = useState("black")

  const handleProceed = () => {
    onProceed(selectedBattery, selectedColor)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-card rounded-lg p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">Customize Your Wiki</h2>

        {/* Battery Selection */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-4">Select Battery Capacity</h3>
          <div className="space-y-3">
            {["3600mAh", "12800mAh"].map((battery) => (
              <button
                key={battery}
                onClick={() => setSelectedBattery(battery)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  selectedBattery === battery
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {battery} Battery
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-4">Select Color</h3>
          <div className="flex gap-3">
            {["black", "blue", "white"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`flex-1 h-12 rounded-lg border-2 transition-all capitalize font-medium ${
                  selectedColor === color
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            className="flex-1 bg-primary hover:bg-accent text-primary-foreground font-semibold"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
