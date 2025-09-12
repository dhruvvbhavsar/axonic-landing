import Link from "next/link"

export function Breadcrumbs() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://axonichealth.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Our Products",
        "item": "https://axonichealth.com/our-products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AxonScribe",
        "item": "https://axonscribe.axonichealth.com"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="container mx-auto max-w-7xl">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-yellow-600 transition-colors">
                Home
              </Link>
            </li>
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li>
              <Link href="/our-products" className="hover:text-yellow-600 transition-colors">
                Our Products
              </Link>
            </li>
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">AxonScribe</li>
          </ol>
        </div>
      </nav>
    </>
  )
}
