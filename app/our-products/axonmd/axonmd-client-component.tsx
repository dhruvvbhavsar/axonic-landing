"use client"
import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { StickyProductNav } from "@/components/sticky-product-nav"
import { OverviewSection } from "./overview-section"
import { TechSpecsSection } from "./tech-specs-section"
import { ScheduleDemoSection } from "./schedule-demo-section"

interface AxonMDClientComponentProps {
  product: any
  videoId: string
  features: any[]
  navItems: any[]
}

export function AxonMDClientComponent({
  product,
  videoId,
  features,
  navItems
}: AxonMDClientComponentProps) {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'tech-specs' | 'schedule-demo'>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as any
      if (hash === 'tech-specs' || hash === 'schedule-demo') return hash
      // For overview sections, let the scroll detection handle active state
      if (hash === 'overview' || hash === 'key-features' || hash === 'compliance' || hash === 'pricing') return 'overview'
    }
    return 'overview'
  })

  const handleNavigate = (href: string) => {
    const id = href.replace('#', '')

    const scrollToWithRetry = (targetId: string, attempts = 10) => {
      if (attempts <= 0) return
      const element = document.getElementById(targetId)
      if (element) {
        const offsetTop = element.offsetTop - 140
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      } else {
        setTimeout(() => scrollToWithRetry(targetId, attempts - 1), 100)
      }
    }

    if (id === 'key-features' || id === 'compliance' || id === 'pricing') {
      // Switch to overview, then scroll to section with retry to ensure content is mounted
      setActiveTab('overview')
      setTimeout(() => scrollToWithRetry(id), 150)
    } else if (id === 'tech-specs' || id === 'schedule-demo') {
      // Switch tab and scroll to top for non-overview tabs
      setActiveTab(id as 'tech-specs' | 'schedule-demo')
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
    } else {
      setActiveTab('overview')
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
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




