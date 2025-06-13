import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blog-utils"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import { MDXRemote } from 'next-mdx-remote/rsc'

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title={blog.title} />

      {/* Blog Content */}
      <article className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blogs">
              <Button variant="outline" className="font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Blog Header */}
          <header className="mb-12">
            {/* Featured Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {blog.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-5 h-5" />
                <span className="font-medium">{blog.author}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Blog Content */}
          <div className="prose max-w-none">
            <MDXRemote source={blog.content} />
          </div>

          {/* Back to Blog Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <Link href="/blogs">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Blogs
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
} 