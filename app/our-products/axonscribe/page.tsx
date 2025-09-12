"use client"
import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { StickyProductNav } from "@/components/sticky-product-nav"
import { getProductBySlug } from "@/lib/products-data"
import { OverviewSection } from "./overview-section"
import { TechSpecsSection } from "./tech-specs-section"
import { ScheduleDemoSection } from "./schedule-demo-section"

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

  const [activeTab, setActiveTab] = React.useState<'overview' | 'tech-specs' | 'pricing' | 'schedule-demo'>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as any
      if (hash === 'tech-specs' || hash === 'pricing' || hash === 'schedule-demo') return hash
    }
    return 'overview'
  })

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#tech-specs", label: "Why Us?" },
    { href: "#pricing", label: "Pricing" },
    { href: "#schedule-demo", label: "Schedule Demo" },
  ]

  // Assumption: You want all six features listed below. If you prefer only four, tell me which to keep.
  const features = [
    {
      title: "AI-Powered Medical Scribe",
      description:
        "Automatically transcribes doctor-patient conversations in real time — capturing every detail accurately without manual note-taking. " +
        "Advanced speech recognition technology understands medical terminology, procedures, and diagnoses with 95%+ accuracy. " +
        "This allows healthcare providers to maintain natural eye contact and focus entirely on patient care while documentation happens seamlessly in the background.",
      image: "/assets/new-products-1/scribe/1.jpg",
    },
    {
      title: "Structured SOAP Notes & Specialty Templates",
      description:
        "Instantly generates well-formatted SOAP notes, visit summaries, and follow-up instructions from raw audio. " +
        "Uses pre-trained templates for GP, dental, ortho, psych, and more — customizable to match your practice's documentation style. " +
        "Reduces documentation time by up to 70% while ensuring consistent, professional formatting that meets clinical standards and billing requirements.",
      image: "/assets/new-products-1/scribe/2.jpg",
    },
    {
      title: "Multilingual Speech Recognition",
      description:
        "Captures spoken content in multiple languages, supporting local dialects and bridging communication gaps. " +
        "Perfect for diverse patient populations, ensuring no conversation detail is lost regardless of language or accent. " +
        "Automatically detects language switches mid-conversation and maintains accuracy across different linguistic patterns and cultural communication styles.",
      image: "/assets/new-products-1/scribe/3.jpg",
    },
    {
      title: "Professional Personalization",
      description:
        "Customize generated documents with your clinic letterhead, address, and registration number for polished, official records. " +
        "Maintain your professional brand identity while streamlining documentation processes across your entire practice. " +
        "Automatically applies your preferred formatting, terminology, and signature blocks to ensure every document reflects your practice's professional standards.",
      image: "/assets/new-products-1/scribe/4.jpg",
    },
    {
      title: "Comprehensive Patient History, Anywhere",
      description:
        "Securely access complete patient histories from any device — in clinic, on rounds, or remotely — for continuous, informed care. " +
        "Cloud-based system ensures all patient data is synchronized and available whenever and wherever you need it most. " +
        "Advanced search and filtering capabilities help you quickly locate specific patient interactions, treatment patterns, and historical trends for better clinical decision-making.",
      image: "/assets/new-products-1/scribe/scribe-1.png",
    },
    {
      title: "Offline Recording for Uninterrupted Care",
      description:
        "Record full consultations without internet. When back online, audio transcribes automatically and syncs securely. " +
        "Never miss important patient interactions due to connectivity issues — your documentation workflow continues seamlessly. " +
        "Smart queuing system prioritizes urgent transcriptions and provides real-time sync status updates so you always know when your documentation is complete.",
      image: "/assets/new-products-1/scribe/scribe-1.png",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title={product.name} />
      <StickyProductNav
        navItems={navItems}
        currentActive={activeTab}
        onNavigate={(href) => {
          const id = href.replace('#', '') as 'overview' | 'tech-specs' | 'pricing' | 'schedule-demo'
          if (id === 'pricing') {
            // For pricing, switch to overview and scroll to pricing section
            setActiveTab('overview')
            setTimeout(() => {
              const element = document.getElementById('pricing')
              if (element) {
                const offsetTop = element.offsetTop - 140
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                })
              }
            }, 100)
          } else {
            setActiveTab(id)
          }
          if (history.pushState) {
            history.pushState(null, '', href)
          } else {
            window.location.hash = href
          }
        }}
      />


      {activeTab === 'overview' && (
        <>
          <OverviewSection product={product} videoId={videoId} features={features} />
        </>
      )}
      {activeTab === 'tech-specs' && (
        <>
          <TechSpecsSection />
        </>
      )}
      {activeTab === 'schedule-demo' && (
        <>
          <ScheduleDemoSection product={product} />
        </>
      )}
    </div>
  )
}

