"use client"
import * as React from "react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { products } from "@/lib/products-data"
import Link from "next/link"
import { getProductSubdomainUrl } from "@/lib/utils"

export default function AIPlatformPage() {
  // Sort products by ID to maintain consistent order
  const productsWithAiImage = products.filter(product => product.aiImage)
  productsWithAiImage.sort((a, b) => a.id - b.id);

  // Limit to first 8 products for a cleaner circle layout
  const displayedProducts = productsWithAiImage.slice(0, 8)

  // =====================
  // Tweaking variables
  // =====================
  // 1) Size of the central AI circle (in viewport-width units)
  //    e.g. 60 produces a 60vw × 60vw circle on large screens (capped by max-width below)
  const CIRCLE_SIZE_VW = 40 // tweak here

  // 2) Radius of the imaginary circle on which the product nodes sit (percentage of container)
  const RADIUS_PERCENT = 50 // tweak here

  // 3) Diameter of each product node in pixels (desktop/tablet)
  const NODE_DIAMETER_PX = 160 // tweak here

  // 4) Diameter for mobile nodes
  const MOBILE_NODE_DIAMETER_PX = 120 // tweak here

  // Small reusable component for product circle
  const NodeCard = ({ product, diameter }: { product: typeof displayedProducts[number]; diameter: number }) => (
    <div
      className="bg-white rounded-full shadow-2xl hover:shadow-3xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 overflow-hidden"
      style={{ width: diameter, height: diameter, padding: diameter * 0.08 }}
    >
      {/* Top graphic */}
      <div className="relative w-full flex-1">
        <Image
          src={(product.aiImage ?? product.heroImage) as string}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Logo */}
      <Image src={product.logo} alt={`${product.name} logo`} width={60} height={24} className="object-contain my-1" />

      {/* Description (hidden on mobile) */}
      <p className="text-[10px] font-bold leading-tight px-2 pb-2 hidden xl:block line-clamp-2">
        {product.shortPunchLine || product.shortDescription}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Page Header */}
      <PageHeader title="Our AI Platform" />

      {/* Hero Circle Section (desktop / tablet) */}
      <section className="relative hidden md:flex items-center justify-center w-full py-20 md:py-28 lg:py-32 px-4">
        {/* Scale wrapper for mobile responsiveness */}
        <div className="transform scale-75 sm:scale-90 md:scale-100">

          {/* Container that defines the relative positioning context */}
          <div
            className="relative max-w-[900px]"
            style={{ width: `min(${CIRCLE_SIZE_VW}vw, 900px)`, aspectRatio: "1 / 1" }} // square container
          >
            {/* Central AI circle image */}
            <Image
              src="/assets/ai-circle.png"
              alt="AI"
              fill
              priority
              className="object-contain select-none pointer-events-none"
            />

            {/* Product nodes positioned around the circle */}
            {displayedProducts.map((product, index) => {
              const angleDeg = (index / displayedProducts.length) * 360
              const angleRad = (angleDeg * Math.PI) / 180
              const x = Math.cos(angleRad) * RADIUS_PERCENT
              const y = Math.sin(angleRad) * RADIUS_PERCENT

              return (
                <Link
                  key={product.id}
                  href={getProductSubdomainUrl(product.slug)}
                  className="absolute"
                  style={{
                    top: `calc(50% + ${y}%)`,
                    left: `calc(50% + ${x}%)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="bg-white rounded-full shadow-2xl hover:shadow-3xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 overflow-hidden"
                    style={{ width: NODE_DIAMETER_PX, height: NODE_DIAMETER_PX, padding: NODE_DIAMETER_PX * 0.08 }}
                  >
                    {/* Top graphic */}
                    <div className="relative w-full flex-1">
                      <Image
                        src={product.aiImage as string}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Logo */}
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={70}
                      height={28}
                      className="object-contain my-1"
                    />

                    {/* Description */}
                    <p className="text-[10px] font-bold leading-tight px-3 pb-2 hidden xl:block line-clamp-2">
                      {product.shortPunchLine}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>{/* end scale wrapper */}
        </div>
      </section>

      {/* Mobile layout */}
      <section className="md:hidden w-full px-4 py-12 flex flex-col items-center">
        {/* AI Circle image on top */}
        <div className="relative w-[70vw] max-w-xs aspect-square mb-10">
          <Image src="/assets/ai-circle.png" alt="AI" fill className="object-contain" />
        </div>

        {/* Two-column grid of product nodes */}
        <div className="grid grid-cols-2 gap-6 justify-items-center w-full max-w-md">
          {displayedProducts.map((product) => (
            <Link key={product.id} href={getProductSubdomainUrl(product.slug)}>
              <NodeCard product={product} diameter={MOBILE_NODE_DIAMETER_PX} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}