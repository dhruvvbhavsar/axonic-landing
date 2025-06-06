"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactFormProps {
  productName: string
  onSubmit?: (data: FormData) => void
}

export function ContactForm({ productName, onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (onSubmit) {
      onSubmit(formData)
    }
    
    setIsSubmitting(false)
    
    // Reset form
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="John"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Doe"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john.doe@company.com"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Your Company"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={`I'm interested in learning more about ${productName}...`}
            className="w-full min-h-[100px]"
            rows={4}
          />
        </div>

        <input type="hidden" name="product" value={productName} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex-1"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="py-3 px-8 rounded-xl font-semibold"
          onClick={() => window.open(`tel:+1-800-AXONIC`, '_self')}
        >
          Call Us Instead
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        We'll get back to you within 24 hours. Your information is secure and will not be shared.
      </p>
    </form>
  )
} 