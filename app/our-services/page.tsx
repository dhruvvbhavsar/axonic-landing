import { PageHeader } from "@/components/page-header";
import Image from "next/image";

export default function OurServicesPage() {
  return (
    <>
      <PageHeader title="Our Services" />
      
      {/* AxonCare Service Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <Image
                src="/assets/services/ServicesAxoncare1.png"
                alt="AxonCare Healthcare Technology"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Service (AxonCare)
                </h2>
                <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                AxonCare, a service brand of Axonic Health, is transforming healthcare delivery through technology and innovation. Our services include an ever-expanding network of strategically located clinics, a global consortium of experienced medical professionals, and advanced AI-based health tech solutions. With a powerful AI-integrated platform, AxonCare ensures accessible, convenient, and multilingual healthcare services anytime, anywhere—making quality healthcare truly global.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AxonCare Constitutes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  AxonCare Constitutes of
                </h2>
                <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-justify">
                AxonCare is a comprehensive healthcare platform designed to streamline patient care and enhance clinical efficiency through advanced technology and seamless connectivity. By integrating AI-driven tools and a global network of specialists, AxonCare provides reliable, real-time solutions for both patients and healthcare professionals, ensuring quality care anytime, anywhere.
              </p>
              
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Read More
              </button>
            </div>
            
            {/* Image */}
            <div className="relative">
              <Image
                src="/assets/services/ServicesAxoncare2.png"
                alt="AxonCare Platform"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who It Is For Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who It Is For
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Clinical Efficiency Platform */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/assets/services/ClinicalEfficiencyPlatform.png"
                  alt="Clinical Efficiency Platform"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Clinical Efficiency Platform
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  AI-driven tools and error prevention systems to enhance diagnostic accuracy and ensure quality patient care.
                </p>
              </div>
            </div>

            {/* Smart Anytime Health Kiosks */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/assets/services/SmartAnyTimeHealth.png"
                  alt="Smart Anytime Health Kiosks"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Smart Anytime Health Kiosks
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Over 120 point-of-care tests and remote examinations with real-time data sharing for prompt, accurate assessments.
                </p>
              </div>
            </div>

            {/* Global Specialist Network */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/assets/services/GlobalSpeciality.png"
                  alt="Global Specialist Network"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Global Specialist Network
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  24/7 access to multi-specialty care with seamless coordination, providing quality healthcare worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
