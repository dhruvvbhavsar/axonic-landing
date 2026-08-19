"use client"

import * as React from "react"
import Link from "next/link"

export function HeroSection() {
  
  const headings: string[] = React.useMemo(
    () => [
      "World's First AI-Powered Healthcare Operating System",
      "AI That Delivers Care, Not Just Promises",
      "Expert Care in Your Pocket, 24/7",
      "Care Without Borders. Language Without Limits.",
    ],
    []
  )

  const [activeHeadingIndex, setActiveHeadingIndex] = React.useState(0)
  const [isHeadingVisible, setIsHeadingVisible] = React.useState(true)

  const timeoutsRef = React.useRef<Array<ReturnType<typeof setTimeout>>>([])
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    const animateToNext = () => {
      setIsHeadingVisible(false)
      const t = setTimeout(() => {
        setActiveHeadingIndex((prev) => (prev + 1) % headings.length)
        setIsHeadingVisible(true)
      }, 500) // match fade-out duration
      timeoutsRef.current.push(t)
    }

    intervalRef.current = setInterval(animateToNext, 4000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      timeoutsRef.current.forEach((t) => clearTimeout(t))
      timeoutsRef.current = []
    }
  }, [headings.length])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-white max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-yellow-400 min-h-[3.25rem] md:min-h-[4.5rem] lg:min-h-[5.5rem]"
              aria-live="polite"
            >
              <span
                className={
                  `inline-block transition-all duration-500 ease-out ` +
                  (isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")
                }
              >
                {headings[activeHeadingIndex]}
              </span>
            </h1>

            {/* Call to Action Button */}
            <Link
              href="/ai-platform"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 