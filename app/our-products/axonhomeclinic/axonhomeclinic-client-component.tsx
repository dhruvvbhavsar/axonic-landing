"use client";
import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { StickyProductNav } from "@/components/sticky-product-nav";
import { OverviewSection } from "./overview-section";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface AxonHomeClinicClientComponentProps {
  product: {
    name: string;
    heroImage: string;
    description: string;
    calendlyUrl?: string;
    testimonialUrl?: string;
  };
  features: Feature[];
  navItems: { href: string; label: string }[];
  videoId: string;
}

export function AxonHomeClinicClientComponent({
  product,
  features,
  navItems,
  videoId,
}: AxonHomeClinicClientComponentProps) {
  const [activeTab, setActiveTab] = React.useState<"overview">(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (
        hash === "overview" ||
        hash === "key-features" ||
        hash === "get-started" ||
        hash === "pricing"
      )
        return "overview";
    }
    return "overview";
  });

  const handleNavigate = (href: string) => {
    const id = href.replace("#", "");

    const scrollToWithRetry = (targetId: string, attempts = 10) => {
      if (attempts <= 0) return;
      const element = document.getElementById(targetId);
      if (element) {
        const offsetTop = element.offsetTop - 140;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      } else {
        setTimeout(() => scrollToWithRetry(targetId, attempts - 1), 100);
      }
    };

    if (id === "key-features" || id === "get-started" || id === "pricing") {
      setActiveTab("overview");
      setTimeout(() => scrollToWithRetry(id), 150);
    } else {
      setActiveTab("overview");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    }

    if (history.pushState) {
      history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <>
      <PageHeader title={product.name} />
      <StickyProductNav
        navItems={navItems}
        currentActive={activeTab === "overview" ? undefined : activeTab}
        onNavigate={handleNavigate}
      />

      {activeTab === "overview" && (
        <OverviewSection
          product={product}
          features={features}
          videoId={videoId}
        />
      )}
    </>
  );
}
