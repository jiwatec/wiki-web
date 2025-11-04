import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductShowcaseProps {
  onBuyClick: () => void;
}

export function ProductShowcase({ onBuyClick }: ProductShowcaseProps) {
  const [selectedColor, setSelectedColor] = useState("White");

  const colors = [
    {
      name: "White",
      hex: "#FFFFFF",
      border: "#E8E8E8",
      image:
        "/white-fan.jpg",
    },
    {
      name: "Black",
      hex: "#1A1A1A",
      border: "#333333",
      image:
        "/black-fan.png",
    },
    {
      name: "Blue",
      hex: "#4A90E2",
      border: "#3575CC",
      image:
        "/blue-fan.png",
    },
  ];

  const priceByColor = {
    White: 29.99,
    Black: 29.99,
    Blue: 34.99,
  };

  const currentColor = colors.find((c) => c.name === selectedColor) || colors[0];
  const currentPrice = priceByColor[selectedColor as keyof typeof priceByColor];

  return (
    <section className="min-h-screen bg-white py-16 px-4 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center justify-items-center mb-16">
          {/* Left: Color Showcase with Visual Display */}
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Product Display */}
            <div className="w-full rounded-3xl border-2 border-[#BAD4AA] p-12 flex items-center justify-center min-h-96 shadow-lg">
              <div className="relative w-full max-w-sm h-100">
                <Image
                  src={currentColor.image || "/placeholder.svg"}
                  alt={`Wiki Portable Fan - ${currentColor.name}`}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Color Selector Buttons */}
            <div className="flex gap-4 flex-wrap justify-center w-full">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative cursor-pointer group transition-transform duration-300 ${
                    selectedColor === color.name ? "scale-110" : "hover:scale-105"
                  }`}
                  style={{ padding: 0, width: "40px", height: "40px" }}
                  aria-label={`Select ${color.name} color`}
                >
                  <div
                    className="w-8 h-8 rounded-full cursor-pointer shadow-md border-4 transition-all"
                    style={{
                      backgroundColor: color.hex,
                      borderColor: selectedColor === color.name ? "#BAD4AA" : color.border,
                      borderWidth: selectedColor === color.name ? "4px" : "2px",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-8 w-full">
            {/* Title & Price */}
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-foreground mb-2">
                {selectedColor} Wiki Fan
              </h3>
              <Button
                onClick={onBuyClick}
                className="bg-[#BAD4AA] hover:bg-[#9ABD89] text-foreground px-4 py-2 text-sm font-bold rounded-lg transition-colors"
              >
                Buy Wiki
              </Button>
            </div>
            <p className="text-3xl font-bold text-[#BAD4AA] mb-4">
              ${currentPrice.toFixed(2)}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Premium portable fan with adjustable speed controls and extended battery life.
              Perfect for outdoor adventures and everyday cooling.
            </p>

            {/* Specifications Box */}
            <div className="bg-[#EBF5DF] rounded-2xl p-6 border-2 border-[#BAD4AA]">
              <h4 className="font-bold text-foreground mb-4 text-lg text-center">
                Specifications
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Battery Options:</span>
                  <span className="font-semibold text-foreground">3600 mAh / 12800 mAh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Charging Port:</span>
                  <span className="font-semibold text-foreground">USB-C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Runtime:</span>
                  <span className="font-semibold text-foreground">Up to 12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Weight:</span>
                  <span className="font-semibold text-foreground">Lightweight & Portable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
