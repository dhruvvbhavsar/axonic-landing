import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Blog Post Not Found" />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Blog Post Not Found
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sorry, we couldn't find the blog post you're looking for. It may have been moved or doesn't exist.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blogs">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                  View All Blogs
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="font-medium py-3 px-8 rounded-lg">
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 