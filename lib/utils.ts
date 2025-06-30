import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get the base domain
export function getBaseDomain(): string {
  // Return fallback for server-side rendering to prevent hydration errors
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_DOMAIN || 'localhost:3000'
  }
  
  const hostname = window.location.hostname
  const port = window.location.port
  
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `localhost:${port || '3000'}`
  }
  
  // Handle localhost subdomains (e.g., axonhis.localhost -> localhost)
  if (hostname.includes('.localhost')) {
    return `localhost:${port || '3000'}`
  }
  
  // Remove subdomain if present (e.g., 'product.domain.com' -> 'domain.com')
  const parts = hostname.split('.')
  if (parts.length > 2) {
    return parts.slice(-2).join('.')
  }
  return hostname
}

// Utility function to generate subdomain URL for products
export function getProductSubdomainUrl(productSlug: string): string {
  // Always return path-based routing during SSR to prevent hydration errors
  if (typeof window === 'undefined') {
    return `/our-products/${productSlug}`
  }
  
  const baseDomain = getBaseDomain()
  const protocol = window.location.protocol
  
  // Handle localhost development - check if subdomain routing is being used
  if (baseDomain.includes('localhost')) {
    // If we're already on a subdomain (e.g., axonhis.localhost), use subdomain URLs
    if (window.location.hostname.includes('.localhost')) {
      return `${protocol}//${productSlug}.localhost:${window.location.port || '3000'}`
    }
    // Otherwise fallback to path-based routing for plain localhost
    return `/our-products/${productSlug}`
  }
  
  return `${protocol}//${productSlug}.${baseDomain}`
}

// Utility function to check if subdomain routing is available
export function isSubdomainRoutingAvailable(): boolean {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    return hostname !== 'localhost' && hostname !== '127.0.0.1'
  }
  
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || ''
  return baseDomain !== '' && !baseDomain.includes('localhost')
}
