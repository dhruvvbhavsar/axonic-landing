import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader title="Consulting & Custom HIS Development" />
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Axonic Health Consulting & Custom HIS Development Services
            </h1>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Axonic Health, we understand that every healthcare organization has unique challenges, workflows, and requirements. Our consulting and custom development services bridge the gap between off-the-shelf solutions and your specific operational needs, delivering tailored technology that enhances patient care and operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Banner Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/his/banner.jpg"
              alt="Healthcare Technology Consulting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Transform Your Healthcare Organization
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Expert technology solutions tailored to your unique needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Consulting Expertise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Consulting Expertise</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            {/* Strategic Healthcare Technology Planning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Healthcare Technology Planning</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our experienced consultants work alongside your leadership team to develop comprehensive technology roadmaps aligned with your clinical and business objectives. We analyze your current systems, identify optimization opportunities, and create actionable implementation strategies that drive measurable outcomes.
                </p>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/his/1.jpg"
                  alt="Strategic Healthcare Technology Planning"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Digital Transformation Guidance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
                <Image
                  src="/assets/his/2.jpg"
                  alt="Digital Transformation Guidance"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Transformation Guidance</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Navigate the complex landscape of healthcare digitization with confidence. Our experts guide organizations through every phase of digital transformation, from initial assessment to full implementation, ensuring smooth transitions that minimize disruption while maximizing value.
                </p>
              </div>
            </div>

            {/* Clinical Workflow Optimization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Clinical Workflow Optimization</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Leverage our deep understanding of clinical operations to streamline workflows, reduce administrative burden, and improve patient satisfaction. We identify bottlenecks, recommend process improvements, and design technology solutions that support efficient care delivery.
                </p>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/his/3.png"
                  alt="Clinical Workflow Optimization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Regulatory Compliance & Standards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
                <Image
                  src="/assets/his/4.jpg"
                  alt="Regulatory Compliance & Standards"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance & Standards</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Stay ahead of evolving healthcare regulations with our comprehensive compliance consulting. We ensure your systems meet all relevant standards while preparing for future regulatory changes that could impact your operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom HIS Development Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Custom HIS Development Services</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tailored Hospital Information Systems</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Every healthcare organization operates differently. Our custom HIS development creates solutions specifically designed for your unique workflows, clinical specialties, and operational requirements.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Legacy System Integration</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Maximize your existing technology investments through seamless integration solutions. We connect disparate systems and eliminate data silos.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specialty-Specific Solutions</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Whether you're focused on cardiology, oncology, pediatrics, or any other specialty, we develop targeted solutions that address your specific requirements.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile & Remote Care Platforms</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Extend your care capabilities with custom mobile and remote care solutions that enable telehealth, remote monitoring, and mobile clinical workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Axonic Health */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Axonic Health</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Healthcare Expertise</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our team combines deep healthcare industry knowledge with cutting-edge technology expertise. We understand the complexities of clinical care and regulatory requirements.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">End-to-End Solutions</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  From initial consultation through implementation and ongoing support, we provide comprehensive services that ensure successful technology deployments.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation-Driven Approach</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Stay at the forefront of healthcare technology with our innovative solutions. We incorporate the latest advances in AI, mobile technology, and cloud computing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborative Partnership</h3>
                <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  We believe in true partnerships with our clients. Our collaborative approach ensures solutions that truly meet your needs and gain widespread adoption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Development Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Development Process</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Discovery & Analysis Phase</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We begin every project with comprehensive discovery sessions to understand your organization's unique requirements, challenges, and goals. This thorough analysis forms the foundation for all subsequent development work.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Design & Architecture</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our experienced architects design scalable, secure, and maintainable systems that align with healthcare best practices and industry standards. We create detailed technical specifications and user experience designs.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Agile Development & Testing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Using proven agile methodologies, we develop your custom solutions through iterative cycles that allow for continuous feedback and refinement. Rigorous testing ensures reliability and security.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Implementation & Training</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our implementation specialists ensure smooth system deployments with minimal disruption to your operations. Comprehensive training programs prepare your staff to maximize value.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ongoing Support & Evolution</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Technology needs evolve, and we're committed to growing with you. Our ongoing support services include maintenance, updates, enhancements, and strategic guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Areas</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Healthcare Technology Assessment</h3>
                <div className="w-10 h-1 bg-yellow-500 mb-3"></div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Comprehensive evaluation of your current technology infrastructure, identifying strengths, gaps, and opportunities for improvement.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">System Architecture & Design</h3>
                <div className="w-10 h-1 bg-yellow-500 mb-3"></div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Creation of robust, scalable architectures that support your current needs while providing flexibility for future growth.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Data Migration & Integration</h3>
                <div className="w-10 h-1 bg-yellow-500 mb-3"></div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Secure, accurate transfer of data between systems and creation of integrated platforms that eliminate information silos.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">User Experience Design</h3>
                <div className="w-10 h-1 bg-yellow-500 mb-3"></div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Development of intuitive, efficient interfaces that reduce training requirements and improve user satisfaction.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Optimization</h3>
                <div className="w-10 h-1 bg-yellow-500 mb-3"></div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Enhancement of existing systems to improve speed, reliability, and user experience while reducing operational costs.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Security & Compliance</h3>
                <div className="w-10 h-1 bg-yellow-500 mb-3"></div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Implementation of comprehensive security measures and compliance frameworks that protect patient data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Transform your healthcare technology with solutions designed specifically for your organization. Our expert team is ready to understand your unique challenges and develop custom solutions that drive better outcomes.
              </p>
              <p className="text-gray-700 mb-8">
                Contact us today to discuss how Axonic Health's consulting and custom development services can accelerate your digital transformation journey.
              </p>
              
              <Link href="/contact-us">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Contact Our Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}