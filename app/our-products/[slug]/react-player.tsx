"use client"

import dynamic from "next/dynamic"
import { Product } from "@/lib/products-data"
import React, { useState, useEffect } from "react"
import { Play, Loader2, Volume2, VolumeX } from "lucide-react"

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  )
})

interface ReactPlayerComponentProps {
  product: Product
}

export default function ReactPlayerComponent({ product }: ReactPlayerComponentProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Check if it's a YouTube Shorts URL
  const isYouTubeShorts = product.videoUrl.includes('/shorts/') || 
                         product.videoUrl.includes('youtube.com/shorts')

  // Fallback to hide loading after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false)
        setReady(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [loading])

  const handlePlay = () => {
    setPlaying(true)
    if (loading) {
      setLoading(false)
      setReady(true)
    }
  }

  const handlePause = () => {
    setPlaying(false)
  }

  const handleReady = () => {
    setReady(true)
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setError(true)
    setLoading(false)
    setReady(true)
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  return (
    <div className="relative w-full h-full group">
      {/* Loading Overlay */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl z-10">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl z-10">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-sm text-red-600 font-medium">Unable to load video</p>
            <button 
              onClick={() => {
                setError(false)
                setLoading(true)
                setReady(false)
              }}
              className="text-xs text-red-500 hover:text-red-700 mt-2 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Video Container */}
      <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black ${
        isYouTubeShorts 
          ? 'aspect-[9/16] w-[220px] mx-auto max-h-[35vh] sm:w-[260px] sm:max-h-[40vh] md:max-w-md md:max-h-none lg:max-w-lg' 
          : 'aspect-video'
      }`}>
        
        {/* Custom Play Button Overlay */}
        {!playing && ready && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 group-hover:bg-black/30 transition-all duration-300">
            <button
              onClick={handlePlay}
              className="bg-white/90 hover:bg-white text-black rounded-full p-6 md:p-8 transition-all duration-300 hover:scale-110 shadow-2xl group-hover:shadow-3xl backdrop-blur-sm"
            >
              <Play className="w-8 h-8 md:w-12 md:h-12 ml-1" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Custom Controls Overlay - Play/Pause and Mute */}
        {playing && ready && (
          <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Center Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePause}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 md:p-6 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-6 md:w-2 md:h-8 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-6 md:w-2 md:h-8 bg-white rounded-sm"></div>
                  </div>
                </div>
              </button>
            </div>
            
            {/* Mute Button - Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={toggleMute}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
              >
                {muted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* React Player */}
        <ReactPlayer
          url={product.videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          controls={false}
          light={!playing}
          onPlay={handlePlay}
          onPause={handlePause}
          onReady={handleReady}
          onError={handleError}
          onBuffer={() => setLoading(true)}
          onBufferEnd={() => setLoading(false)}
          onStart={() => {
            setLoading(false)
            setReady(true)
          }}
          style={{
            borderRadius: '1rem',
            overflow: 'hidden'
          }}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                fs: 0,
                cc_load_policy: 0,
                iv_load_policy: 3,
                autohide: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                origin: typeof window !== 'undefined' ? window.location.origin : undefined,
              }
            }
          }}
          className="rounded-2xl overflow-hidden"
        />

        {/* Gradient Overlay for Better Visual Appeal */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />
      </div>


    </div>
  )
}