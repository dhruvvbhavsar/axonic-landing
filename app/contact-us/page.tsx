"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { MapPin, Phone, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRY_CODES, findDialCodeByIso2, iso2ToFlagEmoji } from "@/lib/country-codes"

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const formRef = React.useRef<HTMLFormElement>(null)
  const [dialCode, setDialCode] = React.useState<string>("+1")
  const [selectedIso2, setSelectedIso2] = React.useState<string>("US")
  const [geo, setGeo] = React.useState<{ countryCode?: string; countryName?: string; ip?: string; callingCode?: string }>({})

  React.useEffect(() => {
    let isMounted = true
    const fetchGeo = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/')
        if (!res.ok) throw new Error('Failed to fetch geo')
        const data = await res.json()
        // ipapi fields: country_code, country_name, ip, country_calling_code
        const countryCode: string | undefined = data?.country_code
        const countryName: string | undefined = data?.country_name
        const ip: string | undefined = data?.ip
        const callingCode: string | undefined = data?.country_calling_code
        if (!isMounted) return
        const fallbackDial = findDialCodeByIso2(countryCode) || "+1"
        setGeo({ countryCode, countryName, ip, callingCode })
        setSelectedIso2(countryCode || "US")
        setDialCode((callingCode || fallbackDial) as string)
      } catch (e) {
        // Fallback to default
        if (!isMounted) return
        setGeo({})
        setSelectedIso2("US")
        setDialCode("+1")
      }
    }
    fetchGeo()
    return () => { isMounted = false }
  }, [])

  const sendEmail = async (formData: FormData) => {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const mobile = formData.get('mobile') as string
    const comment = formData.get('comment') as string
    const selectedDialCode = (formData.get('dialCode') as string) || dialCode
    const geoCountry = (formData.get('geoCountry') as string) || geo.countryName || ''
    const geoCountryCode = (formData.get('geoCountryCode') as string) || geo.countryCode || ''
    const ipAddress = (formData.get('ipAddress') as string) || geo.ip || ''

    // Create HTML formatted email content
    const htmlContent = `
      <h2>New Contact Us Form Submission</h2>
      <hr>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile Number:</strong> ${mobile ? `${selectedDialCode} ${mobile}` : 'Not provided'}</p>
      <p><strong>Detected Country:</strong> ${geoCountry || 'Unknown'}${geoCountryCode ? ` (${geoCountryCode})` : ''}</p>
      <p><strong>IP Address:</strong> ${ipAddress || 'Unknown'}</p>
      <p><strong>Comment/Questions:</strong></p>
      <p>${comment || 'No comment provided'}</p>
      <hr>
      <p><em>This message was sent from the Axonic Health contact us page.</em></p>
    `

    const emailPayload = {
      // to: "info@axonichealth.com;sales@axonichealth.com",
      to: 'dhruv.bhavsar@axonichealth.com',
      from: "info@axonichealth.com",
      subject: `New Contact Us Submission from ${name}`,
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
    // ensure geolocation fields are included even if JS Select isn't a native input
    formData.set('dialCode', dialCode)
    if (geo.countryName) formData.set('geoCountry', geo.countryName)
    if (geo.countryCode) formData.set('geoCountryCode', geo.countryCode)
    if (geo.ip) formData.set('ipAddress', geo.ip)
    
    try {
      await sendEmail(formData)
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
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader title="Contact Us" />
      
      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
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

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <div className="flex gap-2">
                  <Select
                    value={selectedIso2}
                    onValueChange={(iso) => {
                      setSelectedIso2(iso)
                      const newDial = findDialCodeByIso2(iso) || dialCode
                      setDialCode(newDial)
                    }}
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_CODES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {iso2ToFlagEmoji(c.code)} {c.name} ({c.dialCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    name="mobile"
                    type="tel"
                    placeholder={`Mobile Number (${dialCode})`}
                    className="w-full"
                  />
                </div>
                {/* Hidden inputs to submit geo data */}
                <input type="hidden" name="dialCode" value={dialCode} />
                <input type="hidden" name="selectedCountryCode" value={selectedIso2} />
                {geo.countryName ? <input type="hidden" name="geoCountry" value={geo.countryName} /> : null}
                {geo.countryCode ? <input type="hidden" name="geoCountryCode" value={geo.countryCode} /> : null}
                {geo.ip ? <input type="hidden" name="ipAddress" value={geo.ip} /> : null}
              </div>

              <div>
                <Textarea
                  name="comment"
                  placeholder="Comment / Questions"
                  className="w-full min-h-32"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-600 text-sm">Our sales manager will connect with you very soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">Failed to send message.</p>
                  <p className="text-red-600 text-sm">Please try again or contact us directly at info@axonichealth.com</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3"
              >
                {isSubmitting ? "Sending..." : "Submit"}
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
