"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import image1 from "@/public/assets/image1.png"
import image2 from "@/public/assets/image2.png"
import image3 from "@/public/assets/image3.png"
import image4 from "@/public/assets/image4.png"
import image5 from "@/public/assets/image5.png"

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top row */}
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image1}
                    alt="Healthcare professional with tablet"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image3}
                    alt="Medical consultation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-4 mt-8">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image2}
                    alt="Healthcare team discussion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image4}
                    alt="Medical technology"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Bottom image spanning full width */}
            <div className="relative h-40 rounded-lg overflow-hidden shadow-lg mt-4">
              <Image
                src={image5}
                alt="Medical equipment and consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Redefining All Possibilities in Healthcare:
                </h2>
                <h3 className="text-2xl font-semibold text-gray-800">
                  AxonCare by Axonic
                </h3>
                <div className="w-20 h-1 bg-yellow-500 mt-4"></div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  The current state of healthcare is a harsh reality. Millions lose their 
                  lives each year due to delayed care, limited access, affordability issues, 
                  and even poor quality of service. In India alone, over 2.3 million lives 
                  were lost in 2018 for these very reasons. Globally, the number climbs 
                  to a staggering 5 million. Even developed nations struggle, with 
                  countries like England facing hundreds of needless deaths weekly 
                  from excessive emergency room wait times.
                </p>

                <p>
                  <span className="font-semibold text-gray-900">Axonic is here to disrupt the status quo.</span> We envision a future where 
                  seamless data empowers <span className="font-semibold">everyone</span>, regardless of location, to access 
                  quality healthcare. Our service <span className="font-semibold text-yellow-600">AxonCare</span>, demolishes barriers, 
                  making care accessible, readily available, and affordable. No matter 
                  where you are, AxonCare by Axonic connects you to the care you 
                  deserve.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="https://axoncare.axonichealth.com"
                  target="_blank"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 