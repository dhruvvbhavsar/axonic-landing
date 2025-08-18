"use client"
import * as React from "react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { products, type Product } from "@/lib/products-data"
import Link from "next/link"
import { getProductSubdomainUrl } from "@/lib/utils"


export default function AIPlatformPage() {
  // Sort products by ID to maintain consistent order
  const productsWithAiImage = products.filter(product => product.aiImage)
  productsWithAiImage.sort((a, b) => a.id - b.id);

  // Keep a focused set for layout
  const displayedProducts = productsWithAiImage.slice(0, 12)

  const leftColumn = displayedProducts.filter((_, idx) => idx % 2 === 0)
  const rightColumn = displayedProducts.filter((_, idx) => idx % 2 === 1)



  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="AI Platform" />

      <section
        className="relative w-full flex-1 min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-13rem)]"
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/ai-new.png)", backgroundSize: "80%" }}
        />
        <div className="absolute inset-0 bg-white/0" />

        <div className="relative z-10 h-dvh mx-auto flex items-center  justify-around px-4 sm:px-8">
          {/* Left Column */}
          <div className="hidden md:flex flex-col justify-around h-full w-full max-w-md overflow-y-auto pr-2">
            {leftColumn.map(product => (
              <AIPillCard key={product.id} product={product} align="center" />
            ))}
          </div>

          {/* Right Column */}
          <div className="hidden md:flex flex-col justify-around h-full w-full max-w-md items-end overflow-y-auto pl-2">
            {rightColumn.map(product => (
              <AIPillCard key={product.id} product={product} align="center" />
            ))}
          </div>
        </div>
      </section>
      {/* Mobile stacked list below the background image */}
      <section className="md:hidden w-full px-4 sm:px-8 py-8">
        <div className="w-full max-w-xl mx-auto space-y-6">
          {displayedProducts.map(product => (
            <AIPillCard key={product.id} product={product} align="center" />
          ))}
        </div>
      </section>
    </div>
  )
}

function AIPillCard({ product, align }: { product: Product; align: "left" | "right" | "center" }) {
  const href = getProductSubdomainUrl(product.slug)
  const alignment = align === "right" ? "items-center justify-end text-right" : align === "left" ? "items-center justify-start text-left" : "items-center justify-center text-center"
  const contentAlignment = align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
  const badgeImages = [
    "/assets/ai-badges/badge-blue.png",
    "/assets/ai-badges/badge-green.png",
    "/assets/ai-badges/badge-orange.png",
    "/assets/ai-badges/badge-red.png",
  ]
  const badgeSrc = badgeImages[Math.abs(product.id) % badgeImages.length]

  return (
    <Link href={href} className="group block w-full">
        <div className="relative px-4">
        <Image
          src={badgeSrc}
          alt="AI badge"
          width={40}
          height={40}
          className="h-16 w-16 md:h-16 md:w-16 z-30 object-contain absolute top-1/2 -translate-y-1/2 -left-2"
        />
      <div
        className={`flex ${alignment} w-full gap-6 rounded-full  bg-white backdrop-blur-md shadow-md ring-1 ring-black/10 px-6 py-5 transition-transform duration-200 hover:scale-[1.02] h-[150px] md:h-[180px] overflow-hidden`}
      >
        {product.aiImage && (
          <Image
            src={product.aiImage}
            alt={`${product.name} AI`}
            width={120}
            height={120}
            className="h-24 w-24 md:h-48 md:w-48 rounded-2xl object-contain bg-white/70 p-2"
          />
        )}
        <div className={`flex flex-col ${contentAlignment} flex-1`}> 
          {product.logo && (
            <Image
              src={product.logo}
              alt={`${product.name} logo`}
              width={100}
              height={100}
              className="h-10 md:h-12 w-auto object-contain"
            />
          )}
          {product.shortDescription && (
            <p className="mt-2 text-sm text-gray-800 line-clamp-3">
              {product.shortPunchLine}
            </p>
          )}
        </div>
      </div>
      </div>
    </Link>
  )
}