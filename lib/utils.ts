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

/** Preview deployments use the main app's path routes, not production subdomains. */
export function isPreviewDomain(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'preview.axonichealth.com'
}

// Utility function to generate subdomain URL for products
export function getProductSubdomainUrl(productSlug: string): string {
  const disableSubdomains = process.env.NEXT_PUBLIC_DISABLE_SUBDOMAIN_ROUTING === 'true'

  if (typeof window !== 'undefined') {
    const { hostname, protocol, port } = window.location

    if (isPreviewDomain() || hostname.includes('.amplifyapp.com') || hostname.includes('.vercel.app') || disableSubdomains) {
      if (hostname.includes('.localhost') && !disableSubdomains) {
        return `${protocol}//${productSlug}.localhost:${port || '3000'}`
      }
      return `/our-products/${productSlug}`
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      if (hostname.includes('.localhost')) {
        return `${protocol}//${productSlug}.localhost:${port || '3000'}`
      }
      return `/our-products/${productSlug}`
    }

    // Production custom domains (e.g. platform.axonichealth.com -> axonmd.axonichealth.com)
    const baseDomain = getBaseDomain()
    return `https://${productSlug}.${baseDomain}`
  }

  if (disableSubdomains) {
    return `/our-products/${productSlug}`
  }

  const envDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN
  if (
    envDomain &&
    envDomain !== 'localhost:3000' &&
    !envDomain.includes('localhost') &&
    !envDomain.includes('.amplifyapp.com') &&
    !envDomain.includes('.vercel.app')
  ) {
    const normalizedDomain = envDomain.replace(/^https?:\/\//, '').split('/')[0]
    return `https://${productSlug}.${normalizedDomain}`
  }

  return `/our-products/${productSlug}`
}

// Utility function to generate platform subdomain URL
export function getPlatformSubdomainUrl(): string {
  // Check for explicit disable flag (useful for preview environments)
  const disableSubdomains = process.env.NEXT_PUBLIC_DISABLE_SUBDOMAIN_ROUTING === 'true'
  if (disableSubdomains || isPreviewDomain()) {
    return `/platform`
  }
  
  // Check if we're on Amplify or Vercel preview domains (client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname.includes('.amplifyapp.com') || hostname.includes('.vercel.app')) {
      // Use path-based routing for preview/dev environments
      return `/platform`
    }
  }
  
  // For production domains, always use subdomain routing
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'localhost:3000'
  
  // If we have a production domain set, use subdomain routing
  // But skip if baseDomain looks like an Amplify or Vercel domain
  if (baseDomain !== 'localhost:3000' && 
      !baseDomain.includes('localhost') && 
      !baseDomain.includes('.amplifyapp.com') && 
      !baseDomain.includes('.vercel.app')) {
    return `https://platform.${baseDomain}`
  }
  
  // Handle localhost development
  if (typeof window === 'undefined') {
    return `/platform`
  }
  
  const currentBaseDomain = getBaseDomain()
  const protocol = window.location.protocol
  
  // Handle localhost development - check if subdomain routing is being used
  if (currentBaseDomain.includes('localhost')) {
    // If we're already on a subdomain (e.g., axonhis.localhost), use subdomain URLs
    if (window.location.hostname.includes('.localhost')) {
      return `${protocol}//platform.localhost:${window.location.port || '3000'}`
    }
    // Otherwise fallback to path-based routing for plain localhost
    return `/platform`
  }
  
  return `${protocol}//platform.${currentBaseDomain}`
}

// Utility function to generate consulting subdomain URL
export function getConsultingSubdomainUrl(): string {
  // Check for explicit disable flag (useful for preview environments)
  const disableSubdomains = process.env.NEXT_PUBLIC_DISABLE_SUBDOMAIN_ROUTING === 'true'
  if (disableSubdomains || isPreviewDomain()) {
    return `/consulting`
  }
  
  // Check if we're on Amplify or Vercel preview domains (client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname.includes('.amplifyapp.com') || hostname.includes('.vercel.app')) {
      // Use path-based routing for preview/dev environments
      return `/consulting`
    }
  }
  
  // For production domains, always use subdomain routing
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'localhost:3000'
  
  // If we have a production domain set, use subdomain routing
  // But skip if baseDomain looks like an Amplify or Vercel domain
  if (baseDomain !== 'localhost:3000' && 
      !baseDomain.includes('localhost') && 
      !baseDomain.includes('.amplifyapp.com') && 
      !baseDomain.includes('.vercel.app')) {
    return `https://consulting.${baseDomain}`
  }
  
  // Handle localhost development
  if (typeof window === 'undefined') {
    return `/consulting`
  }
  
  const currentBaseDomain = getBaseDomain()
  const protocol = window.location.protocol
  
  // Handle localhost development - check if subdomain routing is being used
  if (currentBaseDomain.includes('localhost')) {
    // If we're already on a subdomain (e.g., axonhis.localhost), use subdomain URLs
    if (window.location.hostname.includes('.localhost')) {
      return `${protocol}//consulting.localhost:${window.location.port || '3000'}`
    }
    // Otherwise fallback to path-based routing for plain localhost
    return `/consulting`
  }
  
  return `${protocol}//consulting.${currentBaseDomain}`
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
