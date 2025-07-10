"use client"

import { Button } from "@/components/ui/button"

export function CallButton() {
  return (
    <Button
      variant="outline"
      className="py-2 px-6 rounded-xl font-semibold text-sm"
      onClick={() => window.open(`tel:+18002101999`, '_self')}
    >
      Call Us Instead
    </Button>
  )
} 