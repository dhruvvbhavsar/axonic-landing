"use client"

import * as React from "react"

export default function HeroYouTubePlayer({
  videoId,
  title,
}: {
  videoId: string
  title: string
}) {
  return (
    <div className="aspect-video relative w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-2xl"
      />
    </div>
  )
}


