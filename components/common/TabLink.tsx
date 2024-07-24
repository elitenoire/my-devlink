'use client'

import type { PropsWithChildren } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Button } from '@/components/ui/button'

type TabLinkProps = {
  slug: string
  href: Route
  label: string
  slot?: string
}

export function TabLink({ slug, href, label, slot, children }: PropsWithChildren<TabLinkProps>) {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment(slot)
  const isActive = slug === segment
  console.log({ slug, segment })

  return (
    <Button variant="tab" {...(isActive && { 'data-active': '' })} asChild>
      <Link href={href}>
        {children}
        <span className="ml-2 max-md:sr-only">{label}</span>
      </Link>
    </Button>
  )
}
