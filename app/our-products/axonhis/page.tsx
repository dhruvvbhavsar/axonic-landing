import type { Metadata } from 'next'
import { getProductBySlug } from "@/lib/products-data"
import { StructuredData } from "./structured-data"
import { AxonHISClientComponent } from "./axonhis-client-component"

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug("axonhis")
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - Hospital Information System | Axonic Health`,
    description: `${product.description} Complete hospital EMR with unified care workflows, automated billing, real-time BI dashboards, and integrated diagnostics. Transform your hospital operations today.`,
    keywords: [
      'Hospital Information System',
      'Hospital EMR',
      'HIS software',
      'Hospital management system',
      'Healthcare ERP',
      'Clinical workflows',
      'Hospital billing software',
      'AxonHIS',
      'Axonic Health',
      'ABDM compliant',
      'HIPAA compliant',
      'Hospital analytics'
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
      url: 'https://axonhis.axonichealth.com',
      title: `${product.name} - Hospital Information System`,
      description: `${product.description} Unified platform for ER, OPD, IPD, OT, ICU with automated billing and real-time analytics.`,
      siteName: 'Axonic Health',
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - Hospital Information System Dashboard`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Hospital Information System`,
      description: `${product.description} Complete EMR with automated billing and analytics.`,
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
      canonical: 'https://axonhis.axonichealth.com',
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

// Enhanced features with SEO-optimized content
function getEnhancedFeatures() {
  return [
    {
      title: "Unified Hospital Platform",
      description:
        "Consolidate 50+ modules into one ecosystem—registration, ER, OPD, IPD, OT, ICU, pharmacy, labs, radiology, inventory, and finance. Eliminate data silos with a single source of truth for clinical and administrative workflows. Seamless integration ensures that every department communicates effortlessly, reducing errors and improving coordination across your entire hospital.",
      image: "/assets/new-products-1/his-1/1.png",
    },
    {
      title: "Smarter Care Delivery",
      description:
        "Streamline ER triage, OPD scheduling, and IPD bed tracking. Coordinate nurse-doctor-pharmacy-lab handoffs with automated notifications. Improve patient satisfaction through timely transfers and discharge readiness. Smart workflows reduce wait times and ensure that the right care reaches patients at the right time.",
      image: "/assets/new-products-1/his-1/2.png",
    },
    {
      title: "Automated Billing Accuracy",
      description:
        "Capture charges at the point of care. Link every order, procedure, and consumable to billing in real time. Reduce missed items and delays to achieve consistent, audit-ready revenue integrity. Eliminate revenue leakage with 100% charge capture that automatically tracks every billable service and procedure.",
      image: "/assets/new-products-1/his-1/3.png",
    },
    {
      title: "360° EMR for Clinicians",
      description:
        "Give doctors a unified clinical view—vitals, diagnostics, medications, progress notes, orders, and imaging—without switching between systems. Use templates, order sets, and favourites to speed documentation. Comprehensive patient history at your fingertips enables faster, more informed clinical decisions.",
      image: "/assets/new-products-1/his-1/4.png",
    },
    {
      title: "Diagnostics & Ancillary Integration",
      description:
        "Seamless LIS and RIS/PACS workflows from eOrder to result posting. Pharmacy e-prescriptions with stock checks and substitutions. CSSD tracking for OT packs and instrument cycles. End-to-end integration eliminates manual data entry and ensures accurate, timely results delivery.",
      image: "/assets/new-products-1/his-1/5.png",
    },
    {
      title: "Real-Time BI & MIS",
      description:
        "Gain visibility with occupancy, TATs, cancellations, revenue, and resource utilization dashboards. Drill down by department, unit, payer, and provider for operational decisions that stick. Built-in analytics empower management with actionable insights for continuous improvement and strategic planning.",
      image: "/assets/new-products-1/his-1/6.png",
    },
    {
      title: "Asset & Inventory Control",
      description:
        "Track equipment utilization and maintenance with alerts. Monitor stock, expiries, and batch at wards, OT, ICU, and pharmacy. Reduce loss, shrinkage, and downtime. Comprehensive asset management ensures your hospital resources are optimally utilized and always ready when needed.",
      image: "/assets/new-products-1/his-1/7.png",
    },
    {
      title: "Personalization & Customization",
      description:
        "Configure branded discharge summaries, invoices, and claims. Build custom order sets per specialty and save favourite prescriptions and care plans. Adapt workflows by department without heavy IT lift. Flexible configuration means AxonHIS adapts to your hospital's unique processes, not the other way around.",
      image: "/assets/new-products-1/his-1/8.png",
    },
  ]
}

export default function AxonHISPage() {
  const product = getProductBySlug("axonhis")!
  const videoId = extractYouTubeId(product.videoUrl) || "PM9LlDn4S40"
  const features = getEnhancedFeatures()

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#key-features", label: "Key Features" },
    { href: "#compliance", label: "Compliances" },
    { href: "#tech-specs", label: "Why Us?" },
    { href: "#pricing", label: "Pricing" },
    { href: "#schedule-demo", label: "Schedule Demo" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <StructuredData product={product} />
      <AxonHISClientComponent 
        product={product}
        videoId={videoId}
        features={features}
        navItems={navItems}
      />
    </div>
  )
}



