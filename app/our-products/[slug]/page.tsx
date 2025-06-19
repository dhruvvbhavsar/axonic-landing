import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ContactForm } from "@/components/contact-form"
import { getProductBySlug, getAllProductSlugs } from "@/lib/products-data"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                  {product.subtitle}
                </h1>
                <div className="w-24 h-1 bg-yellow-400 mb-8"></div>
                <p className="text-xl md:text-2xl font-light leading-relaxed mb-10 text-gray-600">
                  {product.description}
                </p>
              </div>
              {product.redirectUrl ? (
                <Link href={product.redirectUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                    {product.ctaText}
                  </Button>
                </Link>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                      {product.ctaText}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Get Started with {product.name}
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Fill out the form below and our team will get back to you within 24 hours to discuss how {product.name} can transform your healthcare operations.
                      </DialogDescription>
                    </DialogHeader>
                    <ContactForm 
                      productName={product.name}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Right Video */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-2xl">
                <ReactPlayerComponent product={product} />  
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functions Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the powerful capabilities that make our solution stand out
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {product.features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl overflow-hidden hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Image */}
                    <div className="lg:w-2/5 relative overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={300}
                        height={200}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the benefits that set us apart from the competition
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.valuePropositions.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl overflow-hidden h-full hover:-translate-y-3 shadow-lg">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1 text-lg">
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

      {/* Back to Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="container mx-auto text-center">
          <Link href="/our-products">
            <Button variant="outline" className="font-medium py-3 px-8 rounded-xl text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              ← Back to All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
} 