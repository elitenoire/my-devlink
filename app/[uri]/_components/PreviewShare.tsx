'use client'

import type { MouseEvent } from 'react'
import { useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import LinkIcon from '@/public/icons/link.svg'

type PreviewShareProps = {
  uri: string
}

export function PreviewShare({ uri }: PreviewShareProps) {
  const pathname = usePathname()

  const handleShare = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      try {
        await navigator.clipboard.writeText(pathname)
        toast('The link has been copied to your clipboard!', {
          icon: <LinkIcon />,
        })
      } catch (err) {
        console.error('Failed to copy: ', err)
        toast.error('Failed to copy the link')
      }
    },
    [pathname]
  )

  return <Button onClick={handleShare}>Share Link</Button>
}
