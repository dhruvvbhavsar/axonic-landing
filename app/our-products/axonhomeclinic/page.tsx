import type { Metadata } from "next";
import { StructuredData } from "./structured-data";
import { AxonHomeClinicClientComponent } from "./axonhomeclinic-client-component";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `AxonHomeClinic - Your Personal Smart Health Hub | Axonic Health`,
    description: `Clinic-grade care at home, connected to doctors 24×7. AxonHomeClinic brings integrated IoT vitals monitoring, AI-powered health assistance, and instant video consultations to your home.`,
    keywords: [
      "smart health hub",
      "home healthcare",
      "remote patient monitoring",
      "telemedicine",
      "24/7 doctor access",
      "vital signs monitoring",
      "AI health assistant",
      "digital stethoscope",
      "home clinic",
      "AxonHomeClinic",
      "Axonic Health",
      "chronic disease management",
      "family health",
      "remote auscultation",
      "ECG monitoring",
      "SpO2 monitoring",
    ],
    authors: [{ name: "Axonic Health" }],
    creator: "Axonic Health",
    publisher: "Axonic Health",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://axonhomeclinic.axonichealth.com",
      title: `AxonHomeClinic - Your Personal Smart Health Hub`,
      description: `Clinic-grade care at home, connected to doctors 24×7. Integrated IoT vitals monitoring with AI-powered health assistance.`,
      siteName: "Axonic Health",
      images: [
        {
          url: "/assets/new-products-1/homeclinic/1.png",
          width: 1200,
          height: 630,
          alt: `AxonHomeClinic - Personal Smart Health Hub`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `AxonHomeClinic - Your Personal Smart Health Hub`,
      description: `Clinic-grade care at home, connected to doctors 24×7. AI health assistant, vital monitoring, and instant consultations.`,
      images: ["/assets/new-products-1/homeclinic/1.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://axonhomeclinic.axonichealth.com",
    },
  };
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/")[1] || null;
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v");
    }
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const idx = pathParts.indexOf("shorts");
    if (idx !== -1 && pathParts[idx + 1]) return pathParts[idx + 1];
  } catch (_e) {
    return null;
  }
  return null;
}

// Enhanced features for AxonHomeClinic
function getEnhancedFeatures() {
  return [
    {
      title: "24×7 Access to Doctors from Home",
      description:
        "Instant video consultations with the Axoncare Network of doctors, anytime—day or night—without leaving the comfort of home. Get clinic-grade medical advice whenever you need it, eliminating unnecessary hospital visits and reducing wait times to zero.",
      image: "/assets/new-products-1/homeclinic/1.png",
    },
    {
      title: "AxonDoc™ – 24×7 Multilingual AI Doctor's Assistant",
      description:
        "An always-available AI assistant that speaks your language, guides you to the right care pathway, answers health questions, and books doctor appointments automatically when needed. AxonDoc understands context and provides personalized health guidance around the clock.",
      image: "/assets/new-products-1/homeclinic/2.png",
    },
    {
      title: "Integrated IoT Vital & Remote Auscultation Hub",
      description:
        "Measures BP, Pulse, Respiratory Rate, Temperature, SpO₂, and 1-lead ECG, with a digital stethoscope enabling doctors to listen to heart and lung sounds remotely during consultations. Clinical-grade accuracy from the comfort of your home.",
      image: "/assets/new-products-1/homeclinic/3.png",
    },
    {
      title: "Real-Time Health Data on Axoncare App",
      description:
        "All vitals and consultation data are synced live to the Axoncare Patient App, creating a continuous, easily accessible health record. Track trends, share reports with doctors, and maintain a comprehensive health history.",
      image: "/assets/new-products-1/homeclinic/4.png",
    },
    {
      title: "Home-Based Preventive & Chronic Disease Management",
      description:
        "Supports ongoing care for diabetes, hypertension, cardiac and respiratory conditions, enabling proactive monitoring and reducing emergency hospital visits. Early detection and continuous tracking for better health outcomes.",
      image: "/assets/new-products-1/homeclinic/v1.png",
    },
    {
      title: "Multi-Member Family Health Profiles",
      description:
        "One device supports multiple family members, making it ideal for families with children and elderly parents. Each member has their own profile with complete health history and personalized tracking.",
      image: "/assets/new-products-1/homeclinic/v2.png",
    },
    {
      title: "A Premium 'Health-First Living' Amenity",
      description:
        "An in-home smart healthcare amenity that helps real estate developers differentiate projects, justify premium pricing, and build wellness-focused, future-ready communities. Transform residential living with healthcare innovation.",
      image: "/assets/new-products-1/homeclinic/v3.png",
    },
  ];
}

export default function AxonHomeClinicPage() {
  const features = getEnhancedFeatures();
  const videoUrl = "https://youtu.be/uJyRMYEXJ7Y";
  const videoId = extractYouTubeId(videoUrl) || "uJyRMYEXJ7Y";

  const navItems = [
    { href: "#overview", label: "Overview" },
    { href: "#key-features", label: "Key Features" },
    { href: "#get-started", label: "Get Started" },
    { href: "#pricing", label: "Pricing" },
  ];

  const product = {
    name: "AxonHomeClinic",
    heroImage: "/assets/new-products-1/homeclinic/1.png",
    description: "Clinic-grade care at home, connected to doctors 24×7.",
    calendlyUrl: "https://zcal.co/i/pooei9_f?embed=1&embedType=iframe",
    testimonialUrl: "https://www.youtube.com/embed/2OPJaJoi0Gs",
  };

  return (
    <div className="min-h-screen bg-white">
      <StructuredData product={product} />
      <AxonHomeClinicClientComponent
        product={product}
        features={features}
        navItems={navItems}
        videoId={videoId}
      />
    </div>
  );
}
