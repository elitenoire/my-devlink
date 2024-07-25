'use client'

import { useState, useCallback, useTransition } from 'react'
import { toast } from 'sonner'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/common/FormInput'
import { FormCard } from '@/app/manage/_components/FormCard'
import { useProfileStore } from '@/stores/profile'
import { type IProfileFormData, profileFormSchema } from '@/lib/schema'

import PhotoIcon from '@/public/icons/photo.svg'
import { SyncProfileForm } from '@/app/manage/_components/WatchedForm'

export function ProfileForm() {
  const [isFormPending, startFormTransition] = useTransition()
  const uri = useProfileStore.useUri()
  const firstname = useProfileStore.useFirstname()
  const lastname = useProfileStore.useLastname()
  const email = useProfileStore.useEmail()
  const avatar = useProfileStore.useAvatar()
  const setProfile = useProfileStore.useSetProfile()
  const form = useForm<IProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      uri,
      firstname,
      lastname,
      email,
      avatar,
    },
    // mode: 'onChange',
  })

  const onSubmit = (values: IProfileFormData) => {
    startFormTransition(async () => {
      try {
        setProfile(values)
        // const { success, message } = await signIn(values)
        // if (success) {
        //   replace('/manage/profile')
        // }
        // if (message) {
        //   toast.error(message)
        // }
      } catch (e) {
        console.error(e)
        toast.error('Something went wrong')
      }
    })
  }

  const { isValid, isDirty } = form.formState
  const isSubmittable = !!isDirty && !!isValid

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard
          title="Profile Details"
          description="Add your details to create a personal touch to your profile."
        >
          <div className="flex items-center gap-x-6 gap-y-4 rounded-lg bg-background p-5 max-md:flex-col">
            <label className="w-[240px]">Profile picture</label>
            <div className="relative size-[193px] overflow-hidden rounded-xl bg-primary-superlight text-primary">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <PhotoIcon className="size-10" />
                <p className="font-semibold">+ Upload Image</p>
              </div>
            </div>
            <p className="flex-1">Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </div>
          <div className="space-y-3 rounded-lg bg-background p-5">
            <FormInput
              name="uri"
              control={form.control}
              label="Publish URI*"
              type="text"
              placeholder="e.g. benwright"
              fieldClass="md:flex md:gap-4 md:items-center"
              labelClass="md:text-base md:w-[240px] md:text-foreground"
              containerClass="md:flex-1"
              disabled={isFormPending}
            />
            <FormInput
              name="firstname"
              control={form.control}
              label="First name*"
              type="text"
              placeholder="Ben"
              fieldClass="md:flex md:gap-4 md:items-center"
              labelClass="md:text-base md:w-[240px] md:text-foreground"
              containerClass="md:flex-1"
              disabled={isFormPending}
            />
            <FormInput
              name="lastname"
              control={form.control}
              label="Last name*"
              type="text"
              placeholder="Wright"
              fieldClass="md:flex md:gap-4 md:items-center"
              labelClass="md:text-base md:w-[240px] md:text-foreground"
              containerClass="md:flex-1"
              disabled={isFormPending}
            />
            <FormInput
              name="email"
              control={form.control}
              label="Email"
              type="email"
              placeholder="ben@example.com"
              fieldClass="md:flex md:gap-4 md:items-center"
              labelClass="md:text-base md:w-[240px] md:text-foreground"
              containerClass="md:flex-1"
              disabled={isFormPending}
            />
          </div>
        </FormCard>
      </form>
      <SyncProfileForm />
    </Form>
  )
}
