"use client"

import * as React from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"

// Import images from assets
import image1 from "@/public/assets/image1.png"
import image2 from "@/public/assets/image2.png"
import image3 from "@/public/assets/image3.png"
import image4 from "@/public/assets/image4.png"
import image5 from "@/public/assets/image5.png"
import image6 from "@/public/assets/image6.png"
import image7 from "@/public/assets/image7.png"

export default function OurPartnersPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader 
        title="Our Partners" 
      />

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Partners in the Global Healthcare Revolution
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Innovating, empowering, and collaborating across the healthcare ecosystem to drive a global healthcare transformation.
            </p>
          </div>

          {/* Seamless Bento Grid Layout with Explicit Positioning */}
          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className="grid grid-cols-6 gap-0"
              style={{
                gridTemplateRows: 'repeat(3, 200px)',
                gridTemplateAreas: `
                  "hospitals hospitals governments governments doctors doctors"
                  "insurance insurance clinics clinics doctors doctors"
                  "labs labs labs pharmacies pharmacies pharmacies"
                `
              }}
            >
              {/* Hospitals */}
              <div style={{ gridArea: 'hospitals' }}>
                <PartnerCard
                  title="Hospitals"
                  subtitle="Run Smoother, Coordinate Better, Reach More Patients"
                  image={image1}
                  description="Transform your hospital operations with our integrated healthcare platform. Streamline patient flow, enhance coordination between departments, and expand your reach to serve more patients effectively."
                  buttonText="Join the Network"
                  buttonLink="#"
                />
              </div>

              {/* Governments */}
              <div style={{ gridArea: 'governments' }}>
                <PartnerCard
                  title="Governments"
                  subtitle="Empower Your Population, Shape the Future of Healthcare"
                  image={image2}
                  description="Axonic supports governments in developing data-driven health policies, improving public health outcomes, and expanding access to quality healthcare for all citizens."
                  buttonText="Join the Alliance"
                  buttonLink="#"
                />
              </div>

              {/* Doctors */}
              <div style={{ gridArea: 'doctors' }}>
                <PartnerCard
                  title="Doctors"
                  subtitle="Work Smarter, Not Harder"
                  image={image3}
                  description="Empower your practice with cutting-edge tools that reduce administrative burden, improve patient outcomes, and connect you with a global network of healthcare professionals."
                  buttonText="Get Started"
                  buttonLink="#"
                />
              </div>

              {/* Insurance Industry */}
              <div style={{ gridArea: 'insurance' }}>
                <PartnerCard
                  title="Insurance Industry"
                  subtitle="Stop Fraud, Manage Risk, Save Costs"
                  image={image4}
                  description="Leverage advanced analytics and AI-powered insights to detect fraud, assess risk more accurately, and optimize cost management while improving customer satisfaction."
                  buttonText="Learn More"
                  buttonLink="#"
                />
              </div>

              {/* Clinics */}
              <div style={{ gridArea: 'clinics' }}>
                <PartnerCard
                  title="Clinics"
                  subtitle="Global OPD, Boosted Revenue"
                  image={image5}
                  description="Transform your clinic into a global healthcare hub. Expand your patient base beyond geographical boundaries and increase revenue through our innovative telemedicine platform."
                  buttonText="Expand Globally"
                  buttonLink="#"
                />
              </div>

              {/* Labs */}
              <div style={{ gridArea: 'labs' }}>
                <PartnerCard
                  title="Labs"
                  subtitle="Faster Results, Fewer Errors, Better Resource Allocation"
                  image={image6}
                  description="Optimize laboratory operations with automated workflows, AI-powered diagnostics, and seamless integration with healthcare providers for faster, more accurate results."
                  buttonText="Optimize Now"
                  buttonLink="#"
                />
              </div>

              {/* Pharmacies */}
              <div style={{ gridArea: 'pharmacies' }}>
                <PartnerCard
                  title="Pharmacies"
                  subtitle="Enhance Services, Increase Revenue"
                  image={image7}
                  description="Modernize your pharmacy operations with digital prescription management, inventory optimization, and expanded service offerings to increase customer satisfaction and revenue."
                  buttonText="Modernize Today"
                  buttonLink="#"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface PartnerCardProps {
  title: string
  subtitle: string
  image: StaticImageData
  description: string
  buttonText: string
  buttonLink: string
}

function PartnerCard({ title, subtitle, image, description, buttonText, buttonLink }: PartnerCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      className="relative group cursor-pointer w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full overflow-hidden transition-all duration-300 group-hover:z-10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Default overlay with title and subtitle */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-xs text-gray-200 leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {/* Hover overlay with description and button */}
        <div className={`absolute inset-0 bg-black/90 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-4 flex flex-col justify-center text-white">
            <h3 className="text-lg font-bold mb-3 text-yellow-400">{title}</h3>
            <p className="text-xs leading-relaxed mb-4 text-gray-200">{description}</p>
            
            <Link 
              href={buttonLink}
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 w-fit text-sm"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
