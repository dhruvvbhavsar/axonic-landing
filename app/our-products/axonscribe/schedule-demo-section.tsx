import * as React from "react"
import Script from "next/script"

export function ScheduleDemoSection({ product }: { product: any }) {
  const zcalUrl = React.useMemo(() => {
    try {
      const u = new URL(product.calendlyUrl)
      return `${u.origin}${u.pathname}`
    } catch (_e) {
      return product.calendlyUrl
    }
  }, [product.calendlyUrl])

  return (
    <section id="schedule-demo" className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        <Script src="https://static.zcal.co/embed/v1/embed.js" strategy="afterInteractive" />
        <div className="zcal-inline-widget">
          <a href={zcalUrl}>Loading...</a>
        </div>
      </div>
    </section>
  )
}


