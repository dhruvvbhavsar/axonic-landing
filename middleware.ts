import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/products-data'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Get all product slugs for subdomain matching
  const productSlugs = products.map(product => product.slug)
  
  // Extract subdomain from hostname
  const subdomain = hostname.split('.')[0]
  
  // Skip subdomain routing for localhost, Amplify preview/dev domains, and Vercel preview domains
  const isLocalhost = hostname === 'localhost:3000' || hostname === '127.0.0.1:3000' || hostname === 'localhost' || hostname === '127.0.0.1'
  const isAmplifyDomain = hostname.includes('.amplifyapp.com')
  const isVercelPreview = hostname.includes('.vercel.app')
  
  if (isLocalhost || isAmplifyDomain || isVercelPreview) {
    return NextResponse.next()
  }
  
  // Check if the subdomain matches 'consulting'
  if (subdomain === 'consulting') {
    // Rewrite to the consulting page
    url.pathname = '/consulting'
    return NextResponse.rewrite(url)
  }
  
  // Check if the subdomain matches 'platform'
  if (subdomain === 'platform') {
    // Rewrite to the platform page
    url.pathname = '/platform'
    return NextResponse.rewrite(url)
  }
  
  // Check if the subdomain matches any product slug
  if (productSlugs.includes(subdomain)) {
    // Special handling for products with dedicated pages
    if (subdomain === 'axonscribe') {
      url.pathname = `/our-products/axonscribe/`
      return NextResponse.rewrite(url)
    }
    
    if (subdomain === 'axonmd') {
      url.pathname = `/our-products/axonmd/`
      return NextResponse.rewrite(url)
    }
    
    if (subdomain === 'axonhealthhub') {
      url.pathname = `/our-products/axonhealthhub/`
      return NextResponse.rewrite(url)
    }
    
    if (subdomain === 'axonhis') {
      url.pathname = `/our-products/axonhis/`
      return NextResponse.rewrite(url)
    }
    
    // For other products, rewrite to the slug-based route
    url.pathname = `/our-products/${subdomain}`
    return NextResponse.rewrite(url)
  }
  
  // For the main domain, continue as normal
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 