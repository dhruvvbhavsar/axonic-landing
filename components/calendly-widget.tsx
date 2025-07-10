"use client"

import * as React from "react"

interface CalendlyWidgetProps {
  productName: string
  calendlyUrl?: string
}

export function CalendlyWidget({ productName, calendlyUrl = "https://calendly.com/your-account/demo" }: CalendlyWidgetProps) {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    // Initialize Calendly when script loads
    script.onload = () => {
      if (window.Calendly) {
        setIsLoading(false)
      }
    }

    return () => {
      // Cleanup
      document.head.removeChild(script)
    }
  }, [])

  React.useEffect(() => {
    if (!isLoading && window.Calendly) {
      // Initialize the inline widget
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: document.getElementById('calendly-inline-widget'),
        prefill: {
          customAnswers: {
            a1: productName // Pass product name as custom answer
          }
        },
        utm: {
          utmSource: 'website',
          utmMedium: 'demo_request',
          utmCampaign: productName.toLowerCase().replace(/\s+/g, '-')
        }
      })
    }
  }, [isLoading, calendlyUrl, productName])

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Schedule Your {productName} Demo
        </h3>
        <p className="text-gray-600 text-sm">
          Choose a convenient time slot for your personalized demo
        </p>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <span className="ml-2 text-gray-600">Loading calendar...</span>
        </div>
      )}
      
      <div 
        id="calendly-inline-widget"
        className={`${isLoading ? 'hidden' : 'block'}`}
        style={{ minWidth: '320px', height: '500px' }}
      />
    </div>
  )
}

// Extend the Window interface to include Calendly
declare global {
  interface Window {
    Calendly: any
  }
} 