"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import HealthcareProfessionals from "@/public/assets/partnerSection/HealthcareProfessionals.png"
import MedicalEquipment from "@/public/assets/partnerSection/MedicalEquipment.png"
import InsuranceIndustry from "@/public/assets/partnerSection/InsuranceIndustry.png"
import HealthcareConsultancy from "@/public/assets/partnerSection/medical-banner-with-doctor-holding-stethoscope1.png"
import MedicalFacility from "@/public/assets/partnerSection/hand-with-protective-gloves-holding-blood-samples-covid-test.png"
import ResearchLabs from "@/public/assets/partnerSection/resech.png"
import Pharmaceutical from "@/public/assets/partnerSection/female-pharmacist-working-drugstore-scaled.png"

export function PartnersSection() {
  const partners = [
    {
      id: 1,
      image: HealthcareProfessionals,
      title: "Healthcare Professionals",
      category: "Medical Staff"
    },
    {
      id: 2,
      image: MedicalEquipment,
      title: "Medical Equipment",
      category: "Technology"
    },
    {
      id: 3,
      image: InsuranceIndustry,
      title: "Insurance Industry",
      category: "Insurance"
    },
    {
      id: 4,
      image: HealthcareConsultancy,
      title: "Healthcare Consultancy",
      category: "Consulting"
    },
    {
      id: 5,
      image: MedicalFacility,
      title: "Medical Facilities",
      category: "Infrastructure"
    },
    {
      id: 6,
      image: ResearchLabs,
      title: "Research Labs",
      category: "Research"
    },
    {
      id: 7,
      image: Pharmaceutical,
      title: "Pharmaceutical",
      category: "Pharmacy"
    }
  ]

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powered by the Best in Healthcare
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Desktop: Horizontal Accordion */}
        <div className="hidden md:flex h-[400px] gap-2 max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="group relative flex-1 cursor-pointer transition-all duration-700 ease-out hover:flex-[3] overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out">
                <Image
                  src={partner.image}
                  alt={partner.title}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Vertical Text (when collapsed) */}
                <div className="group-hover:opacity-0 transition-opacity duration-300">
                  <h3 
                    className="text-white font-bold text-lg transform -rotate-90 origin-bottom-left absolute bottom-6 left-6 whitespace-nowrap"
                    style={{ transformOrigin: 'bottom left' }}
                  >
                    {partner.title}
                  </h3>
                </div>

                {/* Horizontal Content (when expanded) */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                      {partner.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-2xl font-bold mb-3">
                    {partner.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 text-base max-w-md">
                    {index === 0 && "Connecting with top healthcare professionals worldwide"}
                    {index === 1 && "State-of-the-art medical equipment and technology"}
                    {index === 2 && "Comprehensive insurance coverage and partnerships"}
                    {index === 3 && "Expert healthcare consulting and advisory services"}
                    {index === 4 && "Modern medical facilities and treatment centers"}
                    {index === 5 && "Cutting-edge research and development laboratories"}
                    {index === 6 && "Leading pharmaceutical companies and drug development"}
                  </p>

                  {/* Learn More Button */}
                  <Link 
                    href="/contact-us"
                    className="inline-block mt-4 relative z-10"
                  >
                    <button className="bg-white/20 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 relative z-10">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 transition-colors duration-500 pointer-events-none"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Accordion */}
        <div className="md:hidden flex flex-col h-[500px] gap-2 max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {partners.map((partner, index) => (
            <div
              key={`mobile-${partner.id}`}
              className="group relative flex-1 cursor-pointer transition-all duration-700 ease-out hover:flex-[3] overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out">
                <Image
                  src={partner.image}
                  alt={partner.title}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center p-4">
                {/* Collapsed Text (when collapsed) */}
                <div className="group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center h-full">
                  <h3 className="text-white font-bold text-base text-center leading-tight">
                    {partner.title}
                  </h3>
                </div>

                {/* Expanded Content (when expanded) */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0 flex flex-col justify-center h-full">
                  {/* Category Badge */}
                  <div className="mb-3 text-center">
                    <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {partner.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-bold mb-2 text-center leading-tight">
                    {partner.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 text-sm text-center mb-3 leading-relaxed">
                    {index === 0 && "Connecting with top healthcare professionals worldwide"}
                    {index === 1 && "State-of-the-art medical equipment and technology"}
                    {index === 2 && "Comprehensive insurance coverage and partnerships"}
                    {index === 3 && "Expert healthcare consulting and advisory services"}
                    {index === 4 && "Modern medical facilities and treatment centers"}
                    {index === 5 && "Cutting-edge research and development laboratories"}
                    {index === 6 && "Leading pharmaceutical companies and drug development"}
                  </p>

                  {/* Learn More Button */}
                  <div className="text-center">
                    <Link 
                      href="/contact-us"
                      className="inline-block relative z-10"
                    >
                      <button className="bg-white/20 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 text-sm relative z-10">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500 transition-colors duration-500 rounded-lg pointer-events-none"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We don't work alone. We partner with the world's leading healthcare organizations, technology pioneers, and industry experts to build solutions that set the global standard.
          </p>
        </div>
      </div>
    </section>
  )
} 