import Link from "next/link"
import { PageHeader } from "@/components/page-header"

export default function Page() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Payment Successful" />
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Payment Confirmed
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Thank you!</h1>
            <p className="text-gray-700 mb-2">Your payment has been processed successfully.</p>
            <p className="text-gray-600">You will receive onboarding steps by email shortly. Our team will activate your account within 2 hours.</p>

            <div className="flex gap-4 justify-center mt-8">
              <Link href="/our-products/axonmd/" className="underline text-blue-600">Back to AxonMD</Link>
              <Link href="/" className="underline text-gray-600">Go to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


