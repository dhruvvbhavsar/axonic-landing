"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on a link
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      )}>
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={isScrolled ? "/logos/logo-black.png" : "/logos/logo-white.png"}
              alt="Axonic Logo"
              width={160}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation Menu - Hidden on mobile */}
        <div className="hidden lg:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle(),
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-900 hover:text-yellow-500" 
                    : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10"
                )}>
                  <Link href="/about-us">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-900 hover:text-yellow-500" 
                    : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10"
                )}>
                  Our Offerings
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-2 bg-white">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="https://axoncare.axonichealth.com" target="_blank" className="block p-2 hover:bg-accent rounded-sm text-gray-900">
                          <div className="font-medium">Our Services</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/our-products" className="block p-2 hover:bg-accent rounded-sm text-gray-900">
                          <div className="font-medium">Our Products</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle(),
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-900 hover:text-yellow-500" 
                    : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10"
                )}>
                  <Link href="/our-partners">Our Partners</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle(),
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-900 hover:text-yellow-500" 
                    : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10"
                )}>
                  <Link href="/careers">Careers</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle(),
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-900 hover:text-yellow-500" 
                    : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10"
                )}>
                  <Link href="/blogs">Blogs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle(),
                  "transition-colors duration-300",
                  isScrolled 
                    ? "text-gray-900 hover:text-yellow-500" 
                    : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10"
                )}>
                  <Link href="/contact-us">Contact Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button - Visible on mobile */}
        <button
          className={cn(
            "lg:hidden mobile-menu-button p-2 rounded-md transition-colors duration-300",
            isScrolled 
              ? "text-gray-900 hover:bg-gray-100" 
              : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" />
          <div className="mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <Image
                    src="/logos/logo-black.png"
                    alt="Axonic Logo"
                    width={140}
                    height={45}
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                  aria-label="Close mobile menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile menu items */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                <Link
                  href="/about-us"
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
                
                {/* Our Offerings submenu */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-gray-900 font-medium">
                    Our Offerings
                  </div>
                  <Link
                    href="https://axoncare.axonichealth.com"
                    target="_blank"
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Our Services
                  </Link>
                  <Link
                    href="/our-products"
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Our Products
                  </Link>
                </div>

                <Link
                  href="/our-partners"
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Our Partners
                </Link>
                
                <Link
                  href="/careers"
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Careers
                </Link>
                
                <Link
                  href="/blogs"
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Blogs
                </Link>
                
                <Link
                  href="/contact-us"
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 