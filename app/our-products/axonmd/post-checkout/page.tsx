import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Mail, ArrowRight } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen">
      <PageHeader title="You're Almost There" />
      <div className="bg-gradient-to-b from-blue-50 to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Check your email to complete registration</h1>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We’ve saved your partial registration. We’ve emailed you a secure link to resume your setup. Click the link in the email to complete your details and activate your AxonMD account.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6 text-blue-900">
              <p className="text-sm">
                Can’t find the email? Please check your spam folder. If it’s not there, return to the AxonMD page and start again, or contact support.
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              <Link href="/our-products/axonmd/" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                Back to AxonMD <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center px-5 py-3 border-2 border-gray-300 text-gray-800 hover:bg-gray-50 rounded-xl font-semibold">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


