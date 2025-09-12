"use client"

import * as React from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

type Feature = { title: string; description: string; image: string }

export default function FeaturesCarousel({ features }: { features: Feature[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true, startIndex: 0, slidesToScroll: 1 }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {features.map((feature, idx) => (
            <CarouselItem key={idx} className="pl-4 md:pl-6 basis-full">
              {/* Gradient bordered panel */}
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-yellow-500/60 via-amber-400/50 to-yellow-600/60 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <div className="rounded-3xl bg-white overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
                    {/* Copy */}
                    <div className="flex items-center bg-gradient-to-br from-yellow-50 to-white/90 p-8 md:p-12 lg:p-16">
                      <div className="max-w-xl">
                        <div className="h-1.5 w-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mb-6" />
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    {/* Visual */}
                    <div className="relative flex items-center justify-center bg-white p-6 md:p-10 lg:p-12">
                      <div className="relative w-full max-w-xl rounded-2xl ring-1 ring-gray-100 shadow-lg overflow-hidden">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={1000}
                          height={750}
                          className="w-full h-auto object-contain"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12 lg:-left-16 size-10 md:size-12 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200" />
        <CarouselNext className="-right-4 md:-right-12 lg:-right-16 size-10 md:size-12 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200" />
      </Carousel>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              index === current ? "bg-yellow-500 w-8" : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}


