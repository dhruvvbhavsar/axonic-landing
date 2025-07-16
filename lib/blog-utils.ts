import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogsDirectory = path.join(process.cwd(), 'blogs')

// Legacy interfaces for backward compatibility
// Note: These are similar to the new API types but kept separate for compatibility

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  thumbnail: string
  tags: string[]
  readTime: string
  content: string
}

export interface BlogMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  thumbnail: string
  tags: string[]
  readTime: string
}

export function getAllBlogSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(blogsDirectory)
    return fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => name.replace(/\.mdx$/, ''))
  } catch (error) {
    console.warn('Blogs directory not found or empty')
    return []
  }
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      thumbnail: data.thumbnail || '/assets/image1.png',
      tags: data.tags || [],
      readTime: data.readTime || '5 min read',
      content,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getAllBlogs(): BlogMeta[] {
  const slugs = getAllBlogSlugs()
  const blogs = slugs
    .map(slug => {
      const blog = getBlogBySlug(slug)
      if (!blog) return null
      
      // Return only metadata, not content
      const { content, ...meta } = blog
      return meta
    })
    .filter((blog): blog is BlogMeta => blog !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return blogs
}

export function getRecentBlogs(limit: number = 3): BlogMeta[] {
  const allBlogs = getAllBlogs()
  return allBlogs.slice(0, limit)
}

// Note: This file provides local MDX file reading functionality
// The new blog system uses lib/blog-api.ts for API integration
// These functions serve as fallback when the API is unavailable 