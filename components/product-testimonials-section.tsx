"use client"

import * as React from "react"

interface ProductTestimonialsSectionProps {
  testimonialUrl: string
  productName: string
}

export function ProductTestimonialsSection({ testimonialUrl, productName }: ProductTestimonialsSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Patients. Backed by Doctors. See What They're Saying.
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear directly from healthcare professionals and patients about their experience with {productName}.
          </p>
        </div>

        {/* Single Video */}
        <div className="max-w-md mx-auto">
          <div className="group">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-[9/16] relative">
                <iframe
                  src={testimonialUrl}
                  title={`${productName} Testimonial`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to experience the difference with {productName}? Join thousands of satisfied users.
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
} 