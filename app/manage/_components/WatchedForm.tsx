'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useProfileStore } from '@/stores/profile'
import { useLinksStore } from '@/stores/links'

import type { ILinksFormData, IProfileFormData } from '@/lib/schema'

export function SyncProfileForm() {
  const setProfile = useProfileStore.useSetProfile()
  const { control } = useFormContext<IProfileFormData>()
  const { uri = '', firstname = '', lastname = '', email = '', avatar = '' } = useWatch({ control })

  useEffect(() => {
    setProfile({ uri, firstname, lastname, email, avatar })
  }, [avatar, email, firstname, lastname, setProfile, uri])

  return null
}

export function SyncLinksForm() {
  const setLinks = useLinksStore.useSetLinks()
  const { control } = useFormContext<ILinksFormData>()
  const { links = [] } = useWatch({ control })

  useEffect(() => {
    setLinks(links as ILinksFormData['links'])
  }, [setLinks, links])

  return null
}
