import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { ProductTestimonialsSection } from "@/components/product-testimonials-section"
import HeroYouTubePlayer from "./hero-video"
import { Building2, TrendingUp, Shield } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Feature = { title: string; description: string; image: string }

async function getUserRegion(): Promise<'UK' | 'India'> {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        if (data.country_code === 'IN') {
            return 'India'
        } else if (data.country_code === 'GB') {
            return 'UK'
        } else {
            return 'UK'
        }
    } catch (error) {
        console.warn('Failed to detect user location, defaulting to UK:', error)
        return 'UK'
    }
}

export function OverviewSection({
    product,
    videoId,
    features,
}: {
    product: any
    videoId: string
    features: Feature[]
}) {
    const [pricingRegion, setPricingRegion] = React.useState<'UK' | 'India'>("UK")
    const appRedirectUrl = product?.redirectUrl || "https://axonhis.axonichealth.com"

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
                                Hospital Operations, Unified
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                                AxonHIS — Complete Hospital Information System
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                                Run ER to Discharge on a single, compliant HIS. Coordinate teams, automate billing, and surface real-time insights—so you deliver faster, safer care while protecting revenue and scaling smoothly.
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
                                    View Pricing
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200">
                                            Book a Demo
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Schedule a Demo</DialogTitle>
                                            <DialogDescription className="text-gray-600">See AxonHIS in action. We'll get back to you within 24 hours</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <div className="relative lg:col-span-7">
                            <div className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_40%)]" />
                            <div className="relative overflow-hidden rounded-3xl border-2 border-gray-200 shadow-xl ring-1 ring-black/5 w-full">
                                <HeroYouTubePlayer videoId={videoId} title={`${product.name} Overview Video`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 Easy Steps - Setup Process */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Get Started in 3 Steps</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4 text-2xl font-bold">
                                1
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Share hospital profile</h4>
                            <p className="text-sm text-gray-600">Complete our onboarding form with your hospital details and requirements.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4 text-2xl font-bold">
                                2
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Environment setup</h4>
                            <p className="text-sm text-gray-600">We provision your environment and configure role mapping within 72 hours.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4 text-2xl font-bold">
                                3
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Training & go-live</h4>
                            <p className="text-sm text-gray-600">Department-wise training and dedicated support for seamless go-live.</p>
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
                            Transform Your Hospital Operations
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join leading healthcare organizations that have revolutionized their operations with AxonHIS
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Time Savings Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">40<span className="text-4xl text-blue-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Time Savings</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Save time across departments with streamlined workflows and automated processes</p>
                            </div>
                        </div>

                        {/* Patient Flow Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">
                                        <TrendingUp className="w-16 h-16 text-blue-600 mx-auto" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Better Patient Flow</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Improve ER-to-bed TAT and IPD turnover with smart triage and bed management</p>
                            </div>
                        </div>

                        {/* Revenue Protection Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">100<span className="text-4xl text-blue-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Charge Capture</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Protect revenue with automated charge capture linked to every clinical service</p>
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
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive HIS capabilities designed for modern healthcare delivery</p>
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
                                            alt={`${feature.title} - AxonHIS feature`}
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Security & Compliance</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            Operate on a standards-aligned platform for India and global healthcare
                        </p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                    </div>

                    {/* Compliance Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <Card className="rounded-3xl border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">ABDM Compliant</h3>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>• ABHA linking</li>
                                    <li>• Consented record sharing</li>
                                    <li>• Interoperable formats</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">HIPAA & GDPR</h3>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>• Role-based access</li>
                                    <li>• Comprehensive audit trails</li>
                                    <li>• End-to-end encryption</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Deployment</h3>
                                <ul className="text-left text-gray-700 space-y-2">
                                    <li>• Cloud hosting</li>
                                    <li>• On-premise option</li>
                                    <li>• Hybrid deployment</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/gdpr.png" alt="GDPR Compliance" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/hippa.png" alt="HIPAA Compliance" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/soc-2.png" alt="SOC 2 Compliance" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/iso.png" alt="ISO 27001 Certification" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-10 overflow-x-hidden px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">What Our Customers Say</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Hear from healthcare leaders who transformed their operations with AxonHIS
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="rounded-3xl border-0 shadow-lg">
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <div className="text-5xl text-blue-500 mb-4">"</div>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        ER to Discharge times improved significantly and missed charges were nearly eliminated. The unified platform has transformed how our teams collaborate.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">COO</div>
                                        <div className="text-gray-600 text-sm">300-bed Multispecialty Hospital</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-0 shadow-lg">
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <div className="text-5xl text-blue-500 mb-4">"</div>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Doctors love the unified EMR and the billing and coding are finally in sync. AxonHIS has become the backbone of our clinical operations.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Medical Director</div>
                                        <div className="text-gray-600 text-sm">Leading Healthcare Network</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Flexible Pricing</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            Modular pricing sized by bed-strength and modules. Custom solutions for hospitals of all sizes.
                        </p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Small Hospitals */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Small Hospitals</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-2">Custom</div>
                                    <p className="text-gray-600 mb-2">Up to 100 beds</p>
                                    <p className="text-gray-600 text-sm mb-6">Perfect for nursing homes and small hospitals</p>
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        <li>• Core EMR (OPD, IPD, ER)</li>
                                        <li>• Basic billing & pharmacy</li>
                                        <li>• Lab & radiology integration</li>
                                        <li>• Role-based access</li>
                                        <li>• Standard reports</li>
                                        <li>• Email support</li>
                                        <li>• Cloud deployment</li>
                                    </ul>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Contact Sales</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Get Custom Pricing</DialogTitle>
                                            <DialogDescription className="text-gray-600">Tell us about your hospital and we'll create a tailored solution</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>

                        {/* Medium Hospitals */}
                        <Card className="rounded-3xl border-2 border-blue-400 shadow-2xl relative h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white">Most Popular</div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Medium Hospitals</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-2">Custom</div>
                                    <p className="text-gray-600 mb-2">100-300 beds</p>
                                    <p className="text-gray-600 text-sm mb-6">Complete solution for multi-specialty hospitals</p>
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        <li>• Everything in Small plan</li>
                                        <li>• OT & ICU management</li>
                                        <li>• Advanced billing with charge capture</li>
                                        <li>• LIS, RIS/PACS, CSSD integration</li>
                                        <li>• Inventory & asset management</li>
                                        <li>• Real-time BI dashboards</li>
                                        <li>• Priority support</li>
                                        <li>• Custom templates</li>
                                        <li>• Cloud or on-premise</li>
                                    </ul>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Contact Sales</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Get Custom Pricing</DialogTitle>
                                            <DialogDescription className="text-gray-600">Tell us about your hospital and we'll create a tailored solution</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>

                        {/* Large Hospitals & Networks */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Large Hospitals & Networks</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-2">Enterprise</div>
                                    <p className="text-gray-600 mb-2">300+ beds or multi-site</p>
                                    <p className="text-gray-600 text-sm mb-6">Advanced features for health systems</p>
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        <li>• Everything in Medium plan</li>
                                        <li>• Multi-site management</li>
                                        <li>• Custom integrations & API</li>
                                        <li>• Advanced analytics & reporting</li>
                                        <li>• Dedicated success manager</li>
                                        <li>• White-labeling options</li>
                                        <li>• Priority phone support</li>
                                        <li>• Training & onboarding</li>
                                        <li>• Custom SLA</li>
                                        <li>• Global network opportunity</li>
                                    </ul>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Contact Enterprise</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Enterprise Solutions</DialogTitle>
                                            <DialogDescription className="text-gray-600">Let's discuss your multi-site healthcare system requirements</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Global Network CTA */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl text-center border border-blue-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Join the Axon Provider Ecosystem</h3>
                        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                            Be part of a global network of healthcare providers. Share best practices, benchmark performance, and access collaborative opportunities.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl">
                                    Learn More
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-gray-900">Join Our Network</DialogTitle>
                                    <DialogDescription className="text-gray-600">Discover the benefits of the Axon provider ecosystem</DialogDescription>
                                </DialogHeader>
                                <ContactForm productName={product.name} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-x-hidden">
                <div className="container mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Got Questions?
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know about AxonHIS. Can't find what you're looking for? Contact our team.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto mt-8 rounded-full"></div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="item-1" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">?</span>
                                        </div>
                                        How long does implementation take?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Standard implementations take 4-12 weeks depending on hospital size and complexity. We provision your environment within 72 hours and work with you on a phased go-live to minimize disruption. Enterprise deployments with custom integrations may take longer but include dedicated project management.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">🔒</span>
                                        </div>
                                        Is our data secure and compliant?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Absolutely. AxonHIS is ABDM, HIPAA, and GDPR compliant with role-based access, comprehensive audit trails, and encryption both in transit and at rest. We offer both cloud and on-premise deployment options to meet your security requirements. Regular security audits and DLP capabilities ensure your patient data is always protected.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">🔄</span>
                                        </div>
                                        Can AxonHIS integrate with our existing systems?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Yes! AxonHIS offers seamless integration with LIS, RIS/PACS, pharmacy systems, blood banks, CSSD, and more. We support standard healthcare protocols (HL7, FHIR, DICOM) and can build custom integrations for enterprise clients. Our API-first architecture makes connecting with third-party systems straightforward.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">💰</span>
                                        </div>
                                        How does the pricing work?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Pricing is modular and based on your hospital's bed strength, modules selected, and deployment preference. We offer transparent pricing with no hidden fees. Contact our sales team for a customized quote tailored to your specific needs. Enterprise customers can benefit from volume discounts and flexible payment terms.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">🌍</span>
                                        </div>
                                        Do you support multilingual interfaces?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Yes! AxonHIS supports multiple languages for both staff interfaces and patient-facing communications. This improves accessibility across diverse populations and ensures clear communication with all stakeholders. We can add additional languages based on your hospital's requirements.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">📞</span>
                                        </div>
                                        What kind of support do you provide?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    We offer comprehensive support including department-wise training, go-live support, email and phone assistance, and dedicated customer success managers for enterprise clients. Our support team understands hospital operations and can help you maximize the value of AxonHIS. We also provide regular system updates and feature enhancements.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Call to Action */}
                        <div className="text-center mt-12">
                            <p className="text-gray-600 mb-6">Ready to transform your hospital operations?</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200">
                                            Contact Sales
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Get in Touch</DialogTitle>
                                            <DialogDescription className="text-gray-600">Our team will help you find the perfect solution for your hospital</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                                <Button 
                                    onClick={() => {
                                        const element = document.getElementById('schedule-demo')
                                        if (element) {
                                            const offsetTop = element.offsetTop - 140
                                            window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                                        }
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200 shadow-lg"
                                >
                                    Book a Live Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



