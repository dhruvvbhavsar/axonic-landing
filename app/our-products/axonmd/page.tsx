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

// Enhanced features with SEO-optimized content for AxonMD
function getEnhancedFeatures() {
  return [
    {
      title: "Comprehensive EMR",
      description:
        "AxonMD isn't just a digital casesheet—it's your comprehensive practice management system. From the very first appointment to the final bill, AxonMD unifies every step of the patient journey. Schedule appointments, create prescriptions with ease, streamline billing and maintain secure digital health records — all within one powerful, integrated platform. With AxonMD, you don't just manage your practice—you run it smarter, faster, and better.",
      image: "/assets/new-products-1/md/1.png",
    },
    {
      title: "Personalized Workflow Automation",
      description:
        "Automate the routine, so you can focus on care. Send instant questionnaires tailored to patient's complaints, capturing critical information before the consultation. Build pre-defined Order Sets for common diagnoses, ensuring faster, consistent, and evidence-based treatment. Save your Favorites—from prescriptions to notes—so repetitive tasks take just a click. Streamline your workflow, reduce admin load, and deliver care that feels personal, efficient, and precise.",
      image: "/assets/new-products-1/md/2.png",
    },
    {
      title: "Axona: Your AI Clinical Assistant",
      description:
        "Experience a truly hands-free clinic with Axona. Communicate with Axona to create case notes, prescriptions, and much more. From patient history to prescriptions, Axona is now your most powerful tool for clinical efficiency and safety. Advanced AI algorithms understand medical terminology, procedures, and diagnoses, allowing healthcare providers to maintain natural focus on patient care while documentation happens seamlessly in the background.",
      image: "/assets/new-products-1/md/3.png",
    },
    {
      title: "CliniTalk - Unified & Multilingual Consultations",
      description:
        "Manage your practice from one dashboard for both in-clinic and virtual care. Break language barriers with CliniTalk, offering real-time multilingual assistance during secure video calls. Deliver seamless, accessible care to every patient, regardless of location or language. Advanced speech recognition technology supports multiple languages and local dialects, ensuring no conversation detail is lost regardless of linguistic diversity or cultural communication patterns.",
      image: "/assets/new-products-1/md/4.png",
    },
    {
      title: "AI-Powered Smart Buttons",
      description:
        "Meet your personal clinical assistants—Smart History, Smart Prescriptions, Smart Diagnosis and many more. Our AI Smart Buttons provide real-time, context-aware suggestions at every step, helping you make faster, more accurate decisions and empowering you to become a Super Doctor. Intelligent algorithms analyze patient data, medical history, and current symptoms to provide evidence-based recommendations that enhance clinical decision-making and improve patient outcomes.",
      image: "/assets/new-products-1/md/5.png",
    },
    {
      title: "Drug Safety and Compliance Management",
      description:
        "Enhance patient safety and adherence with intelligent prescription tools. The system automatically checks for drug-drug interactions and provides drug Monograph with a click. AxonMD checks medication compliance with daily reminders sent through patient App to help improve treatment outcomes. Advanced pharmacology databases ensure real-time interaction checking, allergy alerts, and dosage recommendations based on patient-specific factors like age, weight, and comorbidities.",
      image: "/assets/new-products-1/md/6.png",
    },
    {
      title: "Health ATM Integration",
      description:
        "Instantly access patient vitals captured from integrated health kiosks. Key metrics like height, weight, BP, SpO2, temperature, and ECG are auto-synced to your dashboard and the patient's record. Get instant lab results through Point of care Testing via the Health ATM. Make data-driven decisions with zero manual entry. IoT-enabled devices seamlessly integrate with your EMR, providing real-time vital signs monitoring and automated data synchronization for comprehensive patient health tracking.",
      image: "/assets/new-products-1/md/7.png",
    },
  ]
}

export default function AxonMDPage() {
  const product = getProductBySlug("axonmd")!
  const videoId = extractYouTubeId(product.videoUrl) || "PM9LlDn4S40"
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
      <AxonMDClientComponent
        product={product}
        videoId={videoId}
        features={features}
        navItems={navItems}
      />
    </div>
  )
}




