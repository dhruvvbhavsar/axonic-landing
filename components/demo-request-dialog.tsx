"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { CalendlyWidget } from "@/components/calendly-widget"

interface DemoRequestDialogProps {
  productName: string
  calendlyUrl?: string
  defaultTab?: TabType
}

type TabType = 'form' | 'calendar'

export function DemoRequestDialog({ productName, calendlyUrl, defaultTab = 'calendar' }: DemoRequestDialogProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>(defaultTab)

  React.useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        <Button
          variant={activeTab === 'calendar' ? 'default' : 'ghost'}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'calendar' 
              ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('calendar')}
        >
          📅 Book Demo Slot
        </Button>
        <Button
          variant={activeTab === 'form' ? 'default' : 'ghost'}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'form' 
              ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('form')}
        >
          ✉️ Send Message
        </Button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Schedule Your Live Demo
              </h3>
              <p className="text-gray-600">
                Book a 30-minute personalized demo of {productName} with our product specialist
              </p>
            </div>
            <CalendlyWidget 
              productName={productName} 
              calendlyUrl={calendlyUrl}
            />
          </div>
        )}

        {activeTab === 'form' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h3>
              <p className="text-gray-600">
                Send us a message and we'll get back to you within 24 hours
              </p>
            </div>
            <ContactForm productName={productName} />
          </div>
        )}
      </div>

      {/* Helper Text and Call Button */}
      <div className="text-center pt-4 border-t border-gray-200 space-y-3">
        <p className="text-sm text-gray-500">
          {activeTab === 'calendar' 
            ? "You can reschedule or cancel your demo anytime before the meeting"
            : "We'll get back to you within 24 hours with detailed information"
          }
        </p>
        
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="py-2 px-6 rounded-xl font-semibold text-sm"
            onClick={() => window.open(`tel:+918956652831`, '_self')}
          >
            📞 Call Us Instead
          </Button>
        </div>
      </div>
    </div>
  )
} 