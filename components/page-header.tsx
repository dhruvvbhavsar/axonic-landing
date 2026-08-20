"use client"

import * as React from "react"
import { CertificationBadges } from "@/components/certification-badges"

interface PageHeaderProps {
  title: string
  backgroundImage?: string
  navLinks?: { href: string; label: string }[]
}

export function PageHeader({ title, backgroundImage, navLinks }: PageHeaderProps) {
  return (
    <section className="relative h-40 sm:h-44 w-full overflow-hidden">
      {/* Background Image or Gradient */}
      {backgroundImage ? (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900" />
      )}

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '30px 30px sm:50px sm:50px'
        }}></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Title and certifications share the same fixed row as the homepage placement. */}
      <div className="absolute left-0 right-0 top-[4.75rem] z-10 h-[4.25rem]">
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="max-w-[55vw]">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            <div className="mx-auto mt-2 h-px w-20 bg-yellow-400"></div>
          </div>
        </div>

        <CertificationBadges size="panel" className="absolute right-6 top-0 hidden lg:flex" />
      </div>

      {navLinks && navLinks.length > 0 && (
        <nav className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 sm:gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/90 transition-colors hover:bg-white/20 hover:text-yellow-300 sm:px-3 sm:text-sm md:text-base"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </section>
  )
}
