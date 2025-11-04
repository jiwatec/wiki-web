"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CheckoutPageProps {
  selectedProduct: { battery: string; color: string }
  onComplete: () => void
  onCancel: () => void
}

export function CheckoutPage({ selectedProduct, onComplete, onCancel }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const basePrice = 2999
  const codCharge = paymentMethod === "cod" ? 50 : 0
  const totalPrice = basePrice + codCharge

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-card rounded-lg p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">Checkout</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Order Summary */}
          <div className="bg-background rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product:</span>
                <span className="text-foreground">Wiki Portable Fan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Battery:</span>
                <span className="text-foreground">{selectedProduct.battery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color:</span>
                <span className="text-foreground capitalize">{selectedProduct.color}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground">₹{basePrice}</span>
              </div>
              {codCharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">COD Charge:</span>
                  <span className="text-foreground">₹{codCharge}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Billing Form */}
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.address ? "border-red-500" : "border-border"
                }`}
                placeholder="123 Main St, City, State, ZIP"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </form>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { id: "credit-card", label: "Credit Card" },
              { id: "debit-card", label: "Debit Card" },
              { id: "upi", label: "UPI" },
              { id: "cod", label: "COD (+₹50)" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all font-medium text-left ${
                  paymentMethod === method.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Details (shown for non-COD) */}
        {paymentMethod !== "cod" && (
          <div className="bg-background rounded-lg p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleCheckout}
            className="flex-1 bg-primary hover:bg-accent text-primary-foreground font-semibold"
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  )
}
