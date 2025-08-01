"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products-data"
import { getProductSubdomainUrl, getPlatformSubdomainUrl } from "@/lib/utils"

export default function PlatformPage() {
  // Sort products by ID to maintain consistent order
  products.sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader title="Our Platform" />


      {/* Products Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Complete Healthcare Ecosystem
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From hospital management to patient care, our integrated platform provides comprehensive solutions for every aspect of healthcare delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="h-full p-0 duration-300 rounded-xl hover:shadow-lg transition-all">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Product Logo */}
                    <div className="mb-4 flex justify-center">
                      <div className="h-16 flex items-center justify-center">
                        <Image
                          src={product.logo}
                          alt={`${product.name} Logo`}
                          width={120}
                          height={60}
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                      {product.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 text-center">
                      {product.shortDescription}
                    </p>
                    
                    {/* Learn More Button */}
                    <Link href={product.redirectUrl || getProductSubdomainUrl(product.slug)}>
                      <Button 
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 