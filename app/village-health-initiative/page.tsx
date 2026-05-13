"use client";

import * as React from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import {
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  MapPin,
  Quote,
} from "lucide-react";

const storySlides = [
  {
    image: "/assets/new-products-1/healthhub/c-1.png",
    step: "01",
    eyebrow: "Kasurdi Village",
    title: "A patient needed help far from any hospital",
    body: "A patient in Kasurdi Village reported chest pain. The care team had to act fast — and they could, because diagnostics were available right there.",
  },
  {
    image: "/assets/new-products-1/healthhub/c-2.png",
    step: "02",
    eyebrow: "ECG Access",
    title: "A 12-lead ECG, done within minutes",
    body: "An AFMC doctor prescribed an ECG. It was completed at the point of care almost immediately — no travel, no waiting rooms.",
  },
  {
    image: "/assets/new-products-1/healthhub/c-3.png",
    step: "03",
    eyebrow: "Emergency Response",
    title: "Abnormal. Both times. Immediate action.",
    body: "Both ECG readings indicated a possible heart attack. The patient was immediately shifted to a nearby hospital emergency department.",
  },
];

const testimonials = [
  {
    image: "/assets/aboutSection/aboutSection1.png",
    name: "Village Patient",
    role: "Kasurdi Village",
    quote:
      "The ECG was done within minutes. Both readings were abnormal — the doctors could act immediately.",
  },
  {
    image: "/assets/aboutSection/aboutSection2.png",
    name: "AFMC Doctor",
    role: "Care Response Team",
    quote:
      "Most likely we helped save one life today by making healthcare accessible to a remote location.",
  },
  {
    image: "/assets/aboutSection/aboutSection3.png",
    name: "Operations Lead",
    role: "Axonic Health",
    quote:
      "This is exactly why village-level access to diagnostics and doctors must exist everywhere.",
  },
  {
    image: "/assets/aboutSection/aboutSection4.png",
    name: "Field Coordinator",
    role: "Village Health Initiative",
    quote:
      "Having point-of-care equipment changed everything. We didn't have to wait for anyone to travel.",
  },
];

export default function VillageHealthInitiativePage() {
  const [current, setCurrent] = React.useState(0);
  const total = storySlides.length;

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((p) => (p - 1 + total) % total);
  const next = () => setCurrent((p) => (p + 1) % total);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Village Health Initiative" />

      <div className="grid min-h-[calc(100vh-9rem)] grid-cols-1 lg:grid-cols-2">
        {/* ── LEFT: Story Slideshow ───────────────────────── */}
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-full">
          {/* Stacked slides — fade transition */}
          {storySlides.map((slide, i) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            </div>
          ))}

          {/* Slide text */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white lg:p-12">
            {/* Ghost step number */}
            <p className="mb-2 select-none text-9xl font-black leading-none text-white/[0.07]">
              {storySlides[current].step}
            </p>

            {/* Location pill */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold">
              <MapPin className="h-3.5 w-3.5" />
              {storySlides[current].eyebrow}
            </div>

            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              {storySlides[current].title}
            </h2>

            <p className="max-w-md text-base leading-relaxed text-gray-200 md:text-lg">
              {storySlides[current].body}
            </p>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {storySlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-10 bg-yellow-400"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition hover:bg-white/25"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition hover:bg-white/25"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Testimonials Grid ────────────────────── */}
        <div className="flex flex-col bg-gray-50 p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-yellow-600">
                Impact Stories
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tighter text-gray-900 lg:text-4xl">
              What this moment showed us
            </h2>

            <div className="mt-3 h-1 w-12 rounded-full bg-yellow-500" />
          </div>

          {/* 2×2 grid */}
          <div className="grid flex-1 grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Person photo */}
                <div className="relative h-36 w-full overflow-hidden bg-gray-100 sm:h-44">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Quote */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <Quote className="mb-2 h-4 w-4 text-yellow-400" />
                    <p className="text-sm leading-relaxed text-gray-700">
                      {t.quote}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs font-medium text-yellow-600">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="mt-8 rounded-2xl bg-gray-900 p-6">
            <p className="text-xl font-black leading-snug tracking-tight text-white lg:text-2xl">
              One timely ECG.{" "}
              <span className="text-yellow-400">
                One life potentially saved.
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Kasurdi Village · Axonic Village Health Initiative
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
