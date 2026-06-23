"use client"

import * as React from "react"
import Link from "next/link"
import { getProductSubdomainUrl } from "@/lib/utils"

type ProductPageLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  slug: string
}

export const ProductPageLink = React.forwardRef<HTMLAnchorElement, ProductPageLinkProps>(
  function ProductPageLink({ slug, href: _href, children, ...props }, ref) {
    const [productHref, setProductHref] = React.useState(`/our-products/${slug}`)

    React.useEffect(() => {
      setProductHref(getProductSubdomainUrl(slug))
    }, [slug])

    if (productHref.startsWith("http://") || productHref.startsWith("https://")) {
      return (
        <a ref={ref} href={productHref} {...props}>
          {children}
        </a>
      )
    }

    return (
      <Link ref={ref} href={productHref} {...props}>
        {children}
      </Link>
    )
  },
)
