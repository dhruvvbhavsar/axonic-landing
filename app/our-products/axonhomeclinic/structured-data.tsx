interface StructuredDataProps {
  product: {
    name: string
    heroImage: string
    description: string
  }
}

export function StructuredData({ product }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Axonic Health"
    },
    "category": "Smart Health Device",
    "image": product.heroImage,
    "offers": {
      "@type": "Offer",
      "category": "Home Healthcare Device",
      "eligibleCustomerType": "Families, Real Estate Developers, Healthcare Consumers",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Axonic Health",
      "url": "https://axonichealth.com"
    },
    "featureList": [
      "24/7 Doctor Access via Video Consultation",
      "AxonDoc AI Health Assistant",
      "Multilingual Support",
      "Integrated IoT Vital Monitoring",
      "Digital Stethoscope for Remote Auscultation",
      "BP, Pulse, Respiratory Rate, Temperature, SpO2 Monitoring",
      "1-Lead ECG",
      "Real-Time Data Sync to Axoncare App",
      "Chronic Disease Management",
      "Multi-Member Family Health Profiles",
      "Premium Health-First Living Amenity"
    ],
    "applicationCategory": "Home Healthcare",
    "audience": {
      "@type": "Audience",
      "audienceType": "Families, Elderly Care, Chronic Disease Patients, Real Estate Developers"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
