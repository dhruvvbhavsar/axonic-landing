import type { Metadata } from 'next'
import { getProductBySlug } from "@/lib/products-data"
import { StructuredData } from "./structured-data"
import { AxonScribeClientComponent } from "./axonscribe-client-component"

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug("axonscribe")
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - AI Medical Scribe | Axonic Health`,
    description: `${product.description} Transform your medical practice with AI-powered transcription, SOAP notes generation, and multilingual support. Reduce documentation time by 70%. Book a demo today.`,
    keywords: [
      'AI medical scribe',
      'medical transcription software', 
      'SOAP notes generator',
      'healthcare documentation',
      'medical AI assistant',
      'clinical documentation',
      'AxonScribe',
      'Axonic Health',
      'speech recognition',
      'medical records',
      'healthcare AI',
      'patient documentation'
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
      url: 'https://axonscribe.axonichealth.com',
      title: `${product.name} - AI Medical Scribe`,
      description: `${product.description} Transform your medical practice with AI-powered transcription that reduces documentation time by 70%.`,
      siteName: 'Axonic Health',
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - AI Medical Scribe Interface showing real-time transcription`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - AI Medical Scribe`,
      description: `${product.description} 95% accuracy, multilingual support, offline recording.`,
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
      canonical: 'https://axonscribe.axonichealth.com',
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


export default function AxonScribePage() {
  const product = getProductBySlug("axonscribe")!
  const videoId = extractYouTubeId(product.videoUrl) || "PM9LlDn4S40"

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#tech-specs", label: "Why Us?" },
    { href: "#pricing", label: "Pricing" },
    { href: "#schedule-demo", label: "Schedule Demo" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <StructuredData product={product} />
      <AxonScribeClientComponent 
        product={product}
        videoId={videoId}
        features={product.features}
        navItems={navItems}
      />
    </div>
  )
}