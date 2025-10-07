interface StructuredDataProps {
  product: any
}

export function StructuredData({ product }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "applicationCategory": "MedicalSoftwareApplication",
    "operatingSystem": "Web-based, iOS, Android",
    "offers": {
      "@type": "Offer",
      "category": "Medical Software",
      "eligibleCustomerType": "Healthcare Providers",
      "availability": "https://schema.org/InStock",
      "price": "24000",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "Axonic Health",
      "url": "https://axonichealth.com"
    },
    "featureList": [
      "Comprehensive EMR System",
      "Voice AI Assistant (Axona)",
      "Multilingual Consultations (CliniTalk)",
      "Smart Automation Tools",
      "Health ATM Integration",
      "Specialist Referral System",
      "Advanced Medication Management",
      "Full ABDM Compliance",
      "50% Time Savings",
      "2x Patient Capacity"
    ],
    "screenshot": product.heroImage,
    "softwareVersion": "2024",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "200",
      "bestRating": "5"
    },
    "applicationSubCategory": "Clinic Management Software",
    "audience": {
      "@type": "Audience",
      "audienceType": "Healthcare Professionals"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}




