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
      "category": "Medical Software",
      "eligibleCustomerType": "Healthcare Providers",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Axonic Health",
      "url": "https://axonichealth.com"
    },
    "featureList": [
      "AI-Powered Medical Scribe",
      "Structured SOAP Notes Generation",
      "Multilingual Speech Recognition",
      "Professional Document Personalization",
      "Comprehensive Patient History Management",
      "Offline Recording Capability",
      "95% Transcription Accuracy",
      "HIPAA Compliant Security"
    ],
    "screenshot": product.heroImage,
    "softwareVersion": "2024",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150",
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
