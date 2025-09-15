import * as React from "react"
import Script from "next/script"

export function ScheduleDemoSection({ product }: { product: any }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const widgetRef = React.useRef<HTMLDivElement>(null)
  
  const zcalUrl = React.useMemo(() => {
    try {
      const u = new URL(product.calendlyUrl)
      return `${u.origin}${u.pathname}`
    } catch (_e) {
      return product.calendlyUrl
    }
  }, [product.calendlyUrl])

  React.useEffect(() => {
    // Check if widget has loaded content
    const checkWidget = () => {
      const widget = widgetRef.current
      if (widget && widget.querySelector('iframe')) {
        setIsLoading(false)
        return true
      }
      return false
    }

    // Check immediately
    if (checkWidget()) return

    // Check periodically
    const interval = setInterval(() => {
      if (checkWidget()) {
        clearInterval(interval)
      }
    }, 500)

    // Fallback: hide loading after 10 seconds max
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false)
      clearInterval(interval)
    }, 10000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <section id="schedule-demo" className="w-full bg-white pb-12 px-4 sm:px-6 lg:px-8 h-full">
      <div className="w-full max-w-5xl mx-auto">
        <Script src="https://static.zcal.co/embed/v1/embed.js" strategy="afterInteractive" />
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Schedule Demo</h3>
              <p className="text-gray-600">Preparing your booking experience...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={widgetRef}
          className={`zcal-inline-widget ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          data-url={zcalUrl}
          style={{ minHeight: 700 }}
        />
      </div>
    </section>
  )
}


