'use client'

import NextImage from 'next/image'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Tally2Icon } from 'lucide-react'
import { FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormInput } from '@/components/common/FormInput'
import { DynamicSVG } from '@/components/ui/dynamic-svg'
import { LinkBlockInput } from '@/app/manage/_components/LinkBlockInput'
import { ILinksFormData } from '@/lib/schema'
import type { IPlatform } from '@/stores/platforms'

import LinkIcon from '@/public/icons/link.svg'
import linkUrl from '@/public/icons/link.svg?url'

type Platform = {
  id: string
  code: string
  title: string
  logoUrl: string
  slug: string
  brandBg: string
  brandColor: string
}

export type LinkBlockProps = {
  index: number
  formName: string
  platforms?: IPlatform[]
  onRemove: (index: number) => void
  disabled?: boolean
}

export function LinkBlock({
  platforms,
  formName = 'links',
  disabled,
  index,
  onRemove,
}: LinkBlockProps) {
  const { control } = useFormContext<ILinksFormData>()

  const handleClick = useCallback(() => {
    onRemove(index)
  }, [index, onRemove])

  return (
    <div className="space-y-3 rounded-xl bg-background p-5">
      <div className="flex items-center gap-2">
        <Button type="button" variant="tab" size="auto">
          <Tally2Icon className="rotate-90" />
        </Button>
        <h2 className="font-bold">Link #{index + 1}</h2>
        <Button
          type="button"
          variant="tab"
          size="auto"
          className="ml-auto font-normal"
          onClick={handleClick}
        >
          Remove
        </Button>
      </div>
      <FormInput
        name={`links.${index}.platform` as const}
        control={control}
        label="Platform"
        standalone
        disabled={disabled}
      >
        {(f) => (
          <Select onValueChange={f.onChange} defaultValue={f.value}>
            <FormControl>
              <SelectTrigger>
                <span className="size-4 text-foreground">
                  <NextImage src={linkUrl} alt="" unoptimized className="hue-rotate-15" />
                </span>
                <span className="ml-3 mr-auto">
                  <SelectValue placeholder="Select platform link" />
                </span>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {platforms?.map(({ id, code, title, logoUrl }) => (
                <SelectItem key={id} label={title} value={code}>
                  <DynamicSVG
                    filePath={logoUrl}
                    alt=""
                    size={16}
                    className="group-data-[state=checked]:filter-primary size-4"
                    unoptimized
                  />
                  {/* <span className="size-4 text-foreground">
                    <NextImage
                      src={platform.logoUrl}
                      alt=""
                      unoptimized
                      className="group-data-[state=checked]:filter-primary"
                    />
                  </span> */}
                </SelectItem>
              ))}
              <SelectItem label="Github" value="github">
                <span className="size-4 text-foreground">
                  <NextImage
                    src={linkUrl}
                    alt=""
                    unoptimized
                    className="group-data-[state=checked]:filter-primary"
                  />
                </span>
              </SelectItem>
              <SelectItem label="Gitlab" value="gitlab">
                <span className="size-4 text-foreground">
                  <NextImage src={linkUrl} alt="" unoptimized />
                </span>
              </SelectItem>
              <SelectItem label="Twitter" value="twitter">
                <span className="size-4 text-foreground">
                  <NextImage src={linkUrl} alt="" unoptimized />
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormInput>
      <LinkBlockInput formName={formName} index={index} platforms={platforms} disabled={disabled} />
    </div>
  )
}
