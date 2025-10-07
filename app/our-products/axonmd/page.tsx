import type { Metadata } from 'next'
import { getProductBySlug } from "@/lib/products-data"
import { StructuredData } from "./structured-data"
import { AxonMDClientComponent } from "./axonmd-client-component"

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug("axonmd")

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - Clinic Management Made Simple | Axonic Health`,
    description: `${product.description} Transform your clinic with comprehensive EMR, voice AI assistant, multilingual consultations, and smart automation tools. Reduce documentation time by 50%.`,
    keywords: [
      'clinic management software',
      'EMR system',
      'medical practice management',
      'voice AI assistant',
      'multilingual healthcare',
      'ABDM compliant EMR',
      'medical documentation',
      'clinic automation',
      'AxonMD',
      'Axonic Health',
      'digital health records',
      'healthcare technology',
      'medical software'
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
      url: 'https://axonmd.axonichealth.com',
      title: `${product.name} - Clinic Management Made Simple`,
      description: `${product.description} Complete EMR system with voice AI, multilingual support, and smart automation for modern clinics.`,
      siteName: 'Axonic Health',
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - Complete Clinic Management Platform`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Clinic Management Made Simple`,
      description: `${product.description} 50% time savings, 2x patient capacity, 25% cost reduction.`,
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
      canonical: 'https://axonmd.axonichealth.com',
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

export default function AxonMDPage() {
  const product = getProductBySlug("axonmd")!
  const videoId = extractYouTubeId(product.videoUrl) || "PM9LlDn4S40"

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
      <AxonMDClientComponent
        product={product}
        videoId={videoId}
        features={product.features}
        navItems={navItems}
      />
    </div>
  )
}




