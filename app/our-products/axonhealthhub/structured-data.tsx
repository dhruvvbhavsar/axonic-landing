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
      "eligibleCustomerType": "Healthcare Providers, Hospitals, Clinics",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Axonic Health",
      "url": "https://axonichealth.com"
    },
    "featureList": [
      "24/7 Virtual Care Access",
      "Connected Diagnostics & POCT",
      "Unified Longitudinal Health Record",
      "Integrated Referrals & Follow-ups",
      "Automated Data Sync to EMR",
      "Patient Engagement & Reminders",
      "Population & Program Management",
      "Multilingual Support",
      "ABDM-Ready Integration",
      "Enterprise Security & Compliance"
    ],
    "screenshot": product.heroImage,
    "softwareVersion": "2024",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5"
    },
    "applicationSubCategory": "Healthcare Platform",
    "audience": {
      "@type": "Audience",
      "audienceType": "Healthcare Organizations, Corporate Health Programs, Community Health Centers"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}






