import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MajorProductsComparison } from "@/components/major-products-comparison";
import { PartnersSection } from "@/components/partners-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MajorProductsComparison />

      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
