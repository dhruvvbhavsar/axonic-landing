"use client"

import * as React from "react"

interface PageHeaderProps {
  title: string
  backgroundImage?: string
  navLinks?: { href: string; label: string }[]
}

export function PageHeader({ title, backgroundImage, navLinks }: PageHeaderProps) {
  return (
    <section className="relative h-24 sm:h-28 md:h-32 lg:h-36 w-full overflow-hidden">
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

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-6 justify-center z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {/* Decorative Line Below */}
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-3 sm:mt-4 md:mt-6"></div>

          {navLinks && navLinks.length > 0 && (
            <nav className="mt-3 sm:mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="text-xs sm:text-sm md:text-base text-white/90 hover:text-yellow-300 bg-white/10 hover:bg-white/20 border border-white/20 px-2 sm:px-3 py-1 rounded-full transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </section>
  )
} 