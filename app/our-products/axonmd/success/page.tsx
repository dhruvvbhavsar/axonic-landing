import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { CheckCircle2, Mail, Upload, UserCheck, Key, Shield } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Registration Successful" />
      <div className="bg-gradient-to-b from-green-50 to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 text-center border-t-4 border-green-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Registration Successful!</h1>
            <p className="text-lg text-gray-700 mb-2">Your AxonMD account setup is in progress</p>
            <p className="text-gray-600">We're setting up your clinic and you'll be ready to go in no time.</p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What Happens Next?</h2>
              <p className="text-gray-600">Follow these simple steps to complete your account setup</p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    1
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Account Setup Complete</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Your clinic account and system access have been automatically created. Your clinic name will be set as <strong>"Dr. [Your Name]'s Clinic"</strong>.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-2 mb-2">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Check Your Email</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    You'll receive an email with a secure link to upload your <strong>Medical Registration Certificate</strong>.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-amber-900">
                      <strong>Important:</strong> Please check your inbox (and spam folder) for this email.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-2 mb-2">
                    <Upload className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Upload Your Certificate</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Click the link in the email and upload your medical registration certificate. This is required for verification purposes.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    4
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Admin Verification</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Our team will review and verify your certificate. This typically takes <strong>less than 2 hours</strong> during business hours.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                    5
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-2 mb-2">
                    <Key className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Receive Your Login Credentials</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Once verified, you'll receive <strong>4 separate emails</strong> with your login credentials:
                  </p>
                  <div className="ml-0 space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Your <strong>Doctor Account Username</strong></span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Your <strong>Email Verification Link</strong> (Doctor Account)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Your <strong>Secretary Account Username</strong> (for clinic staff)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Your <strong>Email Verification Link</strong> (Secretary Account)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              What's Being Set Up For You?
            </h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Your clinic unit and complete EMR system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Doctor account with full access to AxonMD features</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Secretary account for your clinic staff (named as "Sec. [Your Name]")</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Access to voice AI, smart buttons, and all professional features</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to assist you with any questions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/our-products/axonmd/" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Back to AxonMD
              </Link>
              <Link 
                href="/contact-us" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


