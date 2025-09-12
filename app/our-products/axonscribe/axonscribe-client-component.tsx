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
  const [activeTab, setActiveTab] = React.useState<'overview' | 'tech-specs' | 'pricing' | 'schedule-demo'>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as any
      if (hash === 'tech-specs' || hash === 'pricing' || hash === 'schedule-demo') return hash
    }
    return 'overview'
  })

  const handleNavigate = (href: string) => {
    const id = href.replace('#', '') as 'overview' | 'tech-specs' | 'pricing' | 'schedule-demo'
    if (id === 'pricing') {
      // For pricing, switch to overview and scroll to pricing section
      setActiveTab('overview')
      setTimeout(() => {
        const element = document.getElementById('pricing')
        if (element) {
          const offsetTop = element.offsetTop - 140
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      setActiveTab(id)
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
        currentActive={activeTab}
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
