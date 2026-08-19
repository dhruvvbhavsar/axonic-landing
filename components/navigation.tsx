"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  cn,
  getBaseDomain,
  getConsultingSubdomainUrl,
  getPlatformSubdomainUrl,
  getProductSubdomainUrl,
} from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSubdomain, setIsSubdomain] = React.useState(false);
  const [baseDomain, setBaseDomain] = React.useState("");

  // Check if we're on a subdomain after hydration
  React.useEffect(() => {
    const hostname = window.location.hostname;
    const domain = getBaseDomain();
    const isOnSubdomain =
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      hostname !== domain.split(":")[0];

    setIsSubdomain(isOnSubdomain);
    setBaseDomain(domain);
  }, []);

  // Helper function to generate navigation URLs
  const getNavUrl = (path: string) => {
    if (isSubdomain && baseDomain) {
      const protocol = baseDomain.includes("localhost") ? "http:" : "https:";
      return `${protocol}//${baseDomain}${path}`;
    }
    // If we're on the main domain or during SSR, use relative paths
    return path;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Helper component to handle both relative and absolute URLs
  const SmartLink = React.forwardRef<
    HTMLAnchorElement,
    {
      href: string;
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
      [key: string]: any;
    }
  >(({ href, children, className, onClick, ...props }, ref) => {
    const isFullUrl = href.startsWith("http://") || href.startsWith("https://");

    if (isFullUrl) {
      return (
        <a
          ref={ref}
          href={href}
          className={className}
          onClick={onClick}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={className} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  });
  SmartLink.displayName = "SmartLink";

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 py-4 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent",
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <SmartLink
            href={getNavUrl("/")}
            className="flex items-center space-x-2"
          >
            <Image
              src={
                isScrolled ? "/logos/logo-black.png" : "/logos/logo-white.png"
              }
              alt="Axonic Logo"
              width={160}
              height={50}
              className="h-10 w-auto"
            />
          </SmartLink>
        </div>

        {/* Desktop Navigation Menu - Hidden on mobile */}
        <div className="hidden lg:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {/* Product shortcuts */}
              {[
                { label: "AxonScribe", slug: "axonscribe" },
                { label: "AxonMD", slug: "axonmd" },
                { label: "AxonCare", slug: "axoncare" },
                { label: "AxonHIS", slug: "axonhis" },
                { label: "AxonHealthHub", slug: "axonhealthhub" },
                { label: "AxonHomeClinic", slug: "axonhomeclinic" },
              ].map((item) => (
                <NavigationMenuItem key={item.slug}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-colors duration-300",
                      isScrolled
                        ? "text-gray-900 hover:text-yellow-500"
                        : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10",
                    )}
                  >
                    <SmartLink href={getProductSubdomainUrl(item.slug)}>
                      {item.label}
                    </SmartLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* Our Platform */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-colors duration-300",
                    isScrolled
                      ? "text-gray-900 hover:text-yellow-500"
                      : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10",
                  )}
                >
                  <SmartLink href={getPlatformSubdomainUrl()}>
                    Our Platform
                  </SmartLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Village Health Initiative */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-colors duration-300",
                    isScrolled
                      ? "text-gray-900 hover:text-yellow-500"
                      : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10",
                  )}
                >
                  <SmartLink href={getNavUrl("/village-health-initiative")}>
                    Village Health Initiative
                  </SmartLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Our Customers */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-colors duration-300",
                    isScrolled
                      ? "text-gray-900 hover:text-yellow-500"
                      : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10",
                  )}
                >
                  <SmartLink href={getNavUrl("/our-customers")}>Our Customers</SmartLink>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* About Us dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "transition-colors duration-300",
                    isScrolled
                      ? "text-gray-900 hover:text-yellow-500"
                      : "text-white hover:text-yellow-200 bg-transparent hover:bg-white/10",
                  )}
                >
                  About Us
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0">
                  <ul className="grid w-[220px] gap-2 p-2 bg-white">
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/about-us#team")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">Team</div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/advisors-board")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">
                            Advisors & Board Members
                          </div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/our-products")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">Our Products</div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/blogs")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">Blog</div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/#testimonials")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">Testimonials</div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/careers")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">Careers</div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <SmartLink
                          href={getNavUrl("/contact-us")}
                          className="block p-2 hover:bg-accent rounded-sm text-gray-900"
                        >
                          <div className="font-medium">Contact Us</div>
                        </SmartLink>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
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
              : "text-white hover:bg-white/10",
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
                {/* Product shortcuts */}
                {[
                  { label: "AxonScribe", slug: "axonscribe" },
                  { label: "AxonMD", slug: "axonmd" },
                  { label: "AxonCare", slug: "axoncare" },
                  { label: "AxonHIS", slug: "axonhis" },
                  { label: "AxonHealthHub", slug: "axonhealthhub" },
                  { label: "AxonHomeClinic", slug: "axonhomeclinic" },
                ].map((item) => (
                  <SmartLink
                    key={item.slug}
                    href={getProductSubdomainUrl(item.slug)}
                    className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </SmartLink>
                ))}

                <SmartLink
                  href={getPlatformSubdomainUrl()}
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Our Platform
                </SmartLink>

                <SmartLink
                  href={getNavUrl("/village-health-initiative")}
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Village Health Initiative
                </SmartLink>

                <SmartLink
                  href={getNavUrl("/our-customers")}
                  className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Our Customers
                </SmartLink>

                {/* About Us submenu */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-gray-900 font-medium">
                    About Us
                  </div>
                  <SmartLink
                    href={getNavUrl("/about-us#team")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Team
                  </SmartLink>
                  <SmartLink
                    href={getNavUrl("/advisors-board")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Advisors & Board Members
                  </SmartLink>
                  <SmartLink
                    href={getNavUrl("/our-products")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Our Products
                  </SmartLink>
                  <SmartLink
                    href={getNavUrl("/blogs")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </SmartLink>
                  <SmartLink
                    href={getNavUrl("/#testimonials")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Testimonials
                  </SmartLink>
                  <SmartLink
                    href={getNavUrl("/careers")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Careers
                  </SmartLink>
                  <SmartLink
                    href={getNavUrl("/contact-us")}
                    className="block px-6 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-yellow-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </SmartLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
