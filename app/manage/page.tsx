"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

// Force dynamic rendering since this page uses search params
export const dynamic = 'force-dynamic'

function ManagePageContent() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const go = async () => {
      if (!token || !email) {
        setError('Missing token or email')
        return
      }
      try {
        const portalUrl = `/api/manage/portal?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
        window.location.href = portalUrl
      } catch (e: any) {
        setError(e?.message || 'Failed to open portal')
      }
    }
    go()
  }, [token, email])

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">Manage Subscription</h1>
        {!error ? (
          <p className="text-gray-600">Redirecting you to the customer portal…</p>
        ) : (
          <>
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </>
        )}
      </div>
    </main>
  )
}

export default function ManagePage() {
  return (
    <Suspense fallback={
      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Manage Subscription</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <ManagePageContent />
    </Suspense>
  )
}
