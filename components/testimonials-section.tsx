"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function TestimonialsSection() {
  // Convert YouTube URLs to embed format
  const testimonials = [
    {
      id: 1,
      embedUrl: "https://youtube.com/embed/amo_RnMSuKY",
      title: "Patient Testimonial 1"
    },
    {
      id: 2,
      embedUrl: "https://youtube.com/embed/2OPJaJoi0Gs",
      title: "Patient Testimonial 2"
    },
    {
      id: 3,
      embedUrl: "https://youtube.com/embed/XalSjho8J5Q",
      title: "Patient Testimonial 3"
    },
    {
      id: 4,
      embedUrl: "https://youtube.com/embed/AQmvWNxE-XM",
      title: "Patient Testimonial 4"
    },
    {
      id: 5,
      embedUrl: "https://youtube.com/embed/xaVclNCE4BY",
      title: "Patient Testimonial 5"
    },
    {
      id: 6,
      embedUrl: "https://youtube.com/embed/qrCEQBEdrC4",
      title: "Patient Testimonial 6"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Trusted by Patients. Backed by Doctors. See What They're Saying.
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Trusted by Patients. Backed by Doctors. See What They're Saying.
          </p> */}
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
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="group">
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="aspect-[9/16] relative">
                        <iframe
                          src={testimonial.embedUrl}
                          title={testimonial.title}
                          className="absolute inset-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 lg:-left-16 size-10 md:size-12 hover:size-12 md:hover:size-14 transition-all duration-200 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200 hover:border-yellow-500" />
            <CarouselNext className="-right-4 md:-right-12 lg:-right-16 size-10 md:size-12 hover:size-12 md:hover:size-14 transition-all duration-200 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200 hover:border-yellow-500" />
          </Carousel>
          
          {/* Navigation Instructions */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="hidden md:inline">← Use the arrows to see more testimonials →</span>
              <span className="md:hidden">Swipe left or right to see more testimonials</span>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to experience the difference? Join thousands of satisfied patients.
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