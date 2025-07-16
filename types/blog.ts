// types/blog.ts
export interface BlogMeta {
  id: string
  slug: string
  title: string
  description: string
  author: string
  thumbnail: string
  tags: string[]
  readTime: string
  publishedAt: string
  updatedAt: string
  status: 'published'
}

export interface BlogPost extends BlogMeta {
  content: string
  seoTitle?: string
  seoDescription?: string
}

export interface BlogResponse {
  success: boolean
  data: BlogMeta[] | BlogPost
  total?: number
  message?: string
} 