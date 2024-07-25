'use client'

import { useState, useCallback, useTransition } from 'react'
import * as z from 'zod'
import { toast } from 'sonner'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useLinksStore } from '@/stores/links'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/app/manage/_components/FormCard'
import { LinkBlock } from '@/app/manage/_components/LinkBlock'
import { EmptyLinks } from '@/app/manage/_components/EmptyLinks'
import { SyncLinksForm } from '@/app/manage/_components/WatchedForm'
import { usePlatformsStore } from '@/stores/platforms'
import { type ILinksFormData, linksFormSchema } from '@/lib/schema'

export default function LinksForm() {
  const links = useLinksStore.useLinks()
  const platforms = usePlatformsStore.usePlatforms()
  const setLinks = useLinksStore.useSetLinks()
  const setPlatforms = usePlatformsStore.useSetPlatforms()
  const { slug, code } = platforms[0]
  const form = useForm<ILinksFormData>({
    resolver: zodResolver(linksFormSchema),
    defaultValues: {
      links,
    },
    // mode: 'onChange',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control: form.control,
  })

  const handleAppend = useCallback(() => {
    append({
      platform: code ?? 'github',
      slug: slug ?? 'https://github.com/',
      url: '',
    })
  }, [append, code, slug])

  const { isValid, isDirty } = form.formState
  const isSubmittable = !!isDirty && !!isValid
  const isEmpty = fields.length === 0

  return (
    <Form {...form}>
      <form>
        <FormCard
          title="Customize your links"
          description="Add/edit/remove links below and then share all your profiles with the world!"
        >
          <div className="space-y-6">
            <Button type="button" variant="secondary" className="w-full" onClick={handleAppend}>
              + Add new link
            </Button>
            {/* {isPending && (<div />)} */}
            {!isEmpty &&
              fields.map((field, index) => (
                <LinkBlock
                  key={field.id}
                  platforms={platforms}
                  index={index}
                  onRemove={remove}
                  formName="links"
                />
              ))}
            {isEmpty && <EmptyLinks />}
          </div>
        </FormCard>
      </form>
      <SyncLinksForm />
    </Form>
  )
}
