'use client'

import NextImage from 'next/image'
import { useCallback, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Tally2Icon } from 'lucide-react'
import { FormInput } from '@/components/common/FormInput'
import { FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import LinkIcon from '@/public/icons/link.svg'
import linkUrl from '@/public/icons/link.svg?url'

import type { LinkBlockProps } from '@/app/manage/_components/LinkBlock'

const testPlatforms = [
  {
    id: '1',
    code: 'github',
    title: 'Github',
    logoUrl: '',
    slug: 'https://github.com/',
    brandBg: '',
    brandColor: '',
  },
  {
    id: '2',
    code: 'gitlab',
    title: 'Gitlab',
    logoUrl: '',
    slug: 'https://gitlab.com/',
    brandBg: '',
    brandColor: '',
  },
  {
    id: '3',
    code: 'twitter',
    title: 'Twitter',
    logoUrl: '',
    slug: 'https://twitter.com/',
    brandBg: '',
    brandColor: '',
  },
]

type LinkBlockInputProps = {} & Pick<
  LinkBlockProps,
  'index' | 'formName' | 'platforms' | 'disabled'
>

export function LinkBlockInput({
  platforms,
  formName = 'links',
  disabled,
  index,
}: LinkBlockInputProps) {
  const { control, register, setValue } = useFormContext()
  const selectedPlatform = useWatch({ control, name: `links.${index}.platform` as const })
  const slug = testPlatforms.find((platform) => platform.code === selectedPlatform)?.slug
  //   const handleClick = useCallback(() => {
  //     onRemove(index)
  //   }, [index, onRemove])

  useEffect(() => {
    setValue(`links.${index}.slug`, slug)
  }, [index, setValue, slug])

  return (
    <>
      <FormInput
        name={`links.${index}.url` as const}
        control={control}
        label="Link"
        type="url"
        placeholder={slug ? `e.g. ${slug}jenny` : 'e.g. https://www.github.com/johnappleseed'}
        startIcon={LinkIcon}
        disabled={disabled}
      />
      <input readOnly {...register(`links.${index}.slug` as const)} placeholder="Slug" />
    </>
  )
}
