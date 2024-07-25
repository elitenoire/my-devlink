'use client'

import { ArrowRight } from 'lucide-react'
import { DynamicSVG } from '@/components/ui/dynamic-svg'
import { useLinksStore } from '@/stores/links'
import { usePlatformsStore } from '@/stores/platforms'

type LinksPreviewProps = {
  mode?: 'edit' | 'view'
  min?: number
}

export function LinksPreview({ mode = 'view', min = 5 }: LinksPreviewProps) {
  const links = useLinksStore.useLinks()
  const platforms = usePlatformsStore.usePlatforms()

  const isView = mode === 'view'
  const isEmpty = links.length === 0
  const hasBlanks = links.length < min
  const blanks = isView && !isEmpty ? 0 : min - links.length

  return (
    <ul className="flex flex-col items-center gap-5 text-white">
      {links.map(({ platform, url }, i) => {
        const selected = platforms.find((p) => p.code === platform)
        if (selected) {
          const { title, brandBg, brandColor, logoUrl } = selected
          return (
            <li key={i} className="w-full">
              <a
                href={url}
                className="flex w-full items-center gap-2 rounded-lg bg-black px-[11px] py-4"
                style={{
                  background: brandBg,
                  color: brandColor,
                }}
              >
                <DynamicSVG filePath={logoUrl} alt="" size={16} className="size-4" unoptimized />
                <span className="body-s">{title}</span>
                <ArrowRight className="ml-auto size-4" />
              </a>
            </li>
          )
        } else {
          return null
        }
      })}
      {hasBlanks &&
        Array.from({ length: blanks }, (v, i) => (
          <li
            key={i}
            {...(isView && {
              style: { opacity: 1 - i * 0.2, transform: `scale(${1 - i * 0.025})` },
            })}
            className="bg-blank h-11 w-full rounded-lg"
          />
        ))}
    </ul>
  )
}
