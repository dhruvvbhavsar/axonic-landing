import type { Metadata } from 'next'
import { getProductBySlug } from "@/lib/products-data"
import { StructuredData } from "./structured-data"
import { AxonHealthHubClientComponent } from "./axonhealthhub-client-component"

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug("axonhealthhub")

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - Care, Anywhere — Instantly | Axonic Health`,
    description: `${product.description} Connect patients to doctors, diagnostics, and follow-ups on a unified, compliant platform. Reduce wait times, eliminate data silos, and deliver continuous, coordinated care around the clock.`,
    keywords: [
      'virtual care platform',
      'telemedicine',
      '24/7 healthcare access',
      'connected diagnostics',
      'POCT devices',
      'health record system',
      'ABDM integration',
      'unified health record',
      'AxonHealthHub',
      'Axonic Health',
      'digital health',
      'healthcare technology',
      'population health management',
      'corporate health programs'
    ],
    authors: [{ name: 'Axonic Health' }],
    creator: 'Axonic Health',
    publisher: 'Axonic Health',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://axonhealthhub.axonichealth.com',
      title: `${product.name} - Care, Anywhere — Instantly`,
      description: `${product.description} Unified platform for virtual care, diagnostics, and continuous patient engagement.`,
      siteName: 'Axonic Health',
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - Unified Healthcare Platform`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Care, Anywhere — Instantly`,
      description: `${product.description} 24/7 virtual care, connected diagnostics, unified health records.`,
      images: [product.heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://axonhealthhub.axonichealth.com',
    },
  }
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/")[1] || null
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v")
    }
    // Shorts or embed formats
    const pathParts = parsed.pathname.split("/").filter(Boolean)
    const idx = pathParts.indexOf("shorts")
    if (idx !== -1 && pathParts[idx + 1]) return pathParts[idx + 1]
  } catch (_e) {
    return null
  }
  return null
}

// Enhanced features with SEO-optimized content for AxonHealthHub
function getEnhancedFeatures() {
  return [
    {
      title: "24/7 Virtual Care Access",
      description:
        "Provide instant video consultations with certified doctors around the clock. Smart triage and routing ensure patients reach the right specialist without delay. Whether it's an urgent concern or routine check-up, healthcare is always available when your patients need it most. Break down barriers to access and deliver care that never sleeps.",
      image: "/assets/new-products-1/healthhub/healthhub-1.png",
    },
    {
      title: "Connected Diagnostics & POCT",
      description:
        "Enable on-site smart diagnostics with connected Point-of-Care Testing devices. Results post in real-time to patient records and doctor EMRs, accelerating clinical decisions and eliminating manual data entry. From blood tests to imaging, every diagnostic workflow is seamlessly integrated for faster turnaround and better outcomes.",
      image: "/assets/new-products-1/healthhub/healthhub-2.png",
    },
    {
      title: "Unified Longitudinal Health Record",
      description:
        "Maintain a single, secure record consolidating labs, consult notes, e-prescriptions, and care plans. Ensure continuity across AxonMD, AxonPharmacy, and partner providers. Every interaction is logged and accessible, creating a complete health story that travels with your patient for truly coordinated care.",
      image: "/assets/new-products-1/healthhub/healthhub-3.png",
    },
    {
      title: "Referrals & Follow-ups",
      description:
        "Streamline integrated referral workflows to specialists with complete context sharing. Post-diagnosis care plans include reminders and next steps to keep patients on track. Automated follow-up notifications improve adherence and ensure no patient falls through the cracks. Build a connected care ecosystem where every provider stays informed.",
      image: "/assets/new-products-1/healthhub/healthhub-4.png",
    },
    {
      title: "Automated Data Sync",
      description:
        "Results automatically sync to the consulting doctor's EMR, eliminating manual handovers and reducing delays. Maintain data integrity with timestamps and audit trails. Free your staff from data entry and let technology handle the coordination, so clinicians can focus on what matters—patient care.",
      image: "/assets/new-products-1/healthhub/healthhub-1.png",
    },
    {
      title: "Patient Engagement & Reminders",
      description:
        "Send automated alerts for reports, prescriptions, re-tests, and follow-ups. Keep patients engaged with timely, personalized communications that improve adherence and outcomes. Multilingual support ensures every patient receives information in their preferred language, driving better compliance and satisfaction.",
      image: "/assets/new-products-1/healthhub/healthhub-2.png",
    },
    {
      title: "Population & Program Management",
      description:
        "Monitor corporate and community health programs from centralized dashboards. Track preventive screenings, identify trends, and measure outcomes across populations. Configure workflows by cohort, location, or program type. Gain actionable insights that drive strategic health initiatives and demonstrate measurable impact.",
      image: "/assets/new-products-1/healthhub/healthhub-3.png",
    },
    {
      title: "Multilingual & Accessible",
      description:
        "Support regional languages for both patients and staff, making healthcare truly inclusive. Simple, mobile-first UI accommodates diverse age groups and digital literacy levels. Remove language and technology barriers to ensure everyone can access quality care with confidence and ease.",
      image: "/assets/new-products-1/healthhub/healthhub-4.png",
    },
  ]
}

export default function AxonHealthHubPage() {
  const product = getProductBySlug("axonhealthhub")!
  const videoId = extractYouTubeId(product.videoUrl) || "RHBiso6sE_g"
  const features = getEnhancedFeatures()

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#key-features", label: "Key Features" },
    { href: "#compliance", label: "Compliance" },
    { href: "#tech-specs", label: "Tech Specs" },
    { href: "#pricing", label: "Pricing" },
    { href: "#schedule-demo", label: "Schedule Demo" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <StructuredData product={product} />
      <AxonHealthHubClientComponent
        product={product}
        videoId={videoId}
        features={features}
        navItems={navItems}
      />
    </div>
  )
}


