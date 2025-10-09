import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { CallButtonTertiary } from "@/components/call-button-tertiary"
import { ProductTestimonialsSection } from "@/components/product-testimonials-section"
import HeroYouTubePlayer from "./hero-video"
import { Download, Settings, Pencil } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
            return 'UK' // Default to UK for all other countries
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
    const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>("monthly")
    const appRedirectUrl = product?.redirectUrl || "https://axonscribe.axonichealth.com"

    // Set default pricing region based on user IP
    React.useEffect(() => {
        getUserRegion().then(region => {
            setPricingRegion(region)
        })
    }, [])
    return (
        <div id="overview">
            {/* Overview Hero */}
            <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100/40 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* Copy */}
                        <div className="space-y-5 lg:col-span-5">
                            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm md:text-base font-semibold">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                Less Typing. More Healing.
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                                AxonScribe AI — Your Intelligent Medical Scribe
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                                Transform your clinical workflow with AxonScribe AI, the intelligent medical scribe that automates documentation, streamlines patient management, and gives you back valuable time.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
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
                                    <a href="https://apps.apple.com/us/app/axonscribe/id6747614807" aria-label="Download on the App Store" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-apple.svg" alt="Download on the App Store" width={160} height={24} />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=app.axonscribe.axonic" aria-label="Get it on Google Play" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-google.svg" alt="Get it on Google Play" width={160} height={24} />
                                    </a>
                                    <a href="https://axonscribe.axonichealth.co.in/auth/" aria-label="Get it on Web" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-web.svg" alt="Get it on Web" width={160} height={24} />
                                    </a>
                                </div>
                                {/* <a href={appRedirectUrl} className="inline-flex" target="_self" rel="noopener noreferrer">
                                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-lg">
                                        Start Now
                                    </Button>
                                </a> */}
                            </div>
                        </div>

                        <div className="relative lg:col-span-7">
                            <div className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.25),transparent_40%)]" />
                            {/* Store buttons (desktop) */}
                            <div className="hidden lg:flex items-center gap-4 mb-4">
                                <a href="https://apps.apple.com/us/app/axonscribe/id6747614807" aria-label="Download on the App Store" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                    <Image src="/badges/download-apple.svg" alt="Download on the App Store" width={200} height={30} />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=app.axonscribe.axonic" aria-label="Get it on Google Play" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                    <Image src="/badges/download-google.svg" alt="Get it on Google Play" width={200} height={30} />
                                </a>
                                <a href="https://axonscribe.axonichealth.co.in/auth/" aria-label="Get it on Web" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
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
                            <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mb-4">
                                <Download className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Download the app</h4>
                            <p className="text-sm text-gray-600">Install AxonScribe from the App Store or Google Play.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mb-4">
                                <Settings className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Set up your account</h4>
                            <p className="text-sm text-gray-600">Create your profile and choose your specialty templates.</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mb-4">
                                <Pencil className="w-7 h-7" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Start scribing</h4>
                            <p className="text-sm text-gray-600">Begin recording consultations and generate structured notes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-yellow-50 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            Proven Results
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            Transform Your Practice With Measurable Impact
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Join thousands of healthcare professionals who have revolutionized their workflow with AxonScribe
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 50% Saving Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">50+<span className="text-4xl text-yellow-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Savings</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Reduce operational costs by eliminating manual transcription and streamlining documentation workflow</p>
                            </div>
                        </div>

                        {/* 40% Time Reduction Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">40<span className="text-4xl text-yellow-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Time Reduction</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Cut documentation time by 40% and spend more quality time with your patients</p>
                            </div>
                        </div>

                        {/* 95% Accuracy Card */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-4">95+<span className="text-4xl text-yellow-600">%</span></div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Accuracy Rate</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">Industry-leading accuracy ensures reliable medical documentation you can trust</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features - Full-width Zig-Zag */}
            <section id="key-features" className="py-10 sm:py-12 bg-gradient-to-b from-yellow-50 via-white to-yellow-50 overflow-x-hidden">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Explore AxonScribe capabilities in a clean, easy-to-read layout.</p>
                        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
                    </div>
                </div>

                <div className="w-full">
                    {features.map((feature, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div
                                key={index}
                                className={`${isEven ? 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100/60' : 'bg-gradient-to-bl from-yellow-50 via-white to-yellow-100/60'} grid grid-cols-1 md:grid-cols-12 items-stretch`}
                            >
                                {/* Image (smaller), alternates left/right */}
                                <div
                                    className={`${isEven ? 'order-1' : 'order-1 md:order-2'} md:col-span-5 relative`}
                                >
                                    <div className="relative w-full h-60 sm:h-80 md:h-[448px] lg:h-[512px] xl:h-[576px]">
                                        <Image
                                            src={feature.image}
                                            alt={`${feature.title} - AxonScribe AI medical scribe feature showing ${feature.description.substring(0, 80)}...`}
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
            {/* Compliance & Certifications + Getting Started */}
            <section id="compliance" className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Compliance & Certifications</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">We take privacy and security seriously to protect patient data.</p>
                        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
                    </div>

                    {/* Row 1: Badges (20% smaller) */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 items-center justify-items-center mb-12">
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/gdpr.png" alt="GDPR Compliance - AxonScribe medical AI follows European data protection standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/hippa.png" alt="HIPAA Compliance - AxonScribe ensures healthcare data security and privacy" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/soc-2.png" alt="SOC 2 Compliance - AxonScribe medical scribe meets enterprise security standards" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image src="/abdm/iso.png" alt="ISO 27001 Certification - AxonScribe AI medical documentation security certification" width={208} height={208} className="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Apps Available */}
            <section id="mobile-apps" className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            Mobile Apps Available
                        </div>
                        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">Take AxonScribe Anywhere</h2>
                        <p className="mt-3 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Access your medical documentation tools on the go with our native mobile apps</p>
                        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        {/* Left: Why use the mobile app */}
                        <div className="md:col-span-7">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Why Use the Mobile App?</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center ring-1 ring-yellow-100">
                                        <Image src="/file.svg" alt="Offline Recording" width={20} height={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Offline Recording</div>
                                        <p className="text-gray-600">Record patient encounters even without internet connection</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center ring-1 ring-yellow-100">
                                        <Image src="/window.svg" alt="Native Camera Integration" width={20} height={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Native Camera Integration</div>
                                        <p className="text-gray-600">Seamlessly capture and attach medical photos</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center ring-1 ring-yellow-100">
                                        <Image src="/globe.svg" alt="Optimized Performance" width={20} height={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Optimized Performance</div>
                                        <p className="text-gray-600">Faster transcription and smoother user experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Store Badges */}
                        <div className="md:col-span-5 flex md:justify-center">
                            <div className="flex flex-col md:flex-col items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <a href="https://apps.apple.com/us/app/axonscribe/id6747614807" aria-label="Download on the App Store" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-apple.svg" alt="Download on the App Store" width={240} height={72} />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=app.axonscribe.axonic" aria-label="Get it on Google Play" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-google.svg" alt="Get it on Google Play" width={240} height={72} />
                                    </a>
                                    <a href="https://axonscribe.axonichealth.co.in/auth/" aria-label="Get it on Web" className="transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                                        <Image src="/badges/download-web.svg" alt="Get it on Google Play" width={240} height={72} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-10 overflow-x-hidden px-4 sm:px-6 lg:px-8">
                <ProductTestimonialsSection 
                    testimonialUrl={product.testimonialUrl} 
                    productName={product.name}
                    additionalVideos={[
                        { id: 101, videoId: "MxTBBc_NYRo", title: "AxonScribe Testimonial 1" },
                        { id: 102, videoId: "UvZNW2DZhF4", title: "AxonScribe Testimonial 2" },
                    ]}
                />
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-x-hidden">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pricing</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Simple plans to get started, with powerful features as you grow.</p>
                        <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
                    </div>

                    {/* Region and Billing Switcher */}
                    {/* <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-white p-1 shadow-sm">
                            <Button
                                variant={pricingRegion === 'UK' ? 'default' : 'ghost'}
                                className={`${pricingRegion === 'UK' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : ''} rounded-full h-9 px-4`}
                                onClick={() => setPricingRegion('UK')}
                            >
                                UK
                            </Button>
                            <Button
                                variant={pricingRegion === 'India' ? 'default' : 'ghost'}
                                className={`${pricingRegion === 'India' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : ''} rounded-full h-9 px-4`}
                                onClick={() => setPricingRegion('India')}
                            >
                                India
                            </Button>
                        </div>
                    </div> */}

                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-white p-1 shadow-sm">
                            <Button
                                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                                className={`${billingCycle === 'monthly' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : ''} rounded-full h-9 px-4`}
                                onClick={() => setBillingCycle('monthly')}
                            >
                                Monthly
                            </Button>
                            <Button
                                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                                className={`${billingCycle === 'yearly' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : ''} rounded-full h-9 px-4`}
                                onClick={() => setBillingCycle('yearly')}
                            >
                                Yearly
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Starter */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                                <div className="text-4xl font-extrabold text-gray-900">{pricingRegion === 'UK' ? '£0' : '₹0'}<span className="text-base font-medium text-gray-600">/month</span></div>
                                <p className="text-gray-600 mt-2">Perfect for getting started with AI documentation</p>
                                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                    <li>5 documents per month</li>
                                    <li>Basic SOAP note templates</li>
                                    <li>Standard medical specialties</li>
                                    <li>Email support (48-hour response)</li>
                                    <li>GDPR compliant</li>
                                    <li>{pricingRegion === 'UK' ? 'UK data centers' : 'India data centers'}</li>
                                </ul>
                                </div>
                                <a href="https://axonscribe.axonichealth.co.in/auth/" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Start Free</Button>
                                </a>
                            </CardContent>
                        </Card>

                        {/* Professional */}
                        <Card className="rounded-3xl border-2 border-yellow-400 shadow-2xl relative h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="absolute -top-4 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg border-2 border-white">Most Popular</div>
                                <div className="absolute -top-4 right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold px-3 py-2 rounded-full shadow-lg border-2 border-white">First 3 months free</div>
                                <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">Professional</h3>
                                    {billingCycle === 'yearly' && (
                                        <span className="relative inline-block">
                                            <span className="absolute -inset-1 rounded-lg bg-yellow-300 opacity-60 animate-pulse rotate-3 z-0"></span>
                                            <span className="relative inline-block px-3 py-1 rounded-lg text-white text-2xl font-extrabold bg-red-600 border-2 border-yellow-400 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] -rotate-3 z-10">
                                                50% OFF
                                            </span>
                                            <span className="absolute inset-0 rounded-lg border-2 border-dashed border-white animate-pulse -rotate-3 z-20 pointer-events-none"></span>
                                        </span>
                                    )}
                                </div>
                                {pricingRegion === 'UK' ? (
                                    billingCycle === 'monthly' ? (
                                        <>
                                            <div className="text-sm line-through text-gray-400">£50/month</div>
                                            <div className="text-4xl font-extrabold text-gray-900">£0<span className="text-base font-medium text-gray-600">/month for first 3 months</span></div>
                                            <div className="text-lg font-bold text-red-600 mt-1">Then £50/month</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-sm line-through text-gray-400">£600/year</div>
                                            <div className="text-4xl font-extrabold text-gray-900">£0<span className="text-base font-medium text-gray-600">/month for first 3 months</span></div>
                                            <div className="text-lg font-bold text-red-600 mt-1">Then £25/month or £300/year</div>
                                        </>
                                    )
                                ) : (
                                    billingCycle === 'monthly' ? (
                                        <>
                                            <div className="text-sm line-through text-gray-400">₹1,000/month</div>
                                            <div className="text-4xl font-extrabold text-gray-900">₹0<span className="text-base font-medium text-gray-600">/month for first 3 months</span></div>
                                            <div className="text-lg font-bold text-red-600 mt-1">Then ₹1,000/month</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-sm line-through text-gray-400">₹12,000/year</div>
                                            <div className="text-4xl font-extrabold text-gray-900">₹0<span className="text-base font-medium text-gray-600">/month for first 3 months</span></div>
                                            <div className="text-lg font-bold text-red-600 mt-1">Then ₹500/month or ₹6,000/year</div>
                                        </>
                                    )
                                )}
                                <p className="text-gray-600 mt-2">Complete solution for individual practitioners</p>
                                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                    <li>Unlimited documents</li>
                                    <li>AI-powered transcription (99%+ accuracy)</li>
                                    <li>All medical specialty templates (50+ types)</li>
                                    <li>EMIS Health & TPP SystmOne integration</li>
                                    <li>Priority support (4-hour response)</li>
                                    <li>Advanced analytics dashboard</li>
                                    <li>{pricingRegion === 'UK' ? 'NHS compliance features' : 'NABH compliance features'}</li>
                                    <li>{pricingRegion === 'UK' ? 'UK data centers' : 'India data centers'}</li>
                                    <li>Custom templates</li>
                                    <li>GDPR compliance</li>
                                </ul>
                                </div>
                                <a href="https://axonscribe.axonichealth.co.in/auth/" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Start Free Trial</Button>
                                </a>
                            </CardContent>
                        </Card>

                        {/* Enterprise */}
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                                {pricingRegion === 'UK' ? (
                                    <div className="text-4xl font-extrabold text-gray-900">Custom<span className="text-base font-medium text-gray-600"> pricing</span></div>
                                ) : (
                                    <div className="text-4xl font-extrabold text-gray-900">Custom<span className="text-base font-medium text-gray-600"> pricing</span></div>
                                )}
                                <p className="text-gray-600 mt-2">Advanced features for clinics and health systems</p>
                                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                                    <li>Everything in Professional</li>
                                    <li>Multi-user accounts</li>
                                    <li>Team management dashboard</li>
                                    <li>Custom integrations & API access</li>
                                    <li>Advanced reporting & analytics</li>
                                    <li>Dedicated customer success manager</li>
                                    <li>HIPAA compliance audit support</li>
                                    <li>Custom branding options</li>
                                    <li>Priority phone support</li>
                                    <li>Training & onboarding</li>
                                </ul>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white">Contact Us</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Contact Enterprise Sales</DialogTitle>
                                            <DialogDescription className="text-gray-600">Get in touch with our enterprise team for custom pricing and solutions for your healthcare organization</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 overflow-x-hidden">
                <div className="container mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            Got Questions?
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to know to get started with AxonScribe. Can't find what you're looking for? Contact our support team.
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-8 rounded-full"></div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="item-1" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-yellow-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-yellow-600 font-bold text-sm">?</span>
                                        </div>
                                        How does AxonScribe handle patient data?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    AxonScribe follows strict security practices and complies with regional regulations like GDPR and HIPAA/NABH, ensuring your data stays protected. We use enterprise-grade encryption and secure cloud infrastructure to maintain the highest standards of data privacy and security.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-yellow-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">📱</span>
                                        </div>
                                        Can I use AxonScribe offline?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Yes! You can record patient encounters offline and sync securely once you're back online. This ensures you never miss a consultation, even in areas with poor connectivity. Your data is safely stored locally until it can be securely uploaded to our servers.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-yellow-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-600 font-bold text-sm">🩺</span>
                                        </div>
                                        What specialties are supported?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    AxonScribe includes templates across 50+ medical specialties including cardiology, dermatology, pediatrics, psychiatry, and many more. Our templates are constantly updated and can be customized to match your specific workflow and documentation requirements.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-yellow-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-600 font-bold text-sm">🚀</span>
                                        </div>
                                        Do you offer trials?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Absolutely! You can start with our free Starter plan to experience AxonScribe firsthand. Our Professional plan also includes a 3-month free trial with no credit card required. Upgrade anytime to unlock advanced features and unlimited usage.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-yellow-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-indigo-600 font-bold text-sm">💬</span>
                                        </div>
                                        How accurate is the AI transcription?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    AxonScribe achieves industry-leading 95%+ accuracy rates for medical transcription. Our AI is trained on millions of medical conversations and continuously learns from corrections. You can always review and edit transcriptions before finalizing patient records.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 hover:text-yellow-600 py-6 hover:no-underline">
                                    <span className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-red-600 font-bold text-sm">⚡</span>
                                        </div>
                                        How long does it take to get started?
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed pb-6 pl-11">
                                    Getting started is quick and easy! Download the app, create your account, and start recording within minutes. Our onboarding process guides you through setup, and you can begin using AxonScribe immediately. Training and customization are available for enterprise customers.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Call to Action */}
                        <div className="text-center mt-12">
                            <p className="text-gray-600 mb-6">Still have questions?</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200">
                                            Contact Support
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-gray-900">Get Support</DialogTitle>
                                            <DialogDescription className="text-gray-600">Our support team is here to help you get the most out of AxonScribe</DialogDescription>
                                        </DialogHeader>
                                        <ContactForm productName={product.name} />
                                    </DialogContent>
                                </Dialog>
                                <a href="https://axonscribe.axonichealth.co.in/auth/" target="_blank" rel="noopener noreferrer">
                                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200 shadow-lg">
                                        Try It Free
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


