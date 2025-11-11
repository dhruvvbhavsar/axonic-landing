import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { CheckCircle2, Mail, Upload, UserCheck, Key, Shield, Building2, Clock } from "lucide-react"

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
            <p className="text-lg text-gray-700 mb-2">Your AxonHIS account setup is in progress</p>
            <p className="text-gray-600">We're setting up your hospital environment and you'll be ready to go soon.</p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What Happens Next?</h2>
              <p className="text-gray-600">Follow these steps to complete your hospital setup</p>
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
                    Your hospital organization account and system access have been automatically created. Your hospital environment is being provisioned.
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
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Environment Provisioning</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Our team is provisioning your hospital environment and configuring role mappings. This typically takes <strong>72 hours</strong>.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                    <p className="text-sm text-blue-900">
                      <strong>What's being set up:</strong> Hospital unit, EMR system, department access, user roles, and system configurations.
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
                    <Building2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">Role Mapping Configuration</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Department-wise role mappings will be configured based on your hospital structure. Your admin team will have access to configure additional roles.
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
                    <h3 className="font-bold text-gray-900 text-lg">Training Schedule</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    You'll receive a training schedule for department-wise training. Based on your plan, you have <strong>4-40 hours</strong> of virtual training included to get your team up to speed.
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
                    Once your environment is ready, you'll receive email with your admin login credentials:
                  </p>
                  <div className="ml-0 space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Your <strong>Admin Account Username</strong> and password</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Access URL for your hospital subdomain</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Initial setup guide and documentation</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-700">Training schedule and onboarding information</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              What's Being Set Up For You?
            </h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Your hospital unit and complete HIS system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Admin account with full access to all AxonHIS modules</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Department-wise role mappings and access controls</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>All modules based on your selected plan (Lite/Pro/Advance)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span>Access to training resources and onboarding support</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to assist you with any questions about your setup or training.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/our-products/axonhis/" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Back to AxonHIS
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

