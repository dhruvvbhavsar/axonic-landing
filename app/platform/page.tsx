"use client"

import * as React from "react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products-data"
import { getProductSubdomainUrl, getPlatformSubdomainUrl } from "@/lib/utils"
import clsx from "clsx"

// Helper wrapper that renders dashed connector lines to neighbouring nodes.
const ConnectableNode: React.FC<{
  children: React.ReactNode
  className?: string
  hasTop?: boolean
  hasBottom?: boolean
  hasLeft?: boolean
  hasRight?: boolean
}> = ({
  children,
  className,
  hasTop,
  hasBottom,
  hasLeft,
  hasRight,
}) => (
  <div className={clsx("relative", className)}>
    {/* Vertical connectors */}
    {hasTop && (
      <span className="hidden md:block pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-10 border-l-2 border-dashed border-emerald-600 z-0" />
    )}
    {hasBottom && (
      <span className="hidden md:block pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-10 border-l-2 border-dashed border-emerald-600 z-0" />
    )}

    {/* Horizontal connectors */}
    {hasLeft && (
      <span className="hidden md:block pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-24 border-t-2 border-dashed border-emerald-600 z-0" />
    )}
    {hasRight && (
      <span className="hidden md:block pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-24 border-t-2 border-dashed border-emerald-600 z-0" />
    )}

    {/* Actual node */}
    <div className="relative z-10">{children}</div>
  </div>
)

export default function PlatformPage() {
  // Organize products by column based on their target audience
  
  const patientsProducts = [
    products.find(p => p.slug === "axonhealthhub"), // AxonHealthHub
    products.find(p => p.slug === "axoncare"),      // AxonCare
    products.find(p => p.slug === "axondoc"),       // AxonDoc
    products.find(p => p.slug === "axonbuddy"),     // AxonBuddy
  ].filter((product): product is NonNullable<typeof product> => product !== undefined);

  const doctorsProducts = [
    products.find(p => p.slug === "axonmd"),        // AxonMD
    products.find(p => p.slug === "axonscribe"),    // AxonScribe
    products.find(p => p.slug === "axonlife"),      // AxonLife
    products.find(p => p.slug === "axona"),         // AxonA
  ].filter((product): product is NonNullable<typeof product> => product !== undefined);

  const careProvidersProducts = [
    products.find(p => p.slug === "axonhis"),       // AxonHIS
    products.find(p => p.slug === "axonlab"),       // AxonLab
    products.find(p => p.slug === "axonsurge"),     // AxonSurge
    products.find(p => p.slug === "axonpharma"),    // AxonPharma
  ].filter((product): product is NonNullable<typeof product> => product !== undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader title="Our Platform" />

      {/* Main Platform Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AT AXONIC, WE CONNECT HEALTHCARE
            </h2>
          </div>

          {/* Three Main Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">

            {/* Patients Section */}
            <div className="relative z-10 flex flex-col items-center rounded-[28px] bg-orange-50/70 px-6 pt-8 pb-10">

              {/* Column Header */}
              <ConnectableNode
                className="z-10 mb-10"
                hasBottom={patientsProducts.length > 0}
                hasLeft={false}
                hasRight={true}
              >
                <div className="platform-header relative w-64 h-64 rounded-3xl overflow-hidden">
                  <Image
                    src="/assets/platform/patients.png"
                    alt="Patients"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">PATIENTS</h3>
                  </div>
                </div>
              </ConnectableNode>

              {/* Products Column */}
              <div className="relative w-full max-w-[377px]">
                <div className="relative z-10 space-y-10">
                {patientsProducts.map((product, idx) => {
                  const hasTop = true // Header or product above always present
                  const hasBottom = idx < patientsProducts.length - 1
                  const hasLeft = false
                  const hasRight = doctorsProducts[idx] !== undefined

                  return (
                    <ConnectableNode
                      key={product.id}
                      className="w-full"
                      hasTop={hasTop}
                      hasBottom={hasBottom}
                      hasLeft={hasLeft}
                      hasRight={hasRight}
                    >
                      <Card className="platform-card relative z-30 bg-white rounded-[28px] shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-[520px] md:h-[540px] flex items-start">
                        <CardContent className="p-0 text-center w-full">
                          {/* Product Image */}
                          <div className="mb-8 h-64 w-full flex items-center justify-center">
                            <Image
                              src={product.heroImage}
                              alt={product.name}
                              width={300}
                              height={256}
                              className="max-h-full w-auto object-contain"
                            />
                          </div>

                          {/* Product Logo */}
                          <div className="mb-4 flex justify-center">
                            <Image
                              src={product.logo}
                              alt={`${product.name} Logo`}
                              width={200}
                              height={60}
                              className="w-auto max-h-10 md:max-h-12 object-contain"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-base text-gray-900 leading-relaxed font-semibold">
                            {product.shortDescription}
                          </p>
                        </CardContent>
                      </Card>
                    </ConnectableNode>
                  )
                })}
                </div>
              </div>
            </div>

            {/* Doctors Section */}
            <div className="relative z-10 flex flex-col items-center rounded-[28px] bg-orange-50/70 px-6 pt-8 pb-10">

              {/* Column Header */}
              <ConnectableNode
                className="z-10 mb-10"
                hasBottom={doctorsProducts.length > 0}
                hasLeft={true}
                hasRight={true}
              >
                <div className="platform-header relative w-64 h-64 rounded-3xl overflow-hidden">
                  <Image
                    src="/assets/platform/doctors.png"
                    alt="Doctors"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">DOCTORS</h3>
                  </div>
                </div>
              </ConnectableNode>

              {/* Products Column */}
              <div className="relative w-full max-w-[377px]">
                <div className="relative z-10 space-y-10">
                {doctorsProducts.map((product, idx) => {
                  const hasTop = true
                  const hasBottom = idx < doctorsProducts.length - 1
                  const hasLeft = patientsProducts[idx] !== undefined
                  const hasRight = careProvidersProducts[idx] !== undefined

                  return (
                    <ConnectableNode
                      key={product.id}
                      className="w-full"
                      hasTop={hasTop}
                      hasBottom={hasBottom}
                      hasLeft={hasLeft}
                      hasRight={hasRight}
                    >
                      <Card className="platform-card relative z-30 bg-white rounded-[28px] shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-[520px] md:h-[540px] flex items-start">
                        <CardContent className="p-0 text-center w-full">
                          {/* Product Image */}
                          <div className="mb-8 h-64 w-full flex items-center justify-center">
                            <Image
                              src={product.heroImage}
                              alt={product.name}
                              width={300}
                              height={256}
                              className="max-h-full w-auto object-contain"
                            />
                          </div>

                          {/* Product Logo */}
                          <div className="mb-4 flex justify-center">
                            <Image
                              src={product.logo}
                              alt={`${product.name} Logo`}
                              width={200}
                              height={60}
                              className="w-auto max-h-10 md:max-h-12 object-contain"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-base text-gray-900 leading-relaxed font-semibold">
                            {product.shortDescription}
                          </p>
                        </CardContent>
                      </Card>
                    </ConnectableNode>
                  )
                })}
                </div>
              </div>
            </div>

            {/* Care Providers Section */}
            <div className="relative z-10 flex flex-col items-center rounded-[28px] bg-orange-50/70 px-6 pt-8 pb-10">

              {/* Column Header */}
              <ConnectableNode
                className="z-10 mb-10"
                hasBottom={careProvidersProducts.length > 0}
                hasLeft={true}
                hasRight={false}
              >
                <div className="platform-header relative w-64 h-64 rounded-3xl overflow-hidden">
                  <Image
                    src="/assets/platform/care-providers.png"
                    alt="Care Providers"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center">CARE<br/>PROVIDERS</h3>
                  </div>
                </div>
              </ConnectableNode>

              {/* Products Column */}
              <div className="relative w-full max-w-[377px]">
                <div className="relative z-10 space-y-10">
                {careProvidersProducts.map((product, idx) => {
                  const hasTop = true
                  const hasBottom = idx < careProvidersProducts.length - 1
                  const hasLeft = doctorsProducts[idx] !== undefined
                  const hasRight = false

                  return (
                    <ConnectableNode
                      key={product.id}
                      className="w-full"
                      hasTop={hasTop}
                      hasBottom={hasBottom}
                      hasLeft={hasLeft}
                      hasRight={hasRight}
                    >
                      <Card className="platform-card relative z-30 bg-white rounded-[28px] shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-[520px] md:h-[540px] flex items-start">
                        <CardContent className="p-0 text-center w-full">
                          {/* Product Image */}
                          <div className="mb-8 h-64 w-full flex items-center justify-center">
                            <Image
                              src={product.heroImage}
                              alt={product.name}
                              width={300}
                              height={256}
                              className="max-h-full w-auto object-contain"
                            />
                          </div>

                          {/* Product Logo */}
                          <div className="mb-4 flex justify-center">
                            <Image
                              src={product.logo}
                              alt={`${product.name} Logo`}
                              width={200}
                              height={60}
                              className="w-auto max-h-10 md:max-h-12 object-contain"
                            />
                          </div>

                          {/* Description */}
                          <p className="text-base text-gray-900 leading-relaxed font-semibold">
                            {product.shortDescription}
                          </p>
                        </CardContent>
                      </Card>
                    </ConnectableNode>
                  )
                })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sections */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-32">
              <Image
                src="/assets/ourPartners/Insurance.png"
                alt="Insurance Products"
                width={600}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">INSURANCE PRODUCTS</h3>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-lg h-32">
              <Image
                src="/assets/aboutUs/digital-doctor-healthcare-science-medical-remote-technology-concept-1-scaled.png"
                alt="Public Health Government"
                width={600}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white text-center">PUBLIC HEALTH / GOVERNMENT</h3>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
} 