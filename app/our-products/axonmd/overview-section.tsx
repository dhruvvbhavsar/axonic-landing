import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { CallButtonTertiary } from "@/components/call-button-tertiary"
import { ProductTestimonialsSection } from "@/components/product-testimonials-section"
import HeroYouTubePlayer from "../axonscribe/hero-video"
import { Download, Settings, User, Shield, Globe, Pill, Activity, Users, Zap } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRY_CODES } from "@/lib/country-codes"
import Link from "next/link"

type Feature = { title: string; description: string; image: string }

async function getUserRegion(): Promise<'UK' | 'India'> {
    try {
        // Use a free IP geolocation service
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        // Check if user is from India or UK
        if (data.country_code === 'IN') {
            return 'India'
        } else if (data.country_code === 'GB') {
            return 'UK'
        } else {
            return 'India' // Default to India for AxonMD
        }
    } catch (error) {
        console.warn('Failed to detect user location, defaulting to India:', error)
        return 'India'
    }
}

function OverviewSectionInner({
    product,
    videoId,
    features,
}: {
    product: any
    videoId: string
    features: Feature[]
}) {
    const [pricingRegion, setPricingRegion] = React.useState<'UK' | 'India'>("India")
    const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>("monthly")
    const appRedirectUrl = product?.redirectUrl || "https://axonmd.axonichealth.com"
    const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null)
    const [doctorDialogOpen, setDoctorDialogOpen] = React.useState(false)
    const [doctorPlan, setDoctorPlan] = React.useState<'professional' | 'advanced' | null>(null)
    const [doctorError, setDoctorError] = React.useState<string | null>(null)
    const [privateNetwork, setPrivateNetwork] = React.useState<boolean | null>(null)
    const [doctor, setDoctor] = React.useState({
        firstName: "",
        lastName: "",
        gender: "",
        speciality: "",
        country: "IN",
        registrationNumber: "",
        email: "",
        countryCode: "+91",
        phone: "",
    })
    const [apiCountries, setApiCountries] = React.useState<any[]>([])
    const [apiStates, setApiStates] = React.useState<any[]>([])
    const [apiCities, setApiCities] = React.useState<any[]>([])
    const [apiZones, setApiZones] = React.useState<any[]>([])
    const [selectedCountryId, setSelectedCountryId] = React.useState<number | null>(null)
    const [selectedStateId, setSelectedStateId] = React.useState<number | null>(null)
    const [selectedCityId, setSelectedCityId] = React.useState<number | null>(null)
    const [selectedZoneId, setSelectedZoneId] = React.useState<number | null>(null)
    const [loadingCountries, setLoadingCountries] = React.useState(false)
    const [loadingStates, setLoadingStates] = React.useState(false)
    const [loadingCities, setLoadingCities] = React.useState(false)
    const [loadingZones, setLoadingZones] = React.useState(false)
    const [specialities, setSpecialities] = React.useState<string[]>([])
    const [loadingSpecialities, setLoadingSpecialities] = React.useState(false)
    const [manageOpen, setManageOpen] = React.useState(false)
    const [manageEmail, setManageEmail] = React.useState("")
    const [manageSubmitting, setManageSubmitting] = React.useState(false)
    const [manageError, setManageError] = React.useState<string | null>(null)
    const [manageSuccess, setManageSuccess] = React.useState(false)

    const validateEmail = React.useCallback((email: string): boolean => {
        // Disallow '+' in local part (before @)
        const parts = email.split('@')
        if (parts.length !== 2) return false
        if (parts[0].includes('+')) return false
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }, [])

    const handleManageSubmit = React.useCallback(async () => {
        if (!manageEmail.trim()) {
            setManageError('Please enter your email address')
            return
        }
        if (!validateEmail(manageEmail)) {
            setManageError('Please enter a valid email address')
            return
        }

        setManageSubmitting(true)
        setManageError(null)
        setManageSuccess(false)

        try {
            // Check if email exists in system
            const checkRes = await fetch('/api/external/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailId: manageEmail })
            })
            const checkData = await checkRes.json()
            
            if (checkData?.code === 'noData') {
                setManageError('No account found with this email. Please start a trial first or contact support.')
                return
            }

            // Send magic link
            const response = await fetch('/api/manage/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: manageEmail, registrationNumber: doctor.registrationNumber })
            })
            
            if (!response.ok) {
                throw new Error('Failed to send link')
            }
            
            setManageSuccess(true)
            setManageEmail('')
        } catch (e) {
            console.error(e)
            setManageError('Failed to send link. Please try again later.')
        } finally {
            setManageSubmitting(false)
        }
    }, [manageEmail, validateEmail])

    const resetManageDialog = React.useCallback(() => {
        setManageEmail('')
        setManageError(null)
        setManageSuccess(false)
        setManageSubmitting(false)
    }, [])

    React.useEffect(() => {
        if (!doctorDialogOpen) return
        let cancelled = false
        const fetchSpecialities = async () => {
            setLoadingSpecialities(true)
            try {
                const res = await fetch('/api/specialties')
                if (!res.ok) throw new Error('Failed to load specialities')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list as string[] : []
                if (!cancelled) setSpecialities(list)
            } catch (e) {
                console.warn('Failed to fetch specialities', e)
                if (!cancelled) setSpecialities([])
            } finally {
                if (!cancelled) setLoadingSpecialities(false)
            }
        }
        fetchSpecialities()
        return () => { cancelled = true }
    }, [doctorDialogOpen])

    // Fetch countries when private network is selected
    React.useEffect(() => {
        if (privateNetwork !== true) return
        let cancelled = false
        const fetchCountries = async () => {
            setLoadingCountries(true)
            try {
                const res = await fetch('/api/address/countries')
                if (!res.ok) throw new Error('Failed to load countries')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list : []
                if (!cancelled) setApiCountries(list)
            } catch (e) {
                console.warn('Failed to fetch countries', e)
                if (!cancelled) setApiCountries([])
            } finally {
                if (!cancelled) setLoadingCountries(false)
            }
        }
        fetchCountries()
        return () => { cancelled = true }
    }, [privateNetwork])

    // Fetch zones when private network is selected
    React.useEffect(() => {
        if (privateNetwork !== true) return
        let cancelled = false
        const fetchZones = async () => {
            setLoadingZones(true)
            try {
                const res = await fetch('/api/zones')
                if (!res.ok) throw new Error('Failed to load zones')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list : []
                if (!cancelled) setApiZones(list)
            } catch (e) {
                console.warn('Failed to fetch zones', e)
                if (!cancelled) setApiZones([])
            } finally {
                if (!cancelled) setLoadingZones(false)
            }
        }
        fetchZones()
        return () => { cancelled = true }
    }, [privateNetwork])

    // Fetch states when country is selected
    React.useEffect(() => {
        if (!selectedCountryId) {
            setApiStates([])
            setSelectedStateId(null)
            setApiCities([])
            setSelectedCityId(null)
            return
        }
        let cancelled = false
        const fetchStates = async () => {
            setLoadingStates(true)
            try {
                const res = await fetch(`/api/address/states?countryId=${selectedCountryId}`)
                if (!res.ok) throw new Error('Failed to load states')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list : []
                if (!cancelled) setApiStates(list)
            } catch (e) {
                console.warn('Failed to fetch states', e)
                if (!cancelled) setApiStates([])
            } finally {
                if (!cancelled) setLoadingStates(false)
            }
        }
        fetchStates()
        return () => { cancelled = true }
    }, [selectedCountryId])

    // Fetch cities when state is selected
    React.useEffect(() => {
        if (!selectedStateId) {
            setApiCities([])
            setSelectedCityId(null)
            return
        }
        let cancelled = false
        const fetchCities = async () => {
            setLoadingCities(true)
            try {
                const res = await fetch(`/api/address/cities?stateId=${selectedStateId}`)
                if (!res.ok) throw new Error('Failed to load cities')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list : []
                if (!cancelled) setApiCities(list)
            } catch (e) {
                console.warn('Failed to fetch cities', e)
                if (!cancelled) setApiCities([])
            } finally {
                if (!cancelled) setLoadingCities(false)
            }
        }
        fetchCities()
        return () => { cancelled = true }
    }, [selectedStateId])

    // Set default pricing region based on user IP
    React.useEffect(() => {
        getUserRegion().then(region => {
            setPricingRegion(region)
        })
    }, [])

    return (
        <div id="overview">
            {/* Overview Hero */}
            <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-100/40 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Copy */}
                        <div className="space-y-5 lg:col-span-5">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm md:text-base font-semibold">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Clinic Management Made Simple
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                                AxonMD — Complete Clinic Management Platform
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                            Globalize your clinic practice with a complete AI enabled EMR. Cut documentation time with powerful voice AI and smart tools, reach patients across borders without language barriers, run your practise with custom templates for prescription, order sets so you can focus on what matters most—your patients.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    onClick={() => {
                                        const element = document.getElementById('pricing')
                                        if (element) {
                                            const offsetTop = element.offsetTop - 140
                                            window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                                        }
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200 shadow-lg"
                                >
                                    Start Now
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200">
                                            Learn More
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Get More Information</DialogTitle>
                                            <DialogDescription className="text-gray-600">Send us a message and we'll get back to you within 24 hours</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {/* Store buttons (mobile/tablet) */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:hidden">
                                <div className="flex items-center gap-4">
                                    <a href="https://apps.apple.com/us/app/axonmd/id6747614807" aria-label="Download on the App Store" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-apple.svg" alt="Download on the App Store" width={160} height={24} />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=com.doctormobileapp" aria-label="Get it on Google Play" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-google.svg" alt="Get it on Google Play" width={160} height={24} />
                                    </a>
                                    <a href="https://axonmd.axonichealth.co.in" aria-label="Get it on Web" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-web.svg" alt="Get it on Web" width={160} height={24} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:col-span-7">
                            <div className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_40%)]" />
                            {/* Store buttons (desktop) */}
                            <div className="hidden lg:flex items-center gap-4 mb-4">
                                <a href="https://apps.apple.com/us/app/axonmd/id6747614807" aria-label="Download on the App Store" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                    <Image src="/badges/download-apple.svg" alt="Download on the App Store" width={200} height={30} />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.doctormobileapp" aria-label="Get it on Google Play" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                    <Image src="/badges/download-google.svg" alt="Get it on Google Play" width={200} height={30} />
                                </a>
                                <a href="https://axonmd.axonichealth.co.in/" aria-label="Get it on Web" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                    <Image src="/badges/download-web.svg" alt="Get it on Web" width={200} height={30} />
                                </a>
                            </div>
                            <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200 shadow-xl ring-1 ring-black/5 w-full">
                                <HeroYouTubePlayer videoId={videoId} title={`${product.name} Overview Video`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Easy Steps */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Get Started in 3 Steps</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <User className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Fill Google Form</h4>
                            <p className="text-sm text-gray-600">Complete our simple onboarding form to get started.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <Settings className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Activate in 2 hours</h4>
                            <p className="text-sm text-gray-600">Our team will activate your account within 2 hours.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <Activity className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Start consulting</h4>
                            <p className="text-sm text-gray-600">Begin managing your clinic with AxonMD immediately.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Proven Results
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Transform Your Practice With Measurable Impact
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join thousands of healthcare professionals who have revolutionized their workflow with AxonMD
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 50% Time Saving Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">50<span className="text-4xl text-blue-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Time Savings</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Cut documentation time by 50% with voice AI and smart automation tools</p>
                            </div>
                        </div>

                        {/* 2x Patient Capacity Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">2<span className="text-4xl text-blue-600">x</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Capacity</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Scale up your practice and serve twice as many patients</p>
                            </div>
                        </div>

                        {/* 25% Cost Reduction Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">25<span className="text-4xl text-blue-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Reduction</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Reduce operational costs by 25% through streamlined workflows</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features - Full-width Zig-Zag */}
            <section id="key-features" className="py-10 sm:py-12 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-x-hidden">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Explore AxonMD's comprehensive clinic management capabilities.</p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                    </div>
                </div>

                <div className="w-full">
                    {features.map((feature, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div
                                key={index}
                                className={`${isEven ? 'bg-gradient-to-br from-blue-50 via-white to-blue-100/60' : 'bg-gradient-to-bl from-blue-50 via-white to-blue-100/60'} grid grid-cols-1 md:grid-cols-12 items-stretch`}
                            >
                                {/* Image (smaller), alternates left/right */}
                                <div
                                    className={`${isEven ? 'order-1' : 'order-1 md:order-2'} md:col-span-5 relative`}
                                >
                                    <div className="relative w-full h-60 sm:h-80 md:h-[448px] lg:h-[512px] xl:h-[576px]">
                                        <Image
                                            src={feature.image}
                                            alt={`${feature.title} - AxonMD clinic management feature showing ${feature.description.substring(0, 80)}...`}
                                            fill
                                            className="object-contain rounded-none"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                        />
                                    </div>
                                </div>

                                {/* Content (larger) */}
                                <div
                                    className={`${isEven ? 'order-2' : 'order-2 md:order-1'} md:col-span-7 flex items-center`}
                                >
                                    <div className="px-6 sm:px-10 lg:px-16 py-10 md:py-16">
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Compliance & Certifications */}
            <section id="compliance" className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Security and Compliance</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Full ABDM Compliance with enterprise-grade security certifications.</p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                    </div>

                    {/* Row 1: Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 items-center justify-items-center mb-12">
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/abdm.png" alt="ABDM Compliance - AxonMD is fully compliant with India's digital health standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/gdpr.png" alt="GDPR Compliance - AxonMD follows European data protection standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/hippa.png" alt="HIPAA Compliance - AxonMD ensures healthcare data security and privacy" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/soc-2.png" alt="SOC 2 Compliance - AxonMD meets enterprise security standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/iso.png" alt="ISO 27001 Certification - AxonMD security certification" width={208} height={208} className="h-20 sm:h-28 lg:h-36 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Row 2: Additional certifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-center">

                        <div className="flex items-center justify-center text-center">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-bold text-gray-900 mb-2">Full ABDM Compliant</h4>
                                <p className="text-sm text-gray-600">Built for India's digital health ecosystem with ABHA number generation and consent-based sharing</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-center">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-bold text-gray-900 mb-2">Global Standards</h4>
                                <p className="text-sm text-gray-600">Enterprise-grade security with HIPAA, GDPR, SOC 2, and ISO certifications</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Get started with our comprehensive clinic management platform.</p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                        <div className="mt-3">
                            <button className="text-sm underline text-blue-600" onClick={() => setManageOpen(true)}>
                                Manage subscriptions
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-white p-1 shadow-sm">
                            <Button
                                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                                className={`${billingCycle === 'monthly' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''} rounded-full h-9 px-4`}
                                onClick={() => setBillingCycle('monthly')}
                            >
                                Monthly
                            </Button>
                            <Button
                                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                                className={`${billingCycle === 'yearly' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''} rounded-full h-9 px-4`}
                                onClick={() => setBillingCycle('yearly')}
                            >
                                Yearly
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Professional Plan */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
                                {pricingRegion === 'UK' ? (
                                    billingCycle === 'monthly' ? (
                                        <>
                                            <div className="text-4xl font-extrabold text-gray-900">£100<span className="text-base font-medium text-gray-600">/month</span></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-sm line-through text-gray-400">£100/month</div>
                                            <div className="text-4xl font-extrabold text-gray-900">£60<span className="text-base font-medium text-gray-600">/month (billed yearly)</span></div>
                                            <div className="text-xs text-gray-500">Equivalent to £720/year</div>
                                        </>
                                    )
                                ) : (
                                    billingCycle === 'monthly' ? (
                                        <>
                                            <div className="text-4xl font-extrabold text-gray-900">₹2,000<span className="text-base font-medium text-gray-600">/month</span></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-sm line-through text-gray-400">₹2,000/month</div>
                                            <div className="text-4xl font-extrabold text-gray-900">₹1,250<span className="text-base font-medium text-gray-600">/month (billed yearly)</span></div>
                                            <div className="text-xs text-gray-500">Equivalent to ₹15,000/year</div>
                                        </>
                                    )
                                )}
                                <p className="text-gray-600 mt-2">Complete clinic management solution</p>
                                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                    <li>✅ Cloud EMR</li>
                                    <li>✅ Appointment management & scheduling</li>
                                    <li>✅ E‑prescriptions</li>
                                    <li>✅ Patient portal</li>
                                    <li>✅ Video consultation via CliniTalk</li>
                                    <li>✅ Smart AI buttons</li>
                                    <li>✅ Axona – Ambient Scribe</li>
                                    <li>✅ Customizable template engine</li>
                                    <li>✅ Billing service</li>
                                </ul>
                                </div>
                                <Button
                                    className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white"
                                    disabled={loadingPlan === 'professional'}
                                    onClick={() => { setDoctorPlan('professional'); setDoctorDialogOpen(true) }}
                                >
                                    {loadingPlan === 'professional' ? 'Redirecting…' : 'Start 90 Day Free Trial'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Advanced Plan */}
                        <Card className="rounded-3xl border-2 border-blue-400 shadow-2xl relative h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="absolute -top-4 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg border-2 border-white">Most Popular</div>
                                <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">Advanced</h3>
                                    <span className="relative inline-block">
                                        <span className="absolute -inset-1 rounded-lg bg-blue-300 opacity-60 animate-pulse rotate-3 z-0"></span>
                                        <span className="relative inline-block px-3 py-1 rounded-lg text-white text-2xl font-extrabold bg-red-600 border-2 border-blue-400 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] -rotate-3 z-10">
                                            40% OFF
                                        </span>
                                        <span className="absolute inset-0 rounded-lg border-2 border-dashed border-white animate-pulse -rotate-3 z-20 pointer-events-none"></span>
                                    </span>
                                </div>
                                {pricingRegion === 'UK' ? (
                                    billingCycle === 'monthly' ? (
                                        <div className="text-4xl font-extrabold text-gray-900">£125<span className="text-base font-medium text-gray-600">/month</span></div>
                                    ) : (
                                        <>
                                            <div className="text-sm line-through text-gray-400">£125/month</div>
                                            <div className="text-4xl font-extrabold text-gray-900">£75<span className="text-base font-medium text-gray-600">/month (billed yearly)</span></div>
                                            <div className="text-xs text-gray-500">Equivalent to £900/year</div>
                                        </>
                                    )
                                ) : (
                                    billingCycle === 'monthly' ? (
                                        <div className="text-4xl font-extrabold text-gray-900">₹2,500<span className="text-base font-medium text-gray-600">/month</span></div>
                                    ) : (
                                        <>
                                            <div className="text-sm line-through text-gray-400">₹2,500/month</div>
                                            <div className="text-4xl font-extrabold text-gray-900">₹1,500<span className="text-base font-medium text-gray-600">/month (billed yearly)</span></div>
                                            <div className="text-xs text-gray-500">Equivalent to ₹18,000/year</div>
                                        </>
                                    )
                                )}
                                <p className="text-gray-600 mt-2">Everything in Professional, plus add‑ons</p>
                                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                    <li>✅ All Professional features</li>
                                    <li>Patient app with Clinic/Doctor branding</li>
                                </ul>
                                </div>
                                <Button
                                    className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white"
                                    disabled={loadingPlan === 'advanced'}
                                    onClick={() => { setDoctorPlan('advanced'); setDoctorDialogOpen(true) }}
                                >
                                    {loadingPlan === 'advanced' ? 'Redirecting…' : 'Start 90 Day Free Trial'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Enterprise Plan */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                                <div className="text-4xl font-extrabold text-gray-900">Contact Us</div>
                                <p className="text-gray-600 mt-2">Advanced features for hospitals and multi‑clinic networks</p>
                                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                    <li>✅ Everything in Advanced</li>
                                    <li>✅ Multi‑clinic management</li>
                                    <li>✅ Advanced analytics & reporting</li>
                                    <li>✅ Custom integrations & API access</li>
                                    <li>➕ Patient app with Hospital branding</li>
                                    <li>➕ Integration with HIMS through API</li>
                                    <li>➕ Integration with Pharmacy through API</li>
                                    <li>➕ Integration with Lab through API</li>
                                </ul>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Contact Sales</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Contact Enterprise Sales</DialogTitle>
                                            <DialogDescription className="text-gray-600">Get in touch with our enterprise team for custom pricing and solutions</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Doctor Details Dialog */}
            <Dialog open={doctorDialogOpen} onOpenChange={(open) => {
                setDoctorDialogOpen(open)
                if (!open) {
                    setDoctorError(null)
                    setPrivateNetwork(null)
                    setSelectedCountryId(null)
                    setSelectedStateId(null)
                    setSelectedCityId(null)
                    setSelectedZoneId(null)
                }
            }}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">Start Your 90 Day Free Trial</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            {privateNetwork === null ? 'Choose your network preference' : 'Enter your details to get started with AxonMD'}
                        </DialogDescription>
                    </DialogHeader>
                    {doctorError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm font-medium">{doctorError}</p>
                        </div>
                    )}

                    {/* Private Network Selection */}
                    {privateNetwork === null ? (
                        <div className="space-y-6 py-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Do you want to go with a private network or axoncare network?
                                </h3>
                                <p className="text-sm text-gray-600 mb-6">
                                    Private network allows you to manage your clinic within a dedicated network infrastructure
                                </p>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    onClick={() => setPrivateNetwork(true)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 px-12 rounded-xl text-lg"
                                >
                                    Yes
                                </Button>
                                <Button
                                    onClick={() => setPrivateNetwork(false)}
                                    variant="outline"
                                    className="border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-6 px-12 rounded-xl text-lg"
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name <span className="text-red-500">*</span></Label>
                            <Input 
                                id="firstName" 
                                value={doctor.firstName} 
                                onChange={(e) => setDoctor(d => ({ ...d, firstName: e.target.value }))} 
                                className="mt-1"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name <span className="text-red-500">*</span></Label>
                            <Input 
                                id="lastName" 
                                value={doctor.lastName} 
                                onChange={(e) => setDoctor(d => ({ ...d, lastName: e.target.value }))} 
                                className="mt-1"
                                placeholder="Enter last name"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></Label>
                            <Select value={doctor.gender} onValueChange={(v) => setDoctor(d => ({ ...d, gender: v }))}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Speciality <span className="text-red-500">*</span></Label>
                            <Select value={doctor.speciality} onValueChange={(v) => setDoctor(d => ({ ...d, speciality: v }))}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder={loadingSpecialities ? 'Loading…' : 'Select speciality'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {specialities.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="regNo" className="text-sm font-medium text-gray-700">GMC / Medical Registration No. <span className="text-red-500">*</span></Label>
                            <Input 
                                id="regNo" 
                                value={doctor.registrationNumber} 
                                onChange={(e) => setDoctor(d => ({ ...d, registrationNumber: e.target.value }))} 
                                className="mt-1"
                                placeholder="Enter registration number"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></Label>
                            <Input 
                                id="email" 
                                type="email" 
                                value={doctor.email} 
                                onChange={(e) => {
                                    const value = e.target.value
                                    const [local, domain] = value.split('@')
                                    if (local && local.includes('+')) return
                                    setDoctor(d => ({ ...d, email: value }))
                                }} 
                                className="mt-1"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></Label>
                            {privateNetwork ? (
                                <Select 
                                    value={selectedCountryId?.toString() || ""} 
                                    onValueChange={(v) => {
                                        const countryId = parseInt(v)
                                        setSelectedCountryId(countryId)
                                        const country = apiCountries.find(c => c.countryId === countryId)
                                        if (country) {
                                            setDoctor(d => ({ ...d, country: country.countryName }))
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder={loadingCountries ? "Loading..." : "Select country"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {apiCountries.map(country => (
                                            <SelectItem key={country.countryId} value={country.countryId.toString()}>
                                                {country.countryName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Select value={doctor.country} onValueChange={(v) => setDoctor(d => ({ ...d, country: v }))}>
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COUNTRY_CODES.map(cc => (
                                            <SelectItem key={cc.code} value={cc.code}>{cc.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        {privateNetwork && selectedCountryId && (
                            <>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">Zone <span className="text-red-500">*</span></Label>
                                    <Select 
                                        value={selectedZoneId?.toString() || ""} 
                                        onValueChange={(v) => setSelectedZoneId(parseInt(v))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder={loadingZones ? "Loading..." : "Select zone"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {apiZones.map(zone => (
                                                <SelectItem key={zone.zoneMasterId} value={zone.zoneMasterId.toString()}>
                                                    {zone.zoneDesc}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></Label>
                                    <Select 
                                        value={selectedStateId?.toString() || ""} 
                                        onValueChange={(v) => setSelectedStateId(parseInt(v))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder={loadingStates ? "Loading..." : "Select state"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {apiStates.map(state => (
                                                <SelectItem key={state.stateId} value={state.stateId.toString()}>
                                                    {state.stateName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}
                        {privateNetwork && selectedStateId && (
                            <div className="sm:col-span-2">
                                <Label className="text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></Label>
                                <Select 
                                    value={selectedCityId?.toString() || ""} 
                                    onValueChange={(v) => setSelectedCityId(parseInt(v))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder={loadingCities ? "Loading..." : "Select city"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {apiCities.map(city => (
                                            <SelectItem key={city.cityId} value={city.cityId.toString()}>
                                                {city.cityName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Country code <span className="text-red-500">*</span></Label>
                            <Select value={doctor.countryCode} onValueChange={(v) => setDoctor(d => ({ ...d, countryCode: v }))}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select code" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COUNTRY_CODES.map(cc => (
                                        <SelectItem key={cc.code} value={cc.dialCode}>{cc.name} ({cc.dialCode})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></Label>
                            <Input 
                                id="phone" 
                                inputMode="numeric" 
                                value={doctor.phone} 
                                onChange={(e) => setDoctor(d => ({ ...d, phone: e.target.value.replace(/\D/g, '') }))} 
                                className="mt-1"
                                placeholder="Enter mobile number"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                        <Button 
                            variant="outline" 
                            onClick={() => setDoctorDialogOpen(false)}
                            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                if (!doctorPlan) return
                                setDoctorError(null)
                                
                                // Validate all required fields
                                if (!doctor.firstName.trim()) {
                                    setDoctorError('Please enter your first name')
                                    return
                                }
                                if (!doctor.lastName.trim()) {
                                    setDoctorError('Please enter your last name')
                                    return
                                }
                                if (!doctor.gender) {
                                    setDoctorError('Please select your gender')
                                    return
                                }
                                if (!doctor.speciality) {
                                    setDoctorError('Please select your speciality')
                                    return
                                }
                                if (!doctor.registrationNumber.trim()) {
                                    setDoctorError('Please enter your medical registration number')
                                    return
                                }
                                if (!doctor.email.trim()) {
                                    setDoctorError('Please enter your email address')
                                    return
                                }
                                if (!validateEmail(doctor.email)) {
                                    setDoctorError('Please enter a valid email address')
                                    return
                                }
                                if (!doctor.country) {
                                    setDoctorError('Please select your country')
                                    return
                                }
                                if (!doctor.countryCode) {
                                    setDoctorError('Please select your country code')
                                    return
                                }
                                if (!doctor.phone.trim()) {
                                    setDoctorError('Please enter your mobile number')
                                    return
                                }
                                if (doctor.phone.length < 8 || doctor.phone.length > 15) {
                                    setDoctorError('Please enter a valid mobile number')
                                    return
                                }
                                
                                // Validate private network fields
                                if (privateNetwork) {
                                    if (!selectedCountryId) {
                                        setDoctorError('Please select your country')
                                        return
                                    }
                                    if (!selectedZoneId) {
                                        setDoctorError('Please select your zone')
                                        return
                                    }
                                    if (!selectedStateId) {
                                        setDoctorError('Please select your state')
                                        return
                                    }
                                    if (!selectedCityId) {
                                        setDoctorError('Please select your city')
                                        return
                                    }
                                }
                                
                                try {
                                    setLoadingPlan(doctorPlan)
                                    // Check external email existence
                                    const checkRes = await fetch('/api/external/check-email', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ emailId: doctor.email, registrationNumber: doctor.registrationNumber })
                                    })
                                    const check = await checkRes.json()
                                    if (check?.code !== 'noData') {
                                        setDoctorError('An account with this email already exists. Please use "Manage subscriptions" to update your plan or contact support.')
                                        setLoadingPlan(null)
                                        return
                                    }
                                    
                                    // Prepare payload
                                    const payload: any = {
                                        plan: doctorPlan,
                                        billingCycle,
                                        region: pricingRegion,
                                        doctor,
                                        privateNetwork: privateNetwork || false,
                                        successUrl: `${window.location.origin}/our-products/axonmd/success/`,
                                        cancelUrl: `${window.location.origin}/our-products/axonmd/`,
                                    }
                                    
                                    // Add unitMasterDto if private network
                                    if (privateNetwork && selectedCountryId && selectedStateId && selectedCityId && selectedZoneId) {
                                        payload.unitMasterDto = {
                                            countryId: selectedCountryId,
                                            stateId: selectedStateId,
                                            cityId: selectedCityId,
                                            zoneId: selectedZoneId
                                        }
                                    }
                                    
                                    const response = await fetch('/api/checkout', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(payload),
                                    })
                                    const data = await response.json()
                                    if (!response.ok) throw new Error(data?.error || 'Checkout failed')
                                    if (data?.url) window.location.href = data.url
                                } catch (e) {
                                    console.error(e)
                                    setDoctorError('Failed to start checkout. Please try again later.')
                                    setLoadingPlan(null)
                                } finally {
                                    if (loadingPlan) {
                                        setLoadingPlan(null)
                                        setDoctorDialogOpen(false)
                                    }
                                }
                            }}
                            disabled={loadingPlan !== null}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300"
                        >
                            {loadingPlan ? 'Processing…' : 'Submit'}
                        </Button>
                    </div>
                    </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Manage Subscriptions Dialog */}
            <Dialog open={manageOpen} onOpenChange={(open) => {
                setManageOpen(open)
                if (!open) resetManageDialog()
            }}>
                <DialogContent className="sm:max-w-[520px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">Manage Your Subscription</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Enter your email address and we'll send you a secure link to manage your AxonMD subscription
                        </DialogDescription>
                    </DialogHeader>
                    
                    {manageSuccess ? (
                        <div className="space-y-6">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800 font-medium">Link sent successfully!</p>
                                <p className="text-green-600 text-sm mt-1">
                                    Check your email for a secure link to manage your subscription. The link will expire in 2 hours.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={() => setManageOpen(false)}>Close</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="manageEmail">Email Address</Label>
                                <Input 
                                    id="manageEmail" 
                                    type="email" 
                                    value={manageEmail} 
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const [local] = value.split('@')
                                        if (local && local.includes('+')) return
                                        setManageEmail(value)
                                    }}
                                    placeholder="Enter your registered email"
                                    className="w-full"
                                    disabled={manageSubmitting}
                                />
                                {manageError && (
                                    <p className="text-sm text-red-600">{manageError}</p>
                                )}
                            </div>
                            
                            <div className="flex gap-3 justify-end">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setManageOpen(false)}
                                    disabled={manageSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={handleManageSubmit}
                                    disabled={manageSubmitting}
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    {manageSubmitting ? 'Sending...' : 'Send Secure Link'}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Testimonials */}
            <section className="py-10 overflow-x-hidden px-4 sm:px-6 lg:px-8">
                <ProductTestimonialsSection
                    testimonialUrl={product.testimonialUrl}
                    productName={product.name}
                    additionalVideos={[]}
                />
            </section>
        </div>
    )
}

export const OverviewSection = React.memo(OverviewSectionInner)
