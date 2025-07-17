import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ApplicationForm } from "@/components/application-form"
import { ShareJobButton } from "@/components/share-job-button"
import { getCareerBySlug, getAllCareers } from "@/lib/careers-api"
import { MapPin, Clock, Calendar, Briefcase, ArrowLeft, CheckCircle } from "lucide-react"
import { MDXRemote } from 'next-mdx-remote/rsc'

interface CareerPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const careers = await getAllCareers()
  return careers.map((career) => ({
    slug: career.slug,
  }))
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title={career.title} />

      {/* Career Content */}
      <article className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/careers">
              <Button variant="outline" className="font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Job Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    {career.department}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {career.title}
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {career.description}
                </p>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <span className="font-medium">Location</span>
                      <p className="text-sm text-gray-600">{career.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <span className="font-medium">Employment Type</span>
                      <p className="text-sm text-gray-600">{career.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <span className="font-medium">Experience Level</span>
                      <p className="text-sm text-gray-600">{career.experience}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    Posted on {new Date(career.postedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </header>

              {/* Job Description */}
              <div className="prose max-w-none mb-12">
                <MDXRemote source={career.content} />
              </div>

              {/* Requirements, Responsibilities, Benefits */}
              <div className="space-y-8">
                {career.requirements.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                        Requirements
                      </h3>
                      <ul className="space-y-3">
                        {career.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {career.responsibilities.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Briefcase className="w-6 h-6 mr-3 text-blue-500" />
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-3">
                        {career.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {career.benefits.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3 text-purple-500" />
                        Benefits & Perks
                      </h3>
                      <ul className="space-y-3">
                        {career.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Apply Card */}
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Apply?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Join our team and help revolutionize global healthcare technology.
                    </p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg mb-4">
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-gray-900">
                            Apply for {career.title}
                          </DialogTitle>
                          <DialogDescription className="text-gray-600">
                            Fill out the form below and our HR team will get back to you within 48 hours. 
                            Please include your resume and a brief cover letter explaining why you're interested in this role.
                          </DialogDescription>
                        </DialogHeader>
                        <ApplicationForm 
                          jobId={career.id}
                          jobTitle={career.title}
                        />
                      </DialogContent>
                    </Dialog>

                    <p className="text-sm text-gray-500">
                      Questions? <Link href="/contact-us" className="text-yellow-600 hover:text-yellow-700 underline">Contact us</Link>
                    </p>
                  </CardContent>
                </Card>

                {/* Company Info */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">About Axonic Health</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      We're revolutionizing global healthcare by making quality care accessible, 
                      available, and affordable for everyone through innovative technology solutions.
                    </p>
                    <Link href="/about-us">
                      <Button variant="outline" className="w-full">
                        Learn More About Us
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Share */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Share This Job</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Know someone who'd be perfect for this role? Share it with them!
                    </p>
                    <ShareJobButton 
                      title={career.title}
                      description={career.description}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Back to Careers Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <Link href="/careers">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All Open Positions
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
} 