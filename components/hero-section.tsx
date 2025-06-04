"use client"

import * as React from "react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-white max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-yellow-400">
              Healthcare Accessible Anytime, Anywhere, In Any Language
            </h1>

            {/* Call to Action Button */}
            <Link
              href="/about"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 