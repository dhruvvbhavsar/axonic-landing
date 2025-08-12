"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { getBaseDomain } from "@/lib/utils"

export function Footer() {
  const [isSubdomain, setIsSubdomain] = React.useState(false)
  const [baseDomain, setBaseDomain] = React.useState('')

  // Check if we're on a subdomain after hydration
  React.useEffect(() => {
    const hostname = window.location.hostname
    const domain = getBaseDomain()
    const isOnSubdomain = hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== domain.split(':')[0]
    
    setIsSubdomain(isOnSubdomain)
    setBaseDomain(domain)
  }, [])

  // Helper function to generate navigation URLs
  const getNavUrl = (path: string) => {
    if (isSubdomain && baseDomain) {
      const protocol = baseDomain.includes('localhost') ? 'http:' : 'https:'
      return `${protocol}//${baseDomain}${path}`
    }
    // If we're on the main domain or during SSR, use relative paths
    return path
  }
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logos/logo-white.png"
                alt="Axonic Logo"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              At Axonic, we bridge the gaps connecting the healthcare system globally with our revolutionary technological solutions.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {/* <Link href="https://x.com/AxonicH86117" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Twitter className="w-4 h-4 text-[#1a1a2e]" />
              </Link> */}
              <Link href="https://www.facebook.com/axonichealth/" target="_blank" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Facebook className="w-4 h-4 text-[#1a1a2e]" />
              </Link>
              <Link href="https://in.linkedin.com/company/axonichealth" target="_blank" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Linkedin className="w-4 h-4 text-[#1a1a2e]" />
              </Link>
              <Link href="https://www.instagram.com/axonichealth?igsh=Y29wNWJvZHk2aTJw" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Instagram className="w-4 h-4 text-[#1a1a2e]" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="text-yellow-500 mt-1">📍</div>
                <div className="text-gray-300 text-sm">
                  3911 Concord Pike<br />
                  #8030, Wilmington,<br />
                  Delaware,19803
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-yellow-500">✉️</div>
                <Link href="mailto:info@axonichealth.com" className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  info@axonichealth.com
                </Link>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getNavUrl("/about-us")} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={"/ai-platform"} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  AI Platform
                </Link>
              </li>
              <li>
                <Link href={getNavUrl("/careers")} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href={getNavUrl("/blogs")} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href={getNavUrl("/contact-us")} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Offerings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Our Offerings</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getNavUrl("/our-products")} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href={getNavUrl("/our-services")} className="text-gray-300 text-sm hover:text-yellow-500 transition-colors">
                  Our Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              Copyright © 2024 Axonic All rights reserved
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href={getNavUrl("/refund-policy")} className="text-gray-400 hover:text-yellow-500 transition-colors flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Refund Policy
              </Link>
              <Link href={getNavUrl("/privacy-policy")} className="text-gray-400 hover:text-yellow-500 transition-colors flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Privacy Policy
              </Link>
              <Link href={getNavUrl("/terms-conditions")} className="text-gray-400 hover:text-yellow-500 transition-colors flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Term and Conditions
              </Link>
            </div>
            
            {/* Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 bg-gray-700 hover:bg-yellow-500 rounded border border-gray-600 flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <span className="text-white text-sm">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
} 