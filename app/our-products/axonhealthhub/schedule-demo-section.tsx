export function ScheduleDemoSection({ product }: { product: any }) {
  return (
    <section id="schedule-demo" className="w-full bg-white pb-12 px-4 sm:px-6 lg:px-8">
      <iframe
        src={product?.calendlyUrl}
        loading="lazy"
        style={{ border: 'none', minWidth: '320px', minHeight: '1200px', height: '100%', width: '100%' }}
        id="zcal-invite"
        scrolling="no"
      />
    </section>
  )
}



