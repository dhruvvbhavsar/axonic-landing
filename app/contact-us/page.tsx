import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactUsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader title="Contact Us" />
      
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Office Information */}
          <div className="space-y-8">
            {/* USA Office */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">USA Office:</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Delaware Office:</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">3911 Concord Pike #8030, Wilmington, Delaware, 19803</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">California Office:</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">505 Cento Ct, Pleasanton, CA 94566</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-gray-600">Ph no : +1 408 693 6337</p>
                </div>
              </div>
            </div>

            {/* UK Office */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">UK Office :</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">20 Langland Drive, Pinner HA5ASA</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-gray-600">Ph no : +44203411 3999</p>
                </div>
              </div>
            </div>

            {/* India Office */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">India Office:</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Development Centre Pune:</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">403, 4th Floor, Kapil Zenith IT Park, Bavdhan,Pune 411021</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-gray-600">Ph no : +91 82982 90078</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">We'd Love To Hear From You</h2>
              <p className="text-gray-600">
                Whether you are curious about our products or want to request a demo , just drop a line here. Our sales manager will connect very soon.
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Name"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Comment / Questions"
                  className="w-full min-h-32"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3"
              >
                Submit
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Mail className="w-5 h-5 text-yellow-500" />
                <span>info@axonichealth.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
