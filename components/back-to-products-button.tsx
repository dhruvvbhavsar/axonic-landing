"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBaseDomain } from "@/lib/utils"

export function BackToProductsButton() {
  const [isClient, setIsClient] = React.useState(false)
  
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  
  const href = isClient && getBaseDomain().includes('localhost') 
    ? `http://${getBaseDomain()}/our-products` 
    : `https://${getBaseDomain()}/our-products`
  
  return (
    <Link href={isClient ? href : "/our-products"}>
      <Button variant="outline" className="font-medium py-3 px-8 rounded-xl text-base hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        ← Back to All Products
      </Button>
    </Link>
  )
} 