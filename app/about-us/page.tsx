"use client"

import * as React from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import founderImage from "@/public/assets/founder-image.png";
import visionImage from "@/public/assets/aboutUs/businesswoman-medicalVision.png";
import missionImage from "@/public/assets/aboutUs/medical-banner-with-doctor-wearing-stethoscope.png";
import abhayChopada from "@/public/assets/abhay-chopada.png";
import pritiJain from "@/public/assets/priti-jain.png";
import franciePatel from "@/public/assets/francie-patel.png";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader 
        title="About Us" 
      />

      {/* Founder's Note Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Founder Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={founderImage}
                  alt="Founder"
                  fill
                  className="object-cover "
                />
              </div>
            </div>

            {/* Right side - Founder's Note */}
            <div className="lg:pl-8">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Founder's Note
                </h2>
                <div className="w-20 h-1 bg-yellow-500 mb-8"></div>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    The global healthcare system is a paradox: a trillion-dollar industry 
                    that leaves billions behind. An average spend of $1,000 per person 
                    shouldn't translate to nearly two-thirds of the world lacking access to 
                    quality care. This is what sparked the vision behind Axonic. We 
                    believe healthcare should not be a privilege reserved for the few, but 
                    a right accessible to all.
                  </p>
                  
                  <p>
                    Axonic is here to revolutionise healthcare by merging medicine with technology. 
                    Imagine a world where seamless data connects patients and doctors worldwide, 
                    dissolving geographical barriers and financial burdens. This is the future of 
                    healthcare we're building: accessible, available, and affordable for all.
                  </p>
                  
                  <p>
                    Join us in this health-tech revolution, where technology empowers 
                    better health for everyone.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact-us"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Join the Global Network
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="relative">
              <div className="grid grid-cols-1 gap-8">
                {/* Vision Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={visionImage}
                    alt="Vision - Healthcare Innovation"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Vision Content */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Vision
                  </h3>
                  <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                  <p className="text-gray-700 leading-relaxed">
                    To be the pioneer of innovation, breaking down barriers and 
                    building a world where affordability, availability, and 
                    accessibility converge, revolutionising global healthcare.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="relative">
              <div className="grid grid-cols-1 gap-8">
                {/* Mission Content */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Mission
                  </h3>
                  <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Global OPD, Reaching every patient with affordable 
                    solutions, connecting the world healthcare system in a 
                    chain of information and data accessible anytime, 
                    anywhere in the world.
                  </p>
                </div>
                
                {/* Mission Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={missionImage}
                    alt="Mission - Global Healthcare Network"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Visionary Leadership
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dr. Abhay Chopada */}
            <LeadershipCard
              name="Dr. Abhay Chopada"
              title="Founder"
              image={abhayChopada}
              description="With a background as a general surgeon based in the UK, Dr Abhay brings forth his clinical expertise to address global healthcare challenges effectively."
              linkedinUrl="https://www.linkedin.com/in/abhaychopada1/"
            />

            {/* Priti Jain */}
            <LeadershipCard
              name="Priti Jain"
              title="Founder"
              image={pritiJain}
              description="Priti brings extensive experience in healthcare operations and strategic planning, driving innovation in healthcare accessibility and patient care solutions."
              linkedinUrl="https://www.linkedin.com/in/priti-jain-b2a3a3/"
            />

            {/* Francie Patel */}
            <LeadershipCard
              name="Francie Patel"
              title="CEO"
              image={franciePatel}
              description="Francie leads the company's vision with expertise in healthcare technology and business development, ensuring sustainable growth and innovation."
              linkedinUrl="https://www.linkedin.com/in/francie-patel/"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

interface LeadershipCardProps {
  name: string
  title: string
  image: StaticImageData
  description: string
  linkedinUrl: string
}

function LeadershipCard({ name, title, image, description, linkedinUrl }: LeadershipCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Default overlay with name and title */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-yellow-400 font-semibold">{title}</p>
          </div>
        </div>

        {/* Hover overlay with description */}
        <div className={`absolute inset-0 bg-black/90 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-6 flex flex-col justify-center text-white">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">{name}</h3>
            <p className="text-sm leading-relaxed mb-6">{description}</p>
            
            <Link 
              href={linkedinUrl}
              target="_blank"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 w-fit"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
