import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { ProductTestimonialsSection } from "@/components/product-testimonials-section"
import HeroYouTubePlayer from "../axonscribe/hero-video"
import { Video, Activity, FileText, UserCheck, RefreshCw, Bell, Users, Globe } from "lucide-react"

type Feature = { title: string; description: string; image: string }

function OverviewSectionInner({
    product,
    videoId,
    features,
}: {
    product: any
    videoId: string
    features: Feature[]
}) {
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
                                Care, Anywhere — Instantly
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                                AxonHealthHub — Unified Healthcare Platform
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                                Connect patients to doctors, diagnostics, and follow-ups on a unified, compliant platform. Reduce wait times, eliminate data silos, and deliver continuous, coordinated care around the clock.
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
                                    Get Started
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

            {/* 3 Key Stats */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Transform Healthcare Delivery</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <Activity className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Reduce Diagnostic TAT</h4>
                            <p className="text-sm text-gray-600">From hours to minutes with real-time POCT and auto-sync</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <RefreshCw className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Eliminate Manual Handovers</h4>
                            <p className="text-sm text-gray-600">Auto-sync results directly to doctor EMR—no uploads</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                                <Bell className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Improve Follow-up Adherence</h4>
                            <p className="text-sm text-gray-600">Smart reminders boost patient engagement and outcomes</p>
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
                            Proven Impact
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Deliver Continuous, Coordinated Care
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join healthcare organizations transforming patient care with AxonHealthHub
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 24/7 Access Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">24<span className="text-4xl text-blue-600">/7</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Virtual Care Access</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Instant video consultations with certified doctors around the clock</p>
                            </div>
                        </div>

                        {/* Real-time Results Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-center mb-4">
                                        <span className="text-6xl font-extrabold text-gray-900">⚡</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Results</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Connected POCT devices with instant posting to EMR</p>
                            </div>
                        </div>

                        {/* Unified Record Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-center mb-4">
                                        <span className="text-6xl font-extrabold text-gray-900">🔗</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Unified Health Record</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Single source of truth across entire care ecosystem</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features - Full-width Zig-Zag */}
            <section id="key-features" className="py-10 sm:py-12 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-x-hidden">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Clinical Features</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive platform for virtual care, diagnostics, and patient engagement.</p>
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
                                            alt={`${feature.title} - AxonHealthHub feature showing ${feature.description.substring(0, 80)}...`}
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
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">ABDM-ready integration with enterprise-grade security certifications.</p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                    </div>

                    {/* Row 1: Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 items-center justify-items-center mb-12">
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/abdm.png" alt="ABDM Compliance - AxonHealthHub is fully compliant with India's digital health standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/gdpr.png" alt="GDPR Compliance - AxonHealthHub follows European data protection standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/hippa.png" alt="HIPAA Compliance - AxonHealthHub ensures healthcare data security and privacy" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/soc-2.png" alt="SOC 2 Compliance - AxonHealthHub meets enterprise security standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/iso.png" alt="ISO 27001 Certification - AxonHealthHub security certification" width={208} height={208} className="h-20 sm:h-28 lg:h-36 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Row 2: Additional certifications */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
                        <div className="flex items-center justify-center text-center">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <Video className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-bold text-gray-900 mb-2">ABDM Integration</h4>
                                <p className="text-sm text-gray-600">ABHA linking, consented data exchange, interoperable formats</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-center">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-bold text-gray-900 mb-2">Security & Audit</h4>
                                <p className="text-sm text-gray-600">Role-based access, audit trails, encryption in transit/at rest</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center text-center">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-bold text-gray-900 mb-2">Flexible Deployment</h4>
                                <p className="text-sm text-gray-600">Cloud or On-Premise as per organization policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pricing & CTA</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Modular pricing based on user volume, device integrations, and programs.</p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Contact Sales Card */}
                        <Card className="rounded-3xl border-2 border-blue-400 shadow-2xl relative h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Pricing</h3>
                                    <div className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</div>
                                    <p className="text-gray-600 mt-2 mb-6">Pricing tailored to your organization's needs</p>
                                    <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                        <li>✅ 24/7 virtual doctor access (video consults)</li>
                                        <li>✅ Connected diagnostics and POCT with real-time posting</li>
                                        <li>✅ Unified longitudinal health record</li>
                                        <li>✅ Integrated referrals and guided follow-ups</li>
                                        <li>✅ Auto-sync to doctor EMR (no manual report handover)</li>
                                        <li>✅ Smart reminders and digital engagement</li>
                                        <li>✅ Corporate/community program dashboards</li>
                                        <li>✅ Multilingual, secure, ABDM-ready</li>
                                    </ul>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Contact Sales</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Contact Sales Team</DialogTitle>
                                            <DialogDescription className="text-gray-600">Get in touch for custom pricing and solutions</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>

                        {/* Book Demo Card */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Book a Live Demo</h3>
                                    <p className="text-gray-600 mt-4 mb-6">See AxonHealthHub in action with a personalized demonstration</p>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Video className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Virtual Platform Tour</h4>
                                                <p className="text-sm text-gray-600">Walk through the entire platform with our experts</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                                <UserCheck className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Custom Use Cases</h4>
                                                <p className="text-sm text-gray-600">See how it fits your specific workflows</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Q&A Session</h4>
                                                <p className="text-sm text-gray-600">Get all your questions answered live</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => {
                                        const element = document.getElementById('schedule-demo')
                                        if (element) {
                                            const offsetTop = element.offsetTop - 140
                                            window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                                        }
                                    }}
                                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Schedule Demo
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-lg text-gray-700 font-medium mb-4">
                            Join the Axon network and enable continuous, data-driven care for your communities
                        </p>
                        <Button
                            onClick={() => {
                                const element = document.getElementById('schedule-demo')
                                if (element) {
                                    const offsetTop = element.offsetTop - 140
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                                }
                            }}
                            size="lg"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg"
                        >
                            Download Product Brochure
                        </Button>
                    </div>
                </div>
            </section>

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

