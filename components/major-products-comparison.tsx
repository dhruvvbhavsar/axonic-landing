"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, MonitorPlay } from "lucide-react"

import { products } from "@/lib/products-data"
import { getProductSubdomainUrl } from "@/lib/utils"

const majorProductSlugs = [
  "axonhis",
  "axonmd",
  "axonhealthhub",
  "axonscribe",
  "axoncare",
] as const

const productDetails: Record<
  (typeof majorProductSlugs)[number],
  {
    audience: string
    bestFor: string
    proof: string
    highlights: string[]
  }
> = {
  axonhis: {
    audience: "Hospitals and multi-speciality networks",
    bestFor: "End-to-end hospital operations with 50+ modules",
    proof: "Unified ER, OPD, IPD, OT, ICU, diagnostics, billing, inventory, and BI workflows.",
    highlights: ["Hospital EMR", "Automated billing", "Real-time BI"],
  },
  axonmd: {
    audience: "Clinics and independent doctors",
    bestFor: "Practice management with AI clinical assistance",
    proof: "Complete EMR, appointment flow, prescriptions, billing, voice AI, and multilingual consults.",
    highlights: ["Clinic EMR", "Voice AI", "Smart automation"],
  },
  axonhealthhub: {
    audience: "Enterprises, communities, and care access points",
    bestFor: "AI-enabled health kiosk deployments",
    proof: "Vitals, ECG, POCT diagnostics, connected devices, AI triage, and telemedicine in one kiosk.",
    highlights: ["Health kiosk", "POCT diagnostics", "24/7 telemedicine"],
  },
  axonscribe: {
    audience: "Doctors and clinical teams",
    bestFor: "Reducing documentation load during consultations",
    proof: "AI transcription, SOAP notes, specialty templates, multilingual capture, and offline recording.",
    highlights: ["AI scribe", "SOAP notes", "Multilingual capture"],
  },
  axoncare: {
    audience: "Care teams and population health programs",
    bestFor: "Predictive risk intelligence for proactive care",
    proof: "Advanced analytics identify emerging health risks and help teams plan earlier, more targeted interventions.",
    highlights: ["Risk analytics", "Care planning", "Population insights"],
  },
}

const majorProducts = majorProductSlugs
  .map((slug) => {
    const product = products.find((item) => item.slug === slug)

    return product
      ? {
          ...product,
          ...productDetails[slug],
        }
      : null
  })
  .filter((product): product is NonNullable<typeof product> => product !== null)

export function MajorProductsComparison() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
            <MonitorPlay className="size-4" />
            Major Product Suite
          </span>
          <h2 className="text-3xl font-bold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
            The Axonic Suite: Built to Dominate Healthcare Operations
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            Every product is engineered to replace inefficiency with intelligence, fragmentation with flow, and guesswork with outcomes.
          </p>
        </div>

        <div className="overflow-hidden border border-gray-200 bg-white shadow-xl shadow-gray-200/70">
          {/* Desktop comparison table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-[1120px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-950 text-white">
                  <th className="w-[270px] px-6 py-5 text-sm font-semibold uppercase tracking-wide">
                    Product
                  </th>
                  <th className="w-[220px] px-6 py-5 text-sm font-semibold uppercase tracking-wide">
                    Built For
                  </th>
                  <th className="w-[260px] px-6 py-5 text-sm font-semibold uppercase tracking-wide">
                    Best Use
                  </th>
                  <th className="w-[330px] px-6 py-5 text-sm font-semibold uppercase tracking-wide">
                    What Stands Out
                  </th>
                  <th className="w-[190px] px-6 py-5 text-sm font-semibold uppercase tracking-wide">
                    Explore
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {majorProducts.map((product) => (
                  <tr
                    key={product.slug}
                    className="align-top transition-colors duration-200 hover:bg-yellow-50/60"
                  >
                    <td className="px-6 py-6">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-gray-200 bg-gray-50">
                          <Image
                            src={product.heroImage}
                            alt={`${product.name} product preview`}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-3 flex h-10 items-center">
                            <Image
                              src={product.logo}
                              alt={`${product.name} logo`}
                              width={150}
                              height={48}
                              className="max-h-10 w-auto max-w-[150px] object-contain object-left"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-gray-950">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {product.shortPunchLine ?? product.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm leading-6 text-gray-700">
                      {product.audience}
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-semibold leading-6 text-gray-950">
                        {product.bestFor}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {product.proof}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-2">
                        {product.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm"
                          >
                            <CheckCircle2 className="size-3.5 text-yellow-500" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <Link
                        href={product.redirectUrl || getProductSubdomainUrl(product.slug)}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-yellow-600"
                      >
                        View Product
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile product cards keep every comparison field readable without horizontal scrolling. */}
          <div className="divide-y divide-gray-200 md:hidden">
            {majorProducts.map((product) => (
              <article key={product.slug} className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                      src={product.heroImage}
                      alt={`${product.name} product preview`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={140}
                      height={40}
                      className="mb-2 max-h-8 w-auto max-w-[140px] object-contain object-left"
                    />
                    <h3 className="text-lg font-bold text-gray-950">{product.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-gray-600">
                      {product.shortPunchLine ?? product.subtitle}
                    </p>
                  </div>
                </div>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Built for</dt>
                    <dd className="mt-1 leading-6 text-gray-700">{product.audience}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Best use</dt>
                    <dd className="mt-1 font-semibold leading-6 text-gray-950">{product.bestFor}</dd>
                    <dd className="mt-1 leading-6 text-gray-600">{product.proof}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">What stands out</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {product.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700"
                        >
                          <CheckCircle2 className="size-3.5 text-yellow-500" />
                          {highlight}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={product.redirectUrl || getProductSubdomainUrl(product.slug)}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-yellow-600"
                >
                  View Product
                  <ArrowUpRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
