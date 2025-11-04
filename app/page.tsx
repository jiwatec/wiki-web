"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { BuyModal } from "@/components/buy-modal"
import { CheckoutPage } from "@/components/checkout-page"
import { ConfirmationPopup } from "@/components/confirmation-popup"

export default function Home() {
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({
    battery: "3600mAh",
    color: "black",
  })

  const handleBuyClick = () => {
    setShowBuyModal(true)
  }

  const handleProceedToCheckout = (battery: string, color: string) => {
    setSelectedProduct({ battery, color })
    setShowBuyModal(false)
    setShowCheckout(true)
  }

  const handleCheckoutComplete = () => {
    setShowCheckout(false)
    setShowConfirmation(true)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    // Reset to initial state
    setSelectedProduct({ battery: "3600mAh", color: "black" })
  }

  return (
    <main className="bg-background">
      <HeroSection />
      <ProductShowcase onBuyClick={handleBuyClick} />

      {showBuyModal && <BuyModal onClose={() => setShowBuyModal(false)} onProceed={handleProceedToCheckout} />}

      {showCheckout && (
        <CheckoutPage
          selectedProduct={selectedProduct}
          onComplete={handleCheckoutComplete}
          onCancel={() => setShowCheckout(false)}
        />
      )}

      {showConfirmation && <ConfirmationPopup onClose={handleConfirmationClose} />}
    </main>
  )
}
