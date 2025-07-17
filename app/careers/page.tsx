import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllCareers, getUniqueDepartments } from "@/lib/careers-api"
import { MapPin, Clock, Briefcase } from "lucide-react"

export default async function CareersPage() {
  const careers = await getAllCareers()
  const departments = await getUniqueDepartments()

  if (careers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Careers" />
        
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
              <div className="mb-8">
                <div className="text-6xl mb-4">💼</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  No Open Positions Yet
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're always looking for talented individuals to join our mission. 
                  Check back soon for new opportunities or reach out to us directly!
                </p>
              </div>
              
              <Link href="/contact-us">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Careers" />
      
      {/* Hero Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join the Healthcare Revolution
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Be part of a team that's transforming global healthcare through innovative technology. 
            We're looking for passionate individuals who want to make a meaningful impact on millions of lives worldwide.
          </p>
          
          {/* Department Filter */}
          {departments.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4 bg-yellow-50 border-yellow-200 text-yellow-800">
                All Departments
              </Badge>
              {departments.map((dept) => (
                <Badge key={dept} variant="outline" className="text-sm py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  {dept}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career) => (
              <Card key={career.slug} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl overflow-hidden hover:-translate-y-2">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Header with Department Badge */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        {career.department}
                      </Badge>
                    </div>
                    
                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                      {career.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {career.description}
                    </p>
                  </div>
                  
                  {/* Job Details */}
                  <div className="px-6 pb-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{career.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{career.type} • {career.experience}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                          Posted {new Date(career.postedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <div className="p-6 pt-0">
                    <Link href={`/careers/${career.slug}`} className="block">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                        View Details & Apply
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We're always interested in connecting with talented individuals who share our passion for healthcare innovation. 
            Send us your resume and let us know how you'd like to contribute to our mission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Get in Touch
              </Button>
            </Link>
            <Link href="/about-us">
              <Button variant="outline" className="font-medium py-3 px-8 rounded-lg">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 