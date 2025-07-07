"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { products } from "@/lib/products-data"
import { getProductSubdomainUrl } from "@/lib/utils"

export default function OurProductsPage() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // React.useEffect(()=>{
  //   products = 
  // },[])
  products.sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader title="Our Products" />

      {/* First Image Section */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/assets/image1.png"
              alt="Healthcare Innovation"
              width={1200}
              height={600}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent flex items-center">
              <div className="p-8 md:p-12 text-white max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Transforming Healthcare Technology
                </h2>
                <div className="w-20 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                  Discover our comprehensive suite of healthcare solutions designed to revolutionize patient care and streamline medical workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Products Carousel Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          

          <div className="mx-auto w-[80%] sm:w-full flex flex-col items-center">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 3,
              }}
              className="w-[96%] md:w-full mb-6"
            >
              <CarouselContent className="-ml-6 sm:-ml-6">
                {products.map((product) => (
                  <CarouselItem key={product.id} 
                  // className="pl-2 sm:pl-6 md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                  className="pl-2 sm:pl-6 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                  >
                    <Card className="h-full p-0 duration-300 rounded-xl">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-t-xl">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={400}
                            height={200}
                            className="w-full h-48 md:h-52 object-cover"
                          />
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Product Logo */}
                          <div className="mb-6 flex justify-center">
                            <div className="h-20 flex items-center justify-center">
                              <Image
                                src={product.logo}
                                alt={`${product.name} Logo`}
                                width={160}
                                height={80}
                                className="max-h-16 w-auto object-contain"
                              />
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1 text-center">
                            {product.shortDescription}
                          </p>
                          
                          {/* Know More Button */}
                          <Link href={product.redirectUrl || getProductSubdomainUrl(product.slug)}>
                            <Button 
                              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            {/* Carousel Dots */}
            <div className="flex space-x-1.5">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === current - 1
                      ? 'bg-yellow-500 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Third Image Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/assets/image3.png"
              alt="Healthcare Future"
              width={1200}
              height={600}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900/90 to-transparent flex items-center justify-end">
              <div className="p-8 md:p-12 text-white max-w-2xl text-right">
                <h2 className="text-lg sm:text-3xl md:text-4xl font-bold mb-4">
                  Building the Future of Healthcare
                </h2>
                <div className="w-20 h-1 bg-yellow-500 mb-6 ml-auto"></div>
                <p className="text-sm sm:text-lg md:text-xl opacity-90 leading-relaxed">
                  Join us in our mission to create innovative healthcare solutions that improve patient outcomes and empower healthcare professionals worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
