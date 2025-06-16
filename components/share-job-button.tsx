"use client"

import { Button } from "@/components/ui/button"

interface ShareJobButtonProps {
  title: string
  description: string
}

export function ShareJobButton({ title, description }: ShareJobButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Button 
      variant="outline" 
      className="w-full"
      onClick={handleShare}
    >
      Share Job
    </Button>
  )
} 