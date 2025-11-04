"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function HeroSection() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const totalScroll = window.innerHeight
      const scrollPercent = Math.min(scrollTop / totalScroll, 1)
      setRotation(scrollPercent * 360)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full max-w-6xl">
        {/* Rotating 3D Fan Animation */}
        <div className="flex-1 flex justify-center">
          <div
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
              perspective: "1000px",
              transition: "transform 0.05s linear",
            }}
            className="w-64 h-64 md:w-80 md:h-80"
          >
            {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_tewfsftewfsftewf%281%29-zAFBjX1JTlNOKnhxl7wFQm4YkYPSGs.png"
              alt="Wiki Portable Fan - Black"
              width={320}
              height={320}
              className="w-full h-full object-contain"
            /> */}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">Wiki</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Experience portable cooling perfection. Compact, powerful, and elegantly designed.
          </p>
          <p className="text-sm text-muted-foreground">Scroll to explore the full product</p>
        </div>
      </div>
    </div>
  )
}
