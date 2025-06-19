"use client"

import * as React from "react"

export function TestimonialsSection() {
  // Convert YouTube URLs to embed format
  const testimonials = [
    {
      id: 1,
      embedUrl: "https://www.youtube.com/embed/qrCEQBEdrC4",
      title: "Patient Testimonial 1"
    },
    {
      id: 2,
      embedUrl: "https://www.youtube.com/embed/AQmvWNxE-XM",
      title: "Patient Testimonial 2"
    },
    {
      id: 3,
      embedUrl: "https://www.youtube.com/embed/2OPJaJoi0Gs",
      title: "Patient Testimonial 3"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hear directly from our patients about their experiences with our healthcare solutions and how we've made a difference in their lives.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group">
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
          ))}
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