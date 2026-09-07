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

// Enhanced features with SEO-optimized content
function getEnhancedFeatures() {
  return [
    {
      title: "AI-Powered Medical Scribe",
      description:
        "Automatically transcribes doctor-patient conversations in real time with 95%+ accuracy. Advanced speech recognition technology understands medical terminology, procedures, and diagnoses. This allows healthcare providers to maintain natural eye contact and focus entirely on patient care while documentation happens seamlessly in the background.",
      image: "/assets/new-products-1/scribe/1.jpg",
    },
    {
      title: "Structured SOAP Notes & Specialty Templates",
      description:
        "Instantly generates well-formatted SOAP notes, visit summaries, and follow-up instructions from raw audio. Uses pre-trained templates for GP, dental, ortho, psych, and more — customizable to match your practice's documentation style. Reduces documentation time by up to 70% while ensuring consistent, professional formatting that meets clinical standards and billing requirements.",
      image: "/assets/new-products-1/scribe/2.jpg",
    },
    {
      title: "Multilingual Speech Recognition",
      description:
        "Captures spoken content in multiple languages, supporting local dialects and bridging communication gaps. Perfect for diverse patient populations, ensuring no conversation detail is lost regardless of language or accent. Automatically detects language switches mid-conversation and maintains accuracy across different linguistic patterns and cultural communication styles.",
      image: "/assets/new-products-1/scribe/3.jpg",
    },
    {
      title: "Professional Personalization",
      description:
        "Customize generated documents with your clinic letterhead, address, and registration number for polished, official records. Maintain your professional brand identity while streamlining documentation processes across your entire practice. Automatically applies your preferred formatting, terminology, and signature blocks to ensure every document reflects your practice's professional standards.",
      image: "/assets/new-products-1/scribe/4.jpg",
    },
    {
      title: "Comprehensive Patient History, Anywhere",
      description:
        "Securely access complete patient histories from any device — in clinic, on rounds, or remotely — for continuous, informed care. Cloud-based system ensures all patient data is synchronized and available whenever and wherever you need it most. Advanced search and filtering capabilities help you quickly locate specific patient interactions, treatment patterns, and historical trends for better clinical decision-making.",
      image: "/assets/new-products-1/scribe/scribe-1.png",
    },
    {
      title: "Offline Recording for Uninterrupted Care",
      description:
        "Record full consultations without internet. When back online, audio transcribes automatically and syncs securely. Never miss important patient interactions due to connectivity issues — your documentation workflow continues seamlessly. Smart queuing system prioritizes urgent transcriptions and provides real-time sync status updates so you always know when your documentation is complete.",
      image: "/assets/new-products-1/scribe/scribe-1.png",
    },
  ]
}

export default function AxonScribePage() {
  const product = getProductBySlug("axonscribe")!
  const videoId = extractYouTubeId(product.videoUrl) || "PM9LlDn4S40"
  const features = getEnhancedFeatures()

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#key-features", label: "Key Features" },
    { href: "#compliance", label: "Compliances" },
    { href: "#tech-specs", label: "Why Us?" },
    { href: "#schedule-demo", label: "Schedule Demo" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <StructuredData product={product} />
      <AxonScribeClientComponent 
        product={product}
        videoId={videoId}
        features={features}
        navItems={navItems}
      />
    </div>
  )
}
