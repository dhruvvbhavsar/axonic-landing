"use client"

import { Button } from "@/components/ui/button"

export function CallButtonTertiary() {
  return (
    <Button
      variant="outline"
      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-10 rounded-xl text-base transition-all duration-300 hover:scale-105"
      onClick={() => window.open('tel:+18002101999', '_self')}
    >
      Call Us
    </Button>
  )
} 