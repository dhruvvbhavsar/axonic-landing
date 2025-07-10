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

// Email addresses from the provided list
const EMAIL_RECIPIENTS = [
  "axoncare@axonichealth.com",
  "lablink@axonichealth.com", 
  "cliniq@axonichealth.com",
  "surgehub@axonichealth.com",
  "pharmacy@axonichealth.com"
]

export function ContactForm({ productName, onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const formRef = React.useRef<HTMLFormElement>(null)

  const sendEmail = async (formData: FormData) => {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const product = formData.get('product') as string

    // Create HTML formatted email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <h3>Product Interest: ${product}</h3>
      <hr>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
      <hr>
      <p><em>This message was sent from the Axonic Health website contact form.</em></p>
    `

    // Select appropriate email based on product
    let recipientEmail = EMAIL_RECIPIENTS[0] // Default to axoncare
    
    if (product.toLowerCase().includes('lablink')) {
      recipientEmail = EMAIL_RECIPIENTS[1]
    } else if (product.toLowerCase().includes('cliniq')) {
      recipientEmail = EMAIL_RECIPIENTS[2]
    } else if (product.toLowerCase().includes('surgehub')) {
      recipientEmail = EMAIL_RECIPIENTS[3]
    } else if (product.toLowerCase().includes('pharman') || product.toLowerCase().includes('pharmacy')) {
      recipientEmail = EMAIL_RECIPIENTS[4]
    }

    const emailPayload = {
      // to: recipientEmail,
      to: "dhruv.bhavsar@axonichealth.com",
      from: "info@axonichealth.com",
      subject: `New Contact Form Submission - ${product}`,
      data: htmlContent
    }

    try {
      const response = await fetch('https://ojw0jjra11.execute-api.ap-south-1.amazonaws.com/prod/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    const formData = new FormData(e.currentTarget)
    
    try {
      await sendEmail(formData)
      
      if (onSubmit) {
        onSubmit(formData)
      }
      
      setSubmitStatus('success')
      // Reset form on success using the ref
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">Message sent successfully!</p>
          <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">Failed to send message.</p>
          <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
        </div>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 w-full"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        We'll get back to you within 24 hours. Your information is secure and will not be shared.
      </p>
    </form>
  )
} 