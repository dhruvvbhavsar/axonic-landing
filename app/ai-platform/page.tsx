"use client"
import * as React from "react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { products, type Product } from "@/lib/products-data"
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

  // Keep a focused set for layout
  const displayedProducts = productsWithAiImage.slice(0, 12)

  const leftColumn = displayedProducts.filter((_, idx) => idx % 2 === 0)
  const rightColumn = displayedProducts.filter((_, idx) => idx % 2 === 1)

  const productsWithVideos = productsWithAiImage.filter(product => product.videoUrl).slice(0, 13)

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


  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <PageHeader title="AI Platform" />

      {/* Mobile Heading - Before background image */}
      <div className="md:hidden text-center py-8 px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 uppercase">
          Redefining healthcare with AI intelligence and human touch
        </h2>
      </div>

      <section
        className="relative w-full flex-1 min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-13rem)]"
      >
        {/* Mobile background */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:hidden"
          style={{ 
            backgroundImage: "url(/assets/ai-new.png)",
            backgroundSize: "1200px"
          }}
        />
        {/* Desktop background */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat hidden md:block"
          style={{ 
            backgroundImage: "url(/assets/ai-new.png)",
            backgroundSize: "1800px"
          }}
        />
        <div className="absolute inset-0 bg-white/0" />

        {/* Heading Section - Inside background image (Desktop only) */}
        <div className="relative z-20 text-center py-8 px-4 hidden md:block">
          <h2 className="text-2xl lg:text-3xl bg-amber-400 rounded-full font-bold py-1 text-gray-900 mb-4 uppercase max-w-7xl text-center mx-auto">
            Redefining healthcare with AI intelligence and human touch
          </h2>
        </div>

        <div className="relative z-10 flex items-start justify-between mx-4 md:mx-8  py-8">
          {/* Left Column */}
          <div className="hidden md:flex flex-col w-full max-w-md gap-6 pr-2">
            {leftColumn.map(product => (
              <AIPillCard key={product.id} product={product} align="center" />
            ))}
          </div>

          {/* Right Column */}
          <div className="hidden md:flex flex-col w-full max-w-md items-end gap-6 pl-2">
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

            {/* Product Videos Testimonials Section */}
      {productsWithVideos.length > 0 && (
        <section className="w-full py-20 relative bg-white">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-center bg-no-repeat opacity-40"
            style={{ 
              backgroundImage: "url(/assets/bg-new.png)",
              backgroundSize: "1800px"
            }}
          />
          <div className="relative z-10">
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
        </div>
        </section>
      )}
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
          className="h-[clamp(32px,6vw,64px)] w-[clamp(32px,6vw,64px)] z-30 object-contain absolute top-1/2 -translate-y-1/2 -left-[clamp(4px,1.2vw,8px)]"
        />
      <div
        className={`flex ${alignment} w-full rounded-full bg-white backdrop-blur-md shadow-md ring-1 ring-black/10 transition-transform duration-200 hover:scale-[1.02] overflow-hidden gap-[clamp(1rem,2.2vw,2rem)] px-[clamp(1rem,2.5vw,2rem)] py-[clamp(0.75rem,2vw,1.25rem)] h-[clamp(100px,20vw,160px)]`}
      >
        {product.aiImage && (
          <Image
            src={product.aiImage}
            alt={`${product.name} AI`}
            width={120}
            height={120}
            className="h-[clamp(64px,12vw,160px)] w-[clamp(64px,12vw,160px)] rounded-2xl object-contain bg-white/70 p-2"
          />
        )}
        <div className={`flex flex-col ${contentAlignment} flex-1`}> 
          {product.logo && (
            <Image
              src={product.logo}
              alt={`${product.name} logo`}
              width={100}
              height={100}
              className="h-[clamp(28px,4vw,48px)] w-auto object-contain"
            />
          )}
          {product.shortDescription && (
            <p className="mt-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.85rem,1vw,1rem)] text-gray-800 line-clamp-3">
              {product.shortPunchLine}
            </p>
          )}
        </div>
      </div>
      </div>
    </Link>
  )
}