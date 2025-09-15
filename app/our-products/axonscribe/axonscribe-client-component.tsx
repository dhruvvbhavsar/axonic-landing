"use client"
import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { StickyProductNav } from "@/components/sticky-product-nav"
import { OverviewSection } from "./overview-section"
import { TechSpecsSection } from "./tech-specs-section"
import { ScheduleDemoSection } from "./schedule-demo-section"

interface AxonScribeClientComponentProps {
  product: any
  videoId: string
  features: any[]
  navItems: any[]
}

export function AxonScribeClientComponent({
  product,
  videoId,
  features,
  navItems
}: AxonScribeClientComponentProps) {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'tech-specs' | 'schedule-demo'>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as any
      if (hash === 'tech-specs' || hash === 'schedule-demo') return hash
      // For overview sections, let the scroll detection handle active state
      if (hash === 'overview' || hash === 'pricing' || hash === 'key-features' || hash === 'compliance') return 'overview'
    }
    return 'overview'
  })

  const handleNavigate = (href: string) => {
    const id = href.replace('#', '')
    if (id === 'pricing' || id === 'key-features' || id === 'compliance') {
      // For pricing, key-features, and compliance, switch to overview and scroll to respective section
      setActiveTab('overview')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          const offsetTop = element.offsetTop - 140
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      setActiveTab(id as 'overview' | 'tech-specs' | 'schedule-demo')
    }
    if (history.pushState) {
      history.pushState(null, '', href)
    } else {
      window.location.hash = href
    }
  }

  return (
    <>
      <PageHeader title={product.name} />
      <StickyProductNav
        navItems={navItems}
        currentActive={activeTab === 'overview' ? undefined : activeTab}
        onNavigate={handleNavigate}
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
    </>
  )
}
