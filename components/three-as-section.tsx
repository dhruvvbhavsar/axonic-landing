"use client"

import * as React from "react"
import { Users, Globe, MapPin } from "lucide-react"
import Link from "next/link"

export function ThreeAsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-500/30 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-yellow-500/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Achieving The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                3As
              </span>{" "}
              of Healthcare
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent to-yellow-500 w-20"></div>
              <span className="text-xl md:text-2xl font-semibold text-yellow-400 px-4">
                Accessible • Available • Affordable
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-yellow-500 w-20"></div>
            </div>
          </div>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1 - Accessible */}
          <div className="group relative">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="relative z-10 flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  Accessible
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Breaking language barriers, making healthcare accessible to everyone, everywhere
                </p>
              </div>

              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
            </div>
          </div>

          {/* Card 2 - Available */}
          <div className="group relative">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="relative z-10 flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  Available
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Unifying the global healthcare network for seamless, 24/7 care delivery
                </p>
              </div>

              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
            </div>
          </div>

          {/* Card 3 - Affordable */}
          <div className="group relative">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full transition-all duration-500 hover:bg-white/10 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="relative z-10 flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  Affordable
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Bringing quality healthcare right to you, wherever you are, at costs you can afford
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-6">
            Experience the future of healthcare today
          </p>
          <Link 
            href="https://axoncare.axonichealth.com"
            target="_blank"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30"
          >
            Learn More About Our Solutions
          </Link>
        </div>
      </div>
    </section>
  )
} 