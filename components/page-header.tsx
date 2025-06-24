"use client"

import * as React from "react"

interface PageHeaderProps {
  title: string
  backgroundImage?: string
}

export function PageHeader({ title, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative h-32 sm:h-40 md:h-48 lg:h-52 w-full overflow-hidden">
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
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Decorative Line Above Title */}
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-3 sm:mb-4 md:mb-6"></div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Decorative Line Below */}
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-3 sm:mt-4 md:mt-6"></div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </section>
  )
} 