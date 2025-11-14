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
    title: `${product.name} (AI‑Enabled Health Kiosk) - Care, Anywhere — Instantly | Axonic Health`,
    description: `Deploy AxonHealthHub as an AI-powered health kiosk that connects patients to triage, diagnostics, and clinicians on a unified, compliant platform. Reduce wait times, eliminate data silos, and deliver continuous, coordinated care around the clock.`,
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
      title: `${product.name} (AI‑Enabled Health Kiosk) - Care, Anywhere — Instantly`,
      description: `Deploy AxonHealthHub as an AI-powered health kiosk that connects patients to triage, diagnostics, and clinicians on a unified, compliant platform.`,
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
      title: `${product.name} (AI‑Enabled Health Kiosk) - Care, Anywhere — Instantly`,
      description: `AI-powered health kiosk with 24/7 virtual care, connected diagnostics, and unified health records.`,
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
      title: "AI Triage & 24/7 Virtual Care Access",
      description:
        "Intelligent symptom triage and routing to the right clinician. Instant video consults with certified doctors ensure patients never wait for critical help. AxonHealthHub analyzes symptoms, vitals, and history to triage and route to the right specialty, delivering always-on virtual care around the clock.",
      image: "/assets/new-products-1/healthhub/healthhub-1.png",
    },
    {
      title: "AI‑Connected Diagnostics & POCT",
      description:
        "Kiosk-integrated POCT devices with automated quality checks. Real-time result posting to the patient record and clinician EMR accelerates safe decisions. Automated quality checks and abnormal value flags ensure accurate diagnostics while eliminating manual data entry and reducing turnaround time from hours to minutes.",
      image: "/assets/new-products-1/healthhub/healthhub-2.png",
    },
    {
      title: "Unified Longitudinal Health Record",
      description:
        "Single, secure record for labs, consult notes, eRx, and care plans. AI-generated clinical highlights speed decision-making by consolidating all interactions into one comprehensive health story. Labs, consult notes, imaging, and e-prescriptions are unified with AI summaries and next-best-action cues for truly coordinated care.",
      image: "/assets/new-products-1/healthhub/healthhub-3.png",
    },
    {
      title: "Guided Referrals & Follow-ups",
      description:
        "Integrated referral workflows and configurable care pathways. Automated reminders and adherence nudges post-diagnosis keep patients on track. From diagnosis to specialty care, referrals and care plans are generated with adherence checkpoints and smart reminders, ensuring no patient falls through the cracks.",
      image: "/assets/new-products-1/healthhub/healthhub-4.png",
    },
    {
      title: "Automated Data Sync to EMR",
      description:
        "Seamless, audit-ready syncing to clinical systems with deduplication. Eliminates manual handovers and reduces delays. Results automatically sync to EMRs with deduplication and audit-ready timestamps—no manual uploads or downloads. Free your staff from data entry and let technology handle the coordination.",
      image: "/assets/new-products-1/healthhub/healthhub-1.png",
    },
    {
      title: "Patient Engagement & Proactive Alerts",
      description:
        "Personalized notifications for reports, prescriptions, and re-tests. Multilingual outreach optimized by engagement patterns drives adherence and outcomes. Optimize message timing, language, and channel to drive adherence for reports, refills, re-tests, and scheduled reviews, keeping patients engaged with timely, personalized communications.",
      image: "/assets/new-products-1/healthhub/healthhub-2.png",
    },
    {
      title: "Program & Population Health",
      description:
        "Dashboards for corporate/community programs with risk stratification. Screening eligibility, cohort insights, and trend detection enable data-driven health initiatives. Identify at-risk cohorts, surface screening gaps, and track trends for corporate/community initiatives via intuitive dashboards that demonstrate measurable impact.",
      image: "/assets/new-products-1/healthhub/healthhub-3.png",
    },
    {
      title: "Multilingual & Accessible",
      description:
        "Regional language support and voice-first assistance. Simple, mobile-first UI for diverse populations ensures healthcare is truly inclusive. Remove language and technology barriers to ensure everyone can access quality care with confidence and ease, accommodating diverse age groups and digital literacy levels.",
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



