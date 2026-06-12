"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import abdmImage from "@/public/abdm/abdm.png"
import gdprImage from "@/public/abdm/gdpr.png"
import hippaImage from "@/public/abdm/hippa.png"
import soc2Image from "@/public/abdm/soc-2.png"
import isoImage from "@/public/abdm/iso.png"

const complianceBadges = [
  { src: abdmImage, alt: "ABDM (Ayushman Bharat Digital Mission) Compliance Badge" },
  { src: gdprImage, alt: "GDPR Compliance Badge" },
  { src: hippaImage, alt: "HIPAA Compliance Badge" },
  { src: soc2Image, alt: "SOC 2 Compliance Badge" },
  { src: isoImage, alt: "ISO 27001:2022 Compliance Badge" },
]

export function CTASection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Main CTA Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            Interested in Learning How Axonic Can Transform Your Healthcare Experience?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Leave a message for a strategic consultation, and we'll be happy to connect.
          </p>

          <Link
            href="/contact-us"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Contact Today!
          </Link>
        </div>

        {/* Compliance Badges — same order as AxonMD: ABDM, GDPR, HIPAA, SOC 2, ISO */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center justify-items-center max-w-5xl mx-auto">
          {complianceBadges.map((badge) => (
            <div key={badge.alt} className="flex flex-col items-center group">
              <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 hover:scale-110 transition-transform duration-300">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={144}
                  height={144}
                  className="w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Text */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            Axonic is committed to maintaining the highest standards of data protection, privacy, and security compliance 
            to ensure your healthcare information is always safe and secure.
          </p>
        </div>
      </div>
    </section>
  )
} 