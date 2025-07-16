// lib/blog-api.ts
import { BlogMeta, BlogPost, BlogResponse } from '@/types/blog'

const API_BASE_URL = process.env.NEXT_PUBLIC_BLOG_API_URL || 'http://localhost:3000'

// Server-side functions (with caching)
export async function getAllBlogs(): Promise<BlogMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs?public=true`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch blogs')
    }
    
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogMeta[] : []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function getRecentBlogs(limit: number = 3): Promise<BlogMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs?public=true&limit=${limit}`, {
      next: { revalidate: 300 },
    })
    
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogMeta[] : []
  } catch (error) {
    console.error('Error fetching recent blogs:', error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/slug/${slug}?public=true`, {
        cache: 'no-store',
    })
    
    if (!response.ok) {
      return null
    }
    
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogPost : null
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function searchBlogs(query: string): Promise<BlogMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 },
    })
    
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogMeta[] : []
  } catch (error) {
    console.error('Error searching blogs:', error)
    return []
  }
}

// Client-side functions (for use in client components)
export async function getAllBlogsClient(): Promise<BlogMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs?public=true`)
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogMeta[] : []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function getBlogBySlugClient(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/slug/${slug}?public=true`)
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogPost : null
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function getRecentBlogsClient(limit: number = 3): Promise<BlogMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs?public=true&limit=${limit}`)
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogMeta[] : []
  } catch (error) {
    console.error('Error fetching recent blogs:', error)
    return []
  }
}

export async function searchBlogsClient(query: string): Promise<BlogMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/search?q=${encodeURIComponent(query)}`)
    const data: BlogResponse = await response.json()
    return data.success ? data.data as BlogMeta[] : []
  } catch (error) {
    console.error('Error searching blogs:', error)
    return []
  }
} 