import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendlyWidget } from "@/components/calendly-widget"
import { ContactForm } from "@/components/contact-form"
import { CallButtonTertiary } from "@/components/call-button-tertiary"
import { ProductTestimonialsSection } from "@/components/product-testimonials-section"
import { getProductBySlug, getAllProductSlugs } from "@/lib/products-data"
import { BackToProductsButton } from "@/components/back-to-products-button"
import ReactPlayerComponent from "./react-player"


interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title={product.name} />

      {/* Hero Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-gray-900">
                  {product.subtitle}
                </h1>
                <div className="w-24 h-1 bg-yellow-400 mb-8"></div>
                <p className="text-lg md:text-xl font-light leading-relaxed mb-10 text-gray-600">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-10 rounded-xl text-base transition-all duration-300 hover:scale-105 shadow-lg">
                      Schedule Demo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Schedule Your {product.name} Demo
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Choose a convenient time slot for your personalized demo
                      </DialogDescription>
                    </DialogHeader>
                    <CalendlyWidget 
                      productName={product.name}
                      calendlyUrl={product.calendlyUrl}
                    />
                    <div className="text-center pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        You can reschedule or cancel your demo anytime before the meeting
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-10 rounded-xl text-base transition-all duration-300 hover:scale-105">
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Get More Information
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Send us a message and we'll get back to you within 24 hours
                      </DialogDescription>
                    </DialogHeader>
                    <ContactForm 
                      productName={product.name}
                    />
                  </DialogContent>
                </Dialog>
                
                <CallButtonTertiary />
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functions Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the powerful capabilities that make our solution stand out
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {product.features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl overflow-hidden hover:-translate-y-2 h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col lg:flex-row h-full min-h-[280px]">
                    {/* Image */}
                    <div className="lg:w-2/5 relative overflow-hidden flex items-center justify-center p-2">
                      <div className="relative w-44 h-44 lg:w-52 lg:h-52 flex-shrink-0">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={208}
                          height={208}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="lg:w-3/5 p-4 lg:p-6 flex flex-col justify-center">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the benefits that set us apart from the competition
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.valuePropositions.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all pt-0 duration-500 border-0 rounded-3xl overflow-hidden h-full hover:-translate-y-3 shadow-lg">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={value.image}
                      alt={value.title}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1 text-base">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-3xl"></div>
            <div className="relative p-12 md:p-16 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {product.ctaText}
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-3xl mx-auto opacity-90">
                {product.ctaSubtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                  Get Started Today
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:scale-105">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <ProductTestimonialsSection 
        testimonialUrl={product.testimonialUrl}
        productName={product.name}
      />

      {/* Back to Products */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="container mx-auto text-center">
          <BackToProductsButton />
        </div>
      </section>
    </div>
  )
} 