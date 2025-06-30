import { PageHeader } from "@/components/page-header"
import { NotFoundNavigation } from "@/components/not-found-navigation"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Product Not Found" />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Product Not Found
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sorry, we couldn't find the product you're looking for. It may have been moved or doesn't exist.
              </p>
            </div>
            
            <NotFoundNavigation />
          </div>
        </div>
      </section>
    </div>
  )
} 