interface StructuredDataProps {
  product: any
}

export function StructuredData({ product }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "category": "Hospital Management Software",
      "eligibleCustomerType": "Healthcare Organizations",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Axonic Health",
      "url": "https://axonichealth.com"
    },
    "featureList": [
      "Unified Hospital EMR",
      "ER, OPD, IPD, OT, ICU Management",
      "Automated Billing & Charge Capture",
      "Real-Time BI & MIS Dashboards",
      "Diagnostics Integration (LIS, RIS/PACS)",
      "Asset & Inventory Management",
      "Multilingual Support",
      "ABDM, HIPAA, GDPR Compliant"
    ],
    "screenshot": product.heroImage,
    "softwareVersion": "2024",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "85",
      "bestRating": "5"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}



