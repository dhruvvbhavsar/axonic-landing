"use client"
import * as React from "react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { products } from "@/lib/products-data"
import Link from "next/link"
import { getProductSubdomainUrl } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AIPlatformPage() {
  // Sort products by ID to maintain consistent order
  const productsWithAiImage = products.filter(product => product.aiImage)
  productsWithAiImage.sort((a, b) => a.id - b.id);

  // Limit to first 8 products for a cleaner circle layout
  const displayedProducts = productsWithAiImage.slice(0, 11)

  // Filter products that have video URLs for testimonials
  const productsWithVideos = productsWithAiImage.filter(product => product.videoUrl).slice(0, 13)

  console.log(productsWithVideos)

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

  // Helper function to extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

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
      <PageHeader title="AI Platform" />

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-16">
      Our AI Suite of Products
      </h2>

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

      {/* Product Videos Testimonials Section */}
      {productsWithVideos.length > 0 && (
        <section className="w-full py-20 bg-white">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                See Our AI Products in Action
              </h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Watch how our AI-powered healthcare solutions are transforming patient care and clinical workflows.
              </p>
            </div>

            {/* Video Carousel */}
            <div className="max-w-6xl mx-auto">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  startIndex: 0,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {productsWithVideos.map((product) => {
                    const videoId = getYouTubeVideoId(product.videoUrl)
                    return (
                      <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <div className="group">
                          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="aspect-[9/16] relative">
                              {videoId ? (
                                <iframe
                                  src={`https://www.youtube.com/embed/${videoId}`}
                                  title={`${product.name} Demo Video`}
                                  className="absolute inset-0 w-full h-full rounded-2xl"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center rounded-2xl">
                                  <p className="text-gray-500 text-sm">Video unavailable</p>
                                </div>
                              )}
                            </div>
                            {/* Product info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={product.logo}
                                  alt={`${product.name} logo`}
                                  width={40}
                                  height={16}
                                  className="object-contain"
                                />
                                <h3 className="text-white font-semibold text-sm">{product.name}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-12 lg:-left-16 size-10 md:size-12 hover:size-12 md:hover:size-14 transition-all duration-200 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200 hover:border-yellow-500" />
                <CarouselNext className="-right-4 md:-right-12 lg:-right-16 size-10 md:size-12 hover:size-12 md:hover:size-14 transition-all duration-200 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200 hover:border-yellow-500" />
              </Carousel>
              
              {/* Navigation Instructions */}
              <div className="text-center mt-8">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <span className="hidden md:inline">Use the arrows to see more product demos</span>
                  <span className="md:hidden">Swipe left or right to see more product demos</span>
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to explore our AI-powered healthcare solutions?
              </p>
              <a
                href="/contact-us"
                className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}