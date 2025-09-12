"use client"

import * as React from "react"

type NavItem = { href: string; label: string }

// Component for sticky navigation with active section highlighting
export function StickyProductNav({
  navItems: customNavItems,
  currentActive,
  onNavigate,
}: {
  navItems?: NavItem[]
  currentActive?: string
  onNavigate?: (href: string) => void
}) {
  const [internalActive, setInternalActive] = React.useState('overview')
  const isControlled = typeof currentActive === 'string'
  const activeSection = isControlled ? (currentActive as string) : internalActive

  const defaultNavItems: NavItem[] = [
    { href: '#overview', label: 'Overview' },
    { href: '#features', label: 'Features' },
    { href: '#why', label: 'Why Choose Us' },
    { href: '#testimonials', label: 'Testimonials' },
  ]

  const navItems = customNavItems && customNavItems.length > 0 ? customNavItems : defaultNavItems

  React.useEffect(() => {
    if (isControlled) return
    const handleScroll = () => {
      const sections = navItems
        .filter(item => item.href.startsWith('#'))
        .map(item => ({
          id: item.href.substring(1), // Remove the #
          element: document.getElementById(item.href.substring(1))
        }))
        .filter(section => section.element)

      // Find which section is currently in view
      const currentSection = sections.find(section => {
        const rect = section.element!.getBoundingClientRect()
        return rect.top <= 140 && rect.bottom >= 140
      })

      if (currentSection) {
        setInternalActive(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isControlled, navItems])

  const scrollToSection = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
      return
    }
    if (!href.startsWith('#')) {
      window.location.href = href
      return
    }
    const element = document.getElementById(href.substring(1))
    if (element) {
      const offsetTop = element.offsetTop - 140 // Account for main nav + sticky nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="sticky top-[72px] z-30 py-4 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm w-full">
      <div className="w-full">
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {navItems.map((link) => (
            <button
              key={link.href + link.label}
              onClick={() => scrollToSection(link.href)}
              className={`text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                activeSection === link.href.substring(1)
                  ? 'text-white bg-yellow-500 border border-yellow-500'
                  : 'text-gray-700 hover:text-yellow-600 bg-white hover:bg-yellow-50 border border-gray-300 hover:border-yellow-400'
              }`}
            >
              {link.label}
            </button>
          ))}
          {/* Call Us Button */}
          <button
            onClick={() => window.open(`tel:+18002101999`, '_self')}
            className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 rounded-full transition-all duration-200 font-medium text-gray-700 hover:text-yellow-600 bg-white hover:bg-yellow-50 border border-gray-300 hover:border-yellow-400"
          >
            Call Us
          </button>
        </nav>
      </div>
    </section>
  )
}
