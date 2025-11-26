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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRY_CODES } from "@/lib/country-codes"

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

async function getUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        return {
            country: data.country_name || data.country || '',
            countryCode: data.country_code || '',
            state: data.region || '',
            city: data.city || '',
            timezone: data.timezone || '',
            region_code: data.region_code || '',
        }
    } catch (error) {
        console.warn('Failed to detect user location:', error)
        return null
    }
}

async function checkSubdomainAvailability(subdomain: string, baseDomain: string): Promise<boolean> {
    try {
        const fullUrl = `${subdomain}.${baseDomain}`
        const response = await fetch(`https://dns.google/resolve?name=${fullUrl}`)
        const data = await response.json()
        
        // If no Answer, subdomain is available (not registered)
        return !data.Answer || data.Answer.length === 0
    } catch (error) {
        console.warn('DNS check failed:', error)
        // On error, assume available (don't block user)
        return true
    }
}

async function generateSubdomainSuggestions(organizationName: string, baseDomain: string): Promise<string[]> {
    const suggestions: string[] = []
    
    // Sanitize organization name for subdomain (alphanumeric only, lowercase)
    const sanitized = organizationName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .trim()
    
    if (!sanitized || sanitized.length < 2) {
        return []
    }
    
    // Base suggestions
    const baseSuggestions = [
        sanitized,
        sanitized.slice(0, 4),
        sanitized.slice(0, 3),
    ].filter(Boolean)
    
    // Suffixes to try if base is unavailable
    const suffixes = ['new', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    
    // Generate numeric suggestions
    for (let i = 0; i < 5; i++) {
        const randomNum = Math.floor(Math.random() * 900) + 100 // 100-999
        suggestions.push(randomNum.toString())
    }
    
    // Check availability for base suggestions
    for (const base of baseSuggestions) {
        if (suggestions.length >= 10) break
        
        const isAvailable = await checkSubdomainAvailability(base, baseDomain)
        if (isAvailable) {
            suggestions.push(base)
        } else {
            // Try with suffixes
            for (const suffix of suffixes) {
                if (suggestions.length >= 10) break
                const withSuffix = `${base}${suffix}`
                const suffixAvailable = await checkSubdomainAvailability(withSuffix, baseDomain)
                if (suffixAvailable) {
                    suggestions.push(withSuffix)
                    break
                }
            }
        }
    }
    
    // Generate full URLs
    return suggestions.map(sub => `${sub}.${baseDomain}`).slice(0, 10)
}

function getPlanPrice(plan: 'lite' | 'pro' | 'advance', billingCycle: 'semi-annual' | 'annual', region: 'UK' | 'India'): { base: number, tax: number, total: number, currency: string } {
    // All prices in base currency units (INR or GBP)
    const prices: Record<'lite' | 'pro', Record<'semi-annual' | 'annual', Record<'India' | 'UK', number>>> & {
        advance: Record<'semi-annual', Record<'India' | 'UK', number>>
    } = {
        lite: {
            'semi-annual': { India: 38500, UK: 1175 },
            annual: { India: 115000, UK: 2350 },
        },
        pro: {
            'semi-annual': { India: 225000, UK: 2650 },
            annual: { India: 650000, UK: 5300 },
        },
        advance: {
            'semi-annual': { India: 450000, UK: 7650 },
        },
    }

    // For advance plan, only semi-annual is available
    let base: number
    if (plan === 'advance') {
        base = prices.advance['semi-annual'][region]
    } else {
        base = prices[plan][billingCycle][region]
    }
    
    const taxRate = region === 'India' ? 0.18 : 0.20 // GST 18% or VAT 20%
    const tax = base * taxRate
    const total = base + tax
    
    return {
        base,
        tax,
        total,
        currency: region === 'India' ? 'INR' : 'GBP',
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
    const [billingCycle, setBillingCycle] = React.useState<'semi-annual' | 'annual'>("semi-annual")
    const appRedirectUrl = product?.redirectUrl || "https://axonhis.axonichealth.com"
    const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null)
    const [organizationDialogOpen, setOrganizationDialogOpen] = React.useState(false)
    const [selectedPlan, setSelectedPlan] = React.useState<'lite' | 'pro' | 'advance' | null>(null)
    const [organizationError, setOrganizationError] = React.useState<string | null>(null)
    const [organization, setOrganization] = React.useState({
        organizationName: "",
        contactPerson: "",
        organizationEmail: "",
        email: "",
        phone: "",
        countryCode: "+44",
        beds: undefined as number | undefined,
        address: "",
        postalCode: "",
        appUrl: "",
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
    const [loadingLocation, setLoadingLocation] = React.useState(false)
    const [countryLocked, setCountryLocked] = React.useState(false)
    const [subdomainInput, setSubdomainInput] = React.useState("")
    const [subdomainSuggestions, setSubdomainSuggestions] = React.useState<string[]>([])
    const [showSubdomainDropdown, setShowSubdomainDropdown] = React.useState(false)
    const [loadingSubdomainSuggestions, setLoadingSubdomainSuggestions] = React.useState(false)
    const [selectedSubdomain, setSelectedSubdomain] = React.useState("")

    const validateEmail = React.useCallback((email: string): boolean => {
        const parts = email.split('@')
        if (parts.length !== 2) return false
        if (parts[0].includes('+')) return false
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }, [])

    // Fetch countries and zones when dialog opens, and auto-populate location
    React.useEffect(() => {
        if (!organizationDialogOpen) return
        let cancelled = false
        
        const fetchCountries = async () => {
            setLoadingCountries(true)
            try {
                const res = await fetch('/api/address/countries')
                if (!res.ok) throw new Error('Failed to load countries')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list : []
                if (!cancelled) setApiCountries(list)
                return list
            } catch (e) {
                console.warn('Failed to fetch countries', e)
                if (!cancelled) setApiCountries([])
                return []
            } finally {
                if (!cancelled) setLoadingCountries(false)
            }
        }

        const fetchZones = async () => {
            try {
                const res = await fetch('/api/zones')
                if (!res.ok) throw new Error('Failed to load zones')
                const data = await res.json()
                const list = Array.isArray(data?.list) ? data.list : []
                if (!cancelled) setApiZones(list)
                return list
            } catch (e) {
                console.warn('Failed to fetch zones', e)
                if (!cancelled) setApiZones([])
                return []
            }
        }

        // Fetch IP location and auto-populate
        const fetchAndPopulateLocation = async () => {
            setLoadingLocation(true)
            try {
                const [countries, zones, ipLocation] = await Promise.all([
                    fetchCountries(),
                    fetchZones(),
                    getUserLocation()
                ])
                
                if (cancelled || !ipLocation) {
                    // Even without IP location, select first zone as default
                    if (zones.length > 0 && !cancelled) {
                        setSelectedZoneId(zones[0].zoneMasterId)
                    }
                    return
                }
                
                // Match and lock country
                const matchedCountry = countries.find((c: any) => 
                    c.countryCode === ipLocation.countryCode || 
                    c.countryName?.toLowerCase() === ipLocation.country?.toLowerCase()
                )
                
                if (matchedCountry && !cancelled) {
                    setSelectedCountryId(matchedCountry.countryId)
                    setCountryLocked(true)
                }
                
                // Match zone based on timezone from IP
                if (zones.length > 0 && !cancelled) {
                    let matchedZone = null
                    
                    // Try to find exact timezone match
                    if (ipLocation.timezone) {
                        matchedZone = zones.find((z: any) => 
                            z.zoneDesc === ipLocation.timezone
                        )
                    }
                    
                    // Use matched zone or default to first zone
                    const zoneToSelect = matchedZone || zones[0]
                    console.log('Auto-selecting zone:', zoneToSelect.zoneDesc, 'from IP timezone:', ipLocation.timezone)
                    setSelectedZoneId(zoneToSelect.zoneMasterId)
                }
            } catch (e) {
                console.warn('Failed to populate location', e)
            } finally {
                if (!cancelled) setLoadingLocation(false)
            }
        }
        
        fetchAndPopulateLocation()
        return () => { cancelled = true }
    }, [organizationDialogOpen])

    // Fetch states when country changes
    React.useEffect(() => {
        if (!organizationDialogOpen || !selectedCountryId) {
            setApiStates([])
            setSelectedStateId(null)
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
                if (!cancelled) {
                    setApiStates(list)
                    
                    // Auto-select state based on IP if we're just loading for the first time
                    if (list.length > 0 && !selectedStateId) {
                        getUserLocation().then(ipLocation => {
                            if (!cancelled && ipLocation && ipLocation.state) {
                                const matchedState = list.find((s: any) => 
                                    s.stateName?.toLowerCase() === ipLocation.state?.toLowerCase() ||
                                    s.stateName?.toLowerCase().includes(ipLocation.state?.toLowerCase()) ||
                                    ipLocation.state?.toLowerCase().includes(s.stateName?.toLowerCase())
                                )
                                if (matchedState) {
                                    console.log('Auto-selecting state:', matchedState.stateName, 'for IP location:', ipLocation.state)
                                    setSelectedStateId(matchedState.stateId)
                                }
                            }
                        }).catch(err => console.warn('State auto-select failed:', err))
                    }
                }
            } catch (e) {
                console.warn('Failed to fetch states', e)
                if (!cancelled) setApiStates([])
            } finally {
                if (!cancelled) setLoadingStates(false)
            }
        }

        fetchStates()
        return () => { cancelled = true }
    }, [selectedCountryId, organizationDialogOpen])

    // Fetch cities when state changes
    React.useEffect(() => {
        if (!organizationDialogOpen || !selectedStateId) {
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
                if (!cancelled) {
                    setApiCities(list)
                    
                    // Auto-select city based on IP if we're just loading for the first time
                    if (list.length > 0 && !selectedCityId) {
                        getUserLocation().then(ipLocation => {
                            if (!cancelled && ipLocation && ipLocation.city) {
                                const matchedCity = list.find((c: any) => 
                                    c.cityName?.toLowerCase() === ipLocation.city?.toLowerCase() ||
                                    c.cityName?.toLowerCase().includes(ipLocation.city?.toLowerCase()) ||
                                    ipLocation.city?.toLowerCase().includes(c.cityName?.toLowerCase())
                                )
                                if (matchedCity) {
                                    console.log('Auto-selecting city:', matchedCity.cityName, 'for IP location:', ipLocation.city)
                                    setSelectedCityId(matchedCity.cityId)
                                }
                            }
                        }).catch(err => console.warn('City auto-select failed:', err))
                    }
                }
            } catch (e) {
                console.warn('Failed to fetch cities', e)
                if (!cancelled) setApiCities([])
            } finally {
                if (!cancelled) setLoadingCities(false)
            }
        }

        fetchCities()
        return () => { cancelled = true }
    }, [selectedStateId, organizationDialogOpen])

    // Generate subdomain suggestions when organization name changes or subdomain input changes
    React.useEffect(() => {
        const source = subdomainInput || organization.organizationName
        if (!source || source.length < 2) {
            setSubdomainSuggestions([])
            setShowSubdomainDropdown(false)
            return
        }

        const timeoutId = setTimeout(async () => {
            setLoadingSubdomainSuggestions(true)
            const baseDomain = pricingRegion === 'India' ? 'his.axonichealth.co.in' : 'his.axonichealth.uk'
            const suggestions = await generateSubdomainSuggestions(source, baseDomain)
            setSubdomainSuggestions(suggestions)
            setShowSubdomainDropdown(suggestions.length > 0)
            setLoadingSubdomainSuggestions(false)
        }, 1000) // Debounce 1 second

        return () => clearTimeout(timeoutId)
    }, [organization.organizationName, subdomainInput, pricingRegion])

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('[data-app-url-container]')) {
                setShowSubdomainDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Auto-populate subdomain input when organization name changes
    React.useEffect(() => {
        if (organization.organizationName && !subdomainInput) {
            const sanitized = organization.organizationName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')
                .trim()
            if (sanitized.length >= 2) {
                setSubdomainInput(sanitized)
            }
        }
    }, [organization.organizationName])

    // Reset form when dialog closes
    React.useEffect(() => {
        if (!organizationDialogOpen) {
            setOrganization({
                organizationName: "",
                contactPerson: "",
                organizationEmail: "",
                email: "",
                phone: "",
                countryCode: pricingRegion === 'India' ? "+91" : "+44",
                beds: undefined,
                address: "",
                postalCode: "",
                appUrl: "",
            })
            setSubdomainInput("")
            setSelectedSubdomain("")
            setSubdomainSuggestions([])
            setShowSubdomainDropdown(false)
            setSelectedCountryId(null)
            setSelectedStateId(null)
            setSelectedCityId(null)
            setSelectedZoneId(null)
            setCountryLocked(false)
            setOrganizationError(null)
        }
    }, [organizationDialogOpen, pricingRegion])

    // Set default pricing region based on user IP
    React.useEffect(() => {
        getUserRegion().then(region => {
            setPricingRegion(region)
            // Set default country code based on region
            if (region === 'India') {
                setOrganization(prev => ({ ...prev, countryCode: "+91" }))
            } else {
                setOrganization(prev => ({ ...prev, countryCode: "+44" }))
            }
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your hospital size and needs.</p>
                        <div className="w-20 h-1 bg-blue-400 mx-auto mt-4"></div>
                        {/* Billing Cycle Selector */}
                        <div className="mt-6 flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full border bg-white p-1 shadow-sm">
                                <Button
                                    variant={billingCycle === 'semi-annual' ? 'default' : 'ghost'}
                                    className={`${billingCycle === 'semi-annual' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''} rounded-full h-9 px-4`}
                                    onClick={() => setBillingCycle('semi-annual')}
                                >
                                    6 Months
                                </Button>
                                <Button
                                    variant={billingCycle === 'annual' ? 'default' : 'ghost'}
                                    className={`${billingCycle === 'annual' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''} rounded-full h-9 px-4`}
                                    onClick={() => setBillingCycle('annual')}
                                >
                                    Annual
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Lite Plan */}
                        {(() => {
                            const price = getPlanPrice('lite', billingCycle, pricingRegion)
                            const currencySymbol = pricingRegion === 'India' ? '₹' : '£'
                            return (
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Lite</h3>
                                            <p className="text-gray-600 mb-2 text-sm">5-10 Beds, Up to 5 Users</p>
                                            <div className="text-4xl font-extrabold text-gray-900">{currencySymbol}{price.base.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                +{currencySymbol}{Math.round(price.tax).toLocaleString()} {pricingRegion === 'India' ? 'GST' : 'VAT'} = {currencySymbol}{Math.round(price.total).toLocaleString()}
                                            </div>
                                            <p className="text-gray-600 text-sm mt-2">
                                                {billingCycle === 'semi-annual' ? 'for 6 months' : 'per year'}
                                            </p>
                                            <div className="mt-4 text-xs text-blue-600 font-semibold mb-4">✓ 4 hours virtual training included</div>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>✓ Patient Registration</li>
                                                <li>✓ Appointment Scheduling</li>
                                                <li>✓ Patient Admission/Discharge</li>
                                                <li>✓ EMR (Outpatient & Inpatient)</li>
                                                <li>✓ OPD & IPD Billing</li>
                                                <li>✓ Fund Management</li>
                                                <li>✓ WhatsApp Integration</li>
                                                <li>✓ NABH Quality Indicators</li>
                                    </ul>
                                </div>
                                        <Button
                                            className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white"
                                            disabled={loadingPlan === 'lite'}
                                            onClick={() => { setSelectedPlan('lite'); setOrganizationDialogOpen(true) }}
                                        >
                                            {loadingPlan === 'lite' ? 'Processing…' : 'Subscribe Now'}
                                        </Button>
                            </CardContent>
                        </Card>
                            )
                        })()}

                        {/* Pro Plan */}
                        {(() => {
                            const price = getPlanPrice('pro', billingCycle, pricingRegion)
                            const currencySymbol = pricingRegion === 'India' ? '₹' : '£'
                            const savings = billingCycle === 'annual' ? (pricingRegion === 'India' ? 43.6 : 1.9) : 0
                            return (
                        <Card className="rounded-3xl border-2 border-blue-400 shadow-2xl relative h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                        {billingCycle === 'annual' && savings > 0 && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white">
                                                Save {savings}%
                                            </div>
                                        )}
                                <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                                            <p className="text-gray-600 mb-2 text-sm">10-50 Beds, Up to 10 Users</p>
                                            <div className="text-4xl font-extrabold text-gray-900">{currencySymbol}{price.base.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                +{currencySymbol}{Math.round(price.tax).toLocaleString()} {pricingRegion === 'India' ? 'GST' : 'VAT'} = {currencySymbol}{Math.round(price.total).toLocaleString()}
                                            </div>
                                            <p className="text-gray-600 text-sm mt-2">
                                                {billingCycle === 'semi-annual' ? 'for 6 months' : 'per year'}
                                            </p>
                                            <div className="mt-4 text-xs text-blue-600 font-semibold mb-4">✓ 20 hours virtual training included</div>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>✓ All Lite Plan Features</li>
                                                <li>✓ Nursing Module</li>
                                                <li>✓ Inventory Module</li>
                                                <li>✓ Pharmacy Module</li>
                                                <li>✓ Lab Information System</li>
                                                <li>✓ Insurance & Corporate Billing</li>
                                                <li>✓ Package Creation</li>
                                    </ul>
                                </div>
                                        <Button
                                            className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white"
                                            disabled={loadingPlan === 'pro'}
                                            onClick={() => { setSelectedPlan('pro'); setOrganizationDialogOpen(true) }}
                                        >
                                            {loadingPlan === 'pro' ? 'Processing…' : 'Subscribe Now'}
                                        </Button>
                            </CardContent>
                        </Card>
                            )
                        })()}

                        {/* Advance Plan */}
                        {(() => {
                            // Advance plan only has semi-annual pricing, so fallback if annual is selected
                            const effectiveBillingCycle = billingCycle === 'annual' ? 'semi-annual' : billingCycle
                            const price = getPlanPrice('advance', effectiveBillingCycle, pricingRegion)
                            const currencySymbol = pricingRegion === 'India' ? '₹' : '£'
                            const savings = 0 // No annual plan for advance
                            return (
                        <Card className="rounded-3xl border-0 shadow-lg h-full">
                            <CardContent className="p-8 flex flex-col h-full">
                                        {billingCycle === 'annual' && savings > 0 && (
                                            <div className="absolute -top-4 left-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg border-2 border-white">
                                                Save {savings}%
                                            </div>
                                        )}
                                <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Advance</h3>
                                            <p className="text-gray-600 mb-2 text-sm">50+ Beds, Up to 25 Users</p>
                                            <div className="text-4xl font-extrabold text-gray-900">{currencySymbol}{price.base.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                +{currencySymbol}{Math.round(price.tax).toLocaleString()} {pricingRegion === 'India' ? 'GST' : 'VAT'} = {currencySymbol}{Math.round(price.total).toLocaleString()}
                                            </div>
                                            <p className="text-gray-600 text-sm mt-2">
                                                for 6 months
                                            </p>
                                            {billingCycle === 'annual' && (
                                                <p className="text-xs text-orange-600 mt-2 font-semibold">⚠ Annual plan not available for this tier</p>
                                            )}
                                            <div className="mt-4 text-xs text-blue-600 font-semibold mb-4">✓ 40 hours virtual training included</div>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>✓ All Pro Plan Features</li>
                                                <li>✓ Procurement Module</li>
                                                <li>✓ Blood Bank</li>
                                                <li>✓ CSSD</li>
                                                <li>✓ Linen & Laundry</li>
                                                <li>✓ Diet & Kitchen</li>
                                                <li>✓ Mortuary</li>
                                                <li>✓ Comprehensive EMR</li>
                                                <li>✓ Operation Theatre Management</li>
                                                <li>✓ AI-Enabled Features</li>
                                    </ul>
                                </div>
                                        <Button
                                            className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white"
                                            disabled={loadingPlan === 'advance'}
                                            onClick={() => { setSelectedPlan('advance'); setOrganizationDialogOpen(true) }}
                                        >
                                            {loadingPlan === 'advance' ? 'Processing…' : 'Subscribe Now'}
                                        </Button>
                            </CardContent>
                        </Card>
                            )
                        })()}
                    </div>

                    {/* Organization Registration Dialog */}
                    <Dialog open={organizationDialogOpen} onOpenChange={(open) => {
                        setOrganizationDialogOpen(open)
                        if (!open) {
                            setSelectedPlan(null)
                            setOrganizationError(null)
                            setSelectedCountryId(null)
                            setSelectedStateId(null)
                            setSelectedCityId(null)
                            setSelectedZoneId(null)
                        }
                    }}>
                        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Hospital Registration</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                    Complete your organization details to subscribe to AxonHIS {selectedPlan && selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
                                </DialogDescription>
                                </DialogHeader>
                            
                            <div className="space-y-6 mt-4">
                                {/* Organization Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="orgName">Organization Name *</Label>
                                    <Input
                                        id="orgName"
                                        value={organization.organizationName}
                                        onChange={(e) => setOrganization(prev => ({ ...prev, organizationName: e.target.value }))}
                                        placeholder="Enter your hospital/organization name"
                                        required
                                    />
                                </div>

                                {/* Contact Person */}
                                <div className="space-y-2">
                                    <Label htmlFor="contactPerson">Contact Person Name *</Label>
                                    <Input
                                        id="contactPerson"
                                        value={organization.contactPerson}
                                        onChange={(e) => setOrganization(prev => ({ ...prev, contactPerson: e.target.value }))}
                                        placeholder="Full name of primary contact"
                                        required
                                    />
                                </div>

                                {/* Organization Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="orgEmail">Organization Email *</Label>
                                    <Input
                                        id="orgEmail"
                                        type="email"
                                        value={organization.organizationEmail}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const [local] = value.split('@')
                                            if (local && local.includes('+')) return
                                            setOrganization(prev => ({ ...prev, organizationEmail: value }))
                                        }}
                                        placeholder="admin@hospital.com"
                                        required
                                    />
                                </div>

                                {/* Application URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="appUrl">Application URL *</Label>
                                    <div className="relative" data-app-url-container>
                                        <div className="flex items-center border rounded-md">
                                            <Input
                                                id="appUrl"
                                                type="text"
                                                value={subdomainInput}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase()
                                                    setSubdomainInput(value)
                                                    setSelectedSubdomain("") // Clear selection when typing
                                                    if (value.length >= 2) {
                                                        setShowSubdomainDropdown(true)
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if (subdomainSuggestions.length > 0 || subdomainInput.length >= 2) {
                                                        setShowSubdomainDropdown(true)
                                                    }
                                                }}
                                                placeholder="Enter organization name to view available URLs"
                                                className="rounded-r-none border-r-0"
                                                required
                                            />
                                            <div className="px-3 py-2 bg-gray-100 text-gray-600 text-sm border-l flex items-center whitespace-nowrap">
                                                {pricingRegion === 'India' ? 'his.axonichealth.co.in' : 'his.axonichealth.uk'}
                                            </div>
                                        </div>
                                        
                                        {showSubdomainDropdown && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                                {loadingSubdomainSuggestions ? (
                                                    <div className="p-3 text-sm text-gray-500">Checking availability...</div>
                                                ) : subdomainSuggestions.length > 0 ? (
                                                    <>
                                                        {subdomainSuggestions.map((suggestion, idx) => (
                                                            <div
                                                                key={idx}
                                                                onClick={() => {
                                                                    const subdomain = suggestion.split('.')[0]
                                                                    setSubdomainInput(subdomain)
                                                                    setSelectedSubdomain(suggestion)
                                                                    setOrganization(prev => ({ ...prev, appUrl: suggestion }))
                                                                    setShowSubdomainDropdown(false)
                                                                }}
                                                                className="p-3 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                                                            >
                                                                {suggestion}
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div className="p-3 text-sm text-gray-500">Enter organization name to view available URLs</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {selectedSubdomain ? (
                                            `Selected: ${selectedSubdomain}`
                                        ) : subdomainInput ? (
                                            `Preview: ${subdomainInput}.${pricingRegion === 'India' ? 'his.axonichealth.co.in' : 'his.axonichealth.uk'}`
                                        ) : (
                                            'Choose your preferred URL from the dropdown'
                                        )}
                                    </p>
                                </div>

                                {/* Contact Person Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">Contact Person Email *</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        value={organization.email}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const [local] = value.split('@')
                                            if (local && local.includes('+')) return
                                            setOrganization(prev => ({ ...prev, email: value }))
                                        }}
                                        placeholder="contact@email.com"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Contact Number *</Label>
                                    <div className="flex gap-2">
                                        <Select value={organization.countryCode} onValueChange={(value) => setOrganization(prev => ({ ...prev, countryCode: value }))}>
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="+91">+91 (IN)</SelectItem>
                                                <SelectItem value="+44">+44 (UK)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={organization.phone}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '')
                                                const maxLength = organization.countryCode === '+91' ? 10 : 15
                                                if (value.length <= maxLength) {
                                                    setOrganization(prev => ({ ...prev, phone: value }))
                                                }
                                            }}
                                            placeholder={organization.countryCode === '+91' ? "9876543210" : "7712345678"}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Number of Beds */}
                                <div className="space-y-2">
                                    <Label htmlFor="beds">Number of Beds (Optional)</Label>
                                    <Input
                                        id="beds"
                                        type="number"
                                        value={organization.beds || ''}
                                        onChange={(e) => setOrganization(prev => ({ ...prev, beds: e.target.value ? parseInt(e.target.value) : undefined }))}
                                        placeholder="e.g., 50"
                                        min="1"
                                    />
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="address">Full Address *</Label>
                                    <Input
                                        id="address"
                                        value={organization.address}
                                        onChange={(e) => setOrganization(prev => ({ ...prev, address: e.target.value }))}
                                        placeholder="Street address"
                                        required
                                    />
                                </div>

                                {/* Country, State, City, Zone */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country *</Label>
                                        {countryLocked && (
                                            <p className="text-xs text-gray-500 mb-1">Auto-detected from your location</p>
                                        )}
                                        <Select
                                            value={selectedCountryId?.toString() || ''}
                                            onValueChange={(value) => setSelectedCountryId(parseInt(value))}
                                            disabled={loadingCountries || countryLocked}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {apiCountries.map((country: any) => (
                                                    <SelectItem key={country.countryId} value={country.countryId?.toString() || ''}>
                                                        {country.countryName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State/Region *</Label>
                                        <Select
                                            value={selectedStateId?.toString() || ''}
                                            onValueChange={(value) => setSelectedStateId(parseInt(value))}
                                            disabled={loadingStates || !selectedCountryId}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {apiStates.map((state: any) => (
                                                    <SelectItem key={state.stateId} value={state.stateId?.toString() || ''}>
                                                        {state.stateName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city">City *</Label>
                                        <Select
                                            value={selectedCityId?.toString() || ''}
                                            onValueChange={(value) => setSelectedCityId(parseInt(value))}
                                            disabled={loadingCities || !selectedStateId}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {apiCities.map((city: any) => (
                                                    <SelectItem key={city.cityId} value={city.cityId?.toString() || ''}>
                                                        {city.cityName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="zone">Area/Zone *</Label>
                                        <Select
                                            value={selectedZoneId?.toString() || ''}
                                            onValueChange={(value) => setSelectedZoneId(parseInt(value))}
                                            disabled={loadingZones}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {apiZones.map((zone: any) => (
                                                    <SelectItem key={zone.zoneMasterId || zone.zoneId} value={(zone.zoneMasterId || zone.zoneId)?.toString() || ''}>
                                                        {zone.zoneDesc || zone.zoneName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Postal Code */}
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">Postal Code *</Label>
                                    <Input
                                        id="postalCode"
                                        value={organization.postalCode}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const maxLength = pricingRegion === 'India' ? 6 : 10
                                            const pattern = pricingRegion === 'India' ? /^\d*$/ : /^[A-Za-z0-9\s]*$/
                                            if (value.length <= maxLength && pattern.test(value)) {
                                                setOrganization(prev => ({ ...prev, postalCode: value }))
                                            }
                                        }}
                                        placeholder={pricingRegion === 'India' ? "123456" : "SW1A 1AA"}
                                        required
                                    />
                                </div>

                                {organizationError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{organizationError}</p>
                                    </div>
                                )}

                                <div className="flex gap-3 justify-end pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOrganizationDialogOpen(false)}
                                        disabled={loadingPlan !== null}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            if (!organization.organizationName || organization.organizationName.length < 3) {
                                                setOrganizationError('Please enter a valid organization name (min 3 characters)')
                                                return
                                            }
                                            if (!organization.contactPerson) {
                                                setOrganizationError('Please enter contact person name')
                                                return
                                            }
                                            if (!validateEmail(organization.organizationEmail)) {
                                                setOrganizationError('Please enter a valid organization email')
                                                return
                                            }
                                            if (!organization.appUrl || !selectedSubdomain) {
                                                setOrganizationError('Please select an Application URL from the dropdown')
                                                return
                                            }
                                            if (!validateEmail(organization.email)) {
                                                setOrganizationError('Please enter a valid contact person email')
                                                return
                                            }
                                            if (!organization.phone || (organization.countryCode === '+91' && organization.phone.length !== 10) || (organization.countryCode === '+44' && organization.phone.length < 8)) {
                                                setOrganizationError('Please enter a valid phone number')
                                                return
                                            }
                                            if (!selectedCountryId || !selectedStateId || !selectedCityId || !selectedZoneId) {
                                                setOrganizationError('Please select all location fields')
                                                return
                                            }
                                            if (!organization.address || !organization.postalCode) {
                                                setOrganizationError('Please enter address and postal code')
                                                return
                                            }

                                            setOrganizationError(null)
                                            setLoadingPlan(selectedPlan || null)

                                            try {
                                                const payload = {
                                                    product: 'axonhis',
                                                    plan: selectedPlan,
                                                    billingCycle,
                                                    region: pricingRegion,
                                                    organization: {
                                                        ...organization,
                                                        contactNumber: `${organization.countryCode}${organization.phone}`,
                                                        subDomain: selectedSubdomain.split('.')[0], // Extract subdomain part
                                                    },
                                                    successUrl: `${window.location.origin}/our-products/axonhis/success/`,
                                                    cancelUrl: `${window.location.origin}/our-products/axonhis/`,
                                                    unitMasterDto: {
                                                        countryId: selectedCountryId,
                                                        stateId: selectedStateId,
                                                        cityId: selectedCityId,
                                                        zoneId: selectedZoneId,
                                                    },
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
                                                setOrganizationError('Failed to start checkout. Please try again later.')
                                                setLoadingPlan(null)
                                            }
                                        }}
                                        disabled={loadingPlan !== null}
                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        {loadingPlan ? 'Processing…' : 'Proceed to Payment'}
                                    </Button>
                                </div>
                            </div>
                            </DialogContent>
                        </Dialog>
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



