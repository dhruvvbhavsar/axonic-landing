"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBaseDomain } from "@/lib/utils"

export function NotFoundNavigation() {
  const [isClient, setIsClient] = React.useState(false)
  
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  
  const productsHref = isClient && getBaseDomain().includes('localhost') 
    ? `http://${getBaseDomain()}/our-products` 
    : `https://${getBaseDomain()}/our-products`
    
  const homeHref = isClient && getBaseDomain().includes('localhost') 
    ? `http://${getBaseDomain()}` 
    : `https://${getBaseDomain()}`
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href={isClient ? productsHref : "/our-products"}>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
          View All Products
        </Button>
      </Link>
      <Link href={isClient ? homeHref : "/"}>
        <Button variant="outline" className="font-medium py-3 px-8 rounded-lg">
          Go Home
        </Button>
      </Link>
    </div>
  )
} 