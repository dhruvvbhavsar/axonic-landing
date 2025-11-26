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
      title: "Integrated Vitals & Health Monitoring",
      description:
        "AxonHealthHub captures basic vitals for accurate, automated baseline health assessments within seconds. The system provides comprehensive vital sign monitoring including height, weight, BMI, blood pressure, pulse, temperature, and SpO2, enabling rapid health evaluations at the point of care.",
      image: "/assets/new-products-1/healthhub-1/1.png",
    },
    {
      title: "Instant 12-Lead ECG for Cardiac Screening",
      description:
        "Built-in clinical-grade ECG for rapid cardiac evaluation, enabling early detection of arrhythmias and cardiac emergencies in any setting. The system delivers comprehensive 12-lead electrocardiogram readings for immediate cardiac assessment and monitoring.",
      image: "/assets/new-products-1/healthhub-1/2.png",
    },
    {
      title: "Advanced POCT Lab for Rapid Disease Detection",
      description:
        "The Health ATM houses a comprehensive Point-of-Care Testing (POCT) suite for both communicable and non-communicable diseases, delivering results in minutes. The integrated lab supports a wide range of diagnostic tests including RT-PCR, HbA1c, lipid profile, troponin, glucose, and urinalysis.",
      image: "/assets/new-products-1/healthhub-1/3.png",
    },
    {
      title: "Connected Diagnostic Devices for Complete Examination",
      description:
        "Integration of digital stethoscope, otoscope, laryngoscope, dental camera, and other devices to facilitate high-fidelity remote physical examinations, extending clinical reach beyond basic vitals. These connected diagnostic tools enable comprehensive remote assessments with clinical-grade accuracy.",
      image: "/assets/new-products-1/healthhub-1/4.png",
    },
    {
      title: "AI-Powered Triage & 24x7 Telemedicine Access",
      description:
        "Connection to AxonDoc's multilingual AI triage supporting over 100 languages, providing instant symptom assessment and auto-generated summaries that sync directly into the EMR (AxonMD) for continuous access to care. The system ensures patients receive immediate, intelligent routing to appropriate care providers around the clock.",
      image: "/assets/new-products-1/healthhub-1/5.png",
    },
    {
      title: "Real-Time EMR Integration & Multilingual Teleconsultations",
      description:
        "All data flows to AxonMD, an AI-enhanced EMR, allowing doctors to access real-time kiosk readings and conduct teleconsultations with built-in live translation, ensuring seamless care anytime, anywhere, in any language. This integration enables clinicians to make informed decisions with complete patient context.",
      image: "/assets/new-products-1/healthhub-1/6.png",
    },
    {
      title: "Longitudinal Integration with AxonHIS for a Hub-and-Spoke Network",
      description:
        "AxonHealthHub's direct connection with AxonHIS ensures seamless data flow across clinics, health centers, and hospitals, thereby creating a unified hub-and-spoke ecosystem that links primary, secondary, and tertiary care into a longitudinal digital clinical pathway. This integration eliminates data silos and enables coordinated care across the entire healthcare network.",
      image: "/assets/new-products-1/healthhub-1/7.png",
    },
    {
      title: "Optional Imaging Add-ons (Ultrasound & X-ray)",
      description:
        "AxonHealthHub's capability to integrate digital ultrasound and digital X-ray transforms the Health ATM into a comprehensive diagnostic hub for point-of-care imaging. These optional imaging add-ons extend the kiosk's diagnostic capabilities, enabling advanced imaging studies at the point of care.",
      image: "/assets/new-products-1/healthhub-1/8.png",
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



